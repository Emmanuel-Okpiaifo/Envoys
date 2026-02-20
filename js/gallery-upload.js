// Cloudinary-based Gallery Upload and Delete (client-side)
// Uses unsigned uploads to Cloudinary and stores metadata in localStorage.
// NOTE: Deleting from Cloudinary requires a signed server-side request. This client-side flow
// removes items from the UI and localStorage only. To delete permanently, add a server endpoint
// that calls Cloudinary's destroy API.

// --- CONFIG: set these values ---
const CLOUDINARY_CLOUD_NAME = 'dmv0hpkaq';
const CLOUDINARY_UPLOAD_PRESET = 'envoys-gallery';
// If you deploy the Netlify function below and set the env vars, keep this true
const CLOUDINARY_SERVER_DELETE_ENABLED = true; // set to true to enable server-side deletion
// --------------------------------

function getUserId() {
    let userId = localStorage.getItem('envoys-user-id');
    if (!userId) {
        userId = 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('envoys-user-id', userId);
    }
    return userId;
}

const CURRENT_USER_ID = getUserId();

class GalleryManager {
    constructor() {
        this.modal = document.getElementById('upload-modal');
        this.uploadBtn = document.getElementById('upload-gallery-btn');
        this.closeBtn = document.getElementById('upload-modal-close');
        this.fileInput = document.getElementById('upload-file-input');
        this.submitBtn = document.getElementById('upload-submit-btn');
        this.progressDiv = document.getElementById('upload-progress');
        this.statusDiv = document.getElementById('upload-status');
        this.selectedFile = null;

        this.init();
    }

    init() {
        if (this.uploadBtn) this.uploadBtn.addEventListener('click', () => this.openModal());
        if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.closeModal());
        if (this.modal) this.modal.addEventListener('click', (e) => { if (e.target === this.modal) this.closeModal(); });
        if (this.fileInput) this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));

        const uploadZone = document.querySelector('.upload-file-label');
        if (uploadZone) {
            uploadZone.addEventListener('dragover', (e) => this.handleDragOver(e));
            uploadZone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
            uploadZone.addEventListener('drop', (e) => this.handleDrop(e));
        }

        if (this.submitBtn) this.submitBtn.addEventListener('click', () => this.uploadImage());

        this.loadUserUploadedImages();
    }

    openModal() { if (this.modal) { this.modal.removeAttribute('hidden'); document.body.style.overflow = 'hidden'; } }
    closeModal() { if (this.modal) { this.modal.setAttribute('hidden', ''); document.body.style.overflow = ''; this.resetForm(); } }
    resetForm() { if (this.fileInput) this.fileInput.value = ''; this.selectedFile = null; if (this.submitBtn) this.submitBtn.disabled = true; if (this.progressDiv) this.progressDiv.setAttribute('hidden', ''); if (this.statusDiv) this.statusDiv.setAttribute('hidden', ''); }

    handleFileSelect(e) { const file = e.target.files[0]; if (file) this.validateAndSelectFile(file); }
    handleDragOver(e) { e.preventDefault(); e.stopPropagation(); e.currentTarget.classList.add('drag-over'); }
    handleDragLeave(e) { e.preventDefault(); e.stopPropagation(); e.currentTarget.classList.remove('drag-over'); }
    handleDrop(e) { e.preventDefault(); e.stopPropagation(); e.currentTarget.classList.remove('drag-over'); const file = e.dataTransfer.files[0]; if (file && file.type.startsWith('image/')) this.validateAndSelectFile(file); else this.showStatus('Please select a valid image file', 'error'); }

    validateAndSelectFile(file) {
        const maxSize = 5 * 1024 * 1024; // 5MB
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) { this.showStatus('Only JPG, PNG, and WebP images are allowed', 'error'); return; }
        if (file.size > maxSize) { this.showStatus('Image must be smaller than 5MB', 'error'); return; }
        this.selectedFile = file; if (this.submitBtn) this.submitBtn.disabled = false; const label = document.querySelector('.upload-file-label span'); if (label) label.textContent = file.name; this.statusDiv && this.statusDiv.setAttribute('hidden', '');
    }

    uploadImage() {
        if (!this.selectedFile) { this.showStatus('Please select an image first', 'error'); return; }
        if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) { this.showStatus('Cloudinary not configured. See js/gallery-upload.js.', 'error'); return; }

        this.submitBtn.disabled = true; this.progressDiv && this.progressDiv.removeAttribute('hidden');

        const formData = new FormData();
        formData.append('file', this.selectedFile);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        const xhr = new XMLHttpRequest();
        const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;
        xhr.open('POST', url);

        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                const progress = (e.loaded / e.total) * 100;
                const fill = document.querySelector('.progress-fill');
                if (fill) fill.style.width = progress + '%';
            }
        });

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this.progressDiv && this.progressDiv.setAttribute('hidden', '');
                if (xhr.status >= 200 && xhr.status < 300) {
                    const resp = JSON.parse(xhr.responseText);
                    const metadata = {
                        id: resp.public_id,
                        url: resp.secure_url,
                        userId: CURRENT_USER_ID,
                        timestamp: Date.now(),
                        original_filename: resp.original_filename || this.selectedFile.name
                    };
                    this.saveLocalMetadata(metadata);
                    this.showStatus('Image uploaded successfully! 🎉', 'success');
                    setTimeout(() => { this.closeModal(); this.loadUserUploadedImages(); }, 1200);
                } else {
                    let errMsg = 'Upload failed. Please try again.';
                    try {
                        const parsed = JSON.parse(xhr.responseText || '{}');
                        // Cloudinary returns error objects in different shapes
                        errMsg = parsed.error?.message || parsed.message || JSON.stringify(parsed) || errMsg;
                    } catch (e) {
                        errMsg = xhr.responseText || errMsg;
                    }
                    console.error('Upload error', xhr.status, errMsg, xhr.responseText);
                    this.showStatus(`Upload failed (${xhr.status}): ${errMsg}`, 'error');
                    if (this.submitBtn) this.submitBtn.disabled = false;
                }
            }
        };

        xhr.onerror = () => {
            this.progressDiv && this.progressDiv.setAttribute('hidden', '');
            const msg = 'Network error during upload. Check your connection and CORS settings.';
            console.error('Upload network error');
            this.showStatus(msg, 'error');
            if (this.submitBtn) this.submitBtn.disabled = false;
        };

        xhr.send(formData);
    }

    saveLocalMetadata(metadata) {
        const key = 'envoys-uploads';
        const arr = JSON.parse(localStorage.getItem(key) || '[]');
        arr.push(metadata);
        localStorage.setItem(key, JSON.stringify(arr));
    }

    showStatus(message, type = 'info') {
        if (!this.statusDiv) return;
        this.statusDiv.textContent = message;
        this.statusDiv.className = `upload-status upload-status-${type}`;
        this.statusDiv.removeAttribute('hidden');
    }

    loadUserUploadedImages() {
        const key = 'envoys-uploads';
        const arr = JSON.parse(localStorage.getItem(key) || '[]');
        const userUploads = arr.filter(u => u.userId === CURRENT_USER_ID);
        if (userUploads.length) this.displayUserUploads(userUploads);
    }

    displayUserUploads(uploads) {
        // Insert user uploads directly into the main gallery grid so they match sizing/layout
        const galleryGrid = document.querySelector('.gallery-grid');
        if (!galleryGrid) return;

        // Remove any existing user-uploaded items first
        const existing = galleryGrid.querySelectorAll('.user-uploaded-item');
        existing.forEach(n => n.remove());

        // Insert uploads at the start of the grid (so they appear alongside other gallery items)
        uploads.forEach(upload => {
            // Avoid duplicates
            if (galleryGrid.querySelector(`[data-public-id="${CSS.escape(upload.id)}"]`)) return;

            const item = document.createElement('div');
            item.className = 'gallery-item user-uploaded-item';
            item.setAttribute('data-public-id', upload.id);
            item.innerHTML = `
                <div class="gallery-image-wrapper">
                    <img src="${upload.url}" alt="User upload" class="gallery-image" loading="lazy">
                    <div class="gallery-overlay"></div>
                    <button class="delete-upload-btn" data-id="${upload.id}" aria-label="Delete this image">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;

            const deleteBtn = item.querySelector('.delete-upload-btn');
            if (deleteBtn) deleteBtn.addEventListener('click', async () => {
                const confirmed = await this.showDeleteConfirmation();
                if (confirmed) this.deleteImage(upload.id, item);
            });

            // Insert at the top so user's uploads show first; change to appendChild if preferred
            galleryGrid.insertBefore(item, galleryGrid.firstChild);
        });
    }

    async deleteImage(id, element) {
        // This function assumes confirmation already obtained when called from the UI.

        const key = 'envoys-uploads';
        const arr = JSON.parse(localStorage.getItem(key) || '[]');
        const found = arr.find(u => u.id === id && u.userId === CURRENT_USER_ID);

        if (!found) {
            alert('Image not found in your uploads.');
            return;
        }

        if (CLOUDINARY_SERVER_DELETE_ENABLED) {
            try {
                await fetch('/.netlify/functions/delete-image', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ public_id: id })
                });
            } catch (err) {
                console.warn('Server delete failed:', err);
            }
        }

        const newArr = arr.filter(u => !(u.id === id && u.userId === CURRENT_USER_ID));
        localStorage.setItem(key, JSON.stringify(newArr));

        element.style.animation = 'fadeOut 0.4s ease';
        setTimeout(() => {
            element.remove();
            const userUploadsSection = document.getElementById('user-uploads-section');
            if (userUploadsSection && userUploadsSection.querySelectorAll('.gallery-item').length === 0) userUploadsSection.remove();
        }, 400);
    }

    showDeleteConfirmation() {
        return new Promise((resolve) => {
            // If a modal already exists, don't create another
            if (document.getElementById('delete-confirm-modal')) {
                resolve(false);
                return;
            }

            const overlay = document.createElement('div');
            overlay.id = 'delete-confirm-modal';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.right = '0';
            overlay.style.bottom = '0';
            overlay.style.background = 'rgba(0,0,0,0.5)';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.zIndex = '9999';

            const box = document.createElement('div');
            box.style.background = '#fff';
            box.style.padding = '18px';
            box.style.borderRadius = '8px';
            box.style.maxWidth = '420px';
            box.style.width = '90%';
            box.style.boxShadow = '0 6px 24px rgba(0,0,0,0.2)';
            box.innerHTML = `
                <p style="margin:0 0 12px;font-weight:600">Delete this image?</p>
                <p style="margin:0 0 18px;color:#444">This will remove it from your gallery view. To permanently delete from Cloudinary, enable server delete.</p>
            `;

            const btnRow = document.createElement('div');
            btnRow.style.display = 'flex';
            btnRow.style.justifyContent = 'flex-end';
            btnRow.style.gap = '8px';

            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = 'Cancel';
            cancelBtn.style.padding = '8px 12px';
            cancelBtn.style.background = '#eee';
            cancelBtn.style.border = 'none';
            cancelBtn.style.borderRadius = '6px';

            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.style.padding = '8px 12px';
            delBtn.style.background = '#c62828';
            delBtn.style.color = '#fff';
            delBtn.style.border = 'none';
            delBtn.style.borderRadius = '6px';

            btnRow.appendChild(cancelBtn);
            btnRow.appendChild(delBtn);
            box.appendChild(btnRow);
            overlay.appendChild(box);
            document.body.appendChild(overlay);

            const cleanup = (result) => {
                overlay.remove();
                resolve(result);
            };

            cancelBtn.addEventListener('click', () => cleanup(false));
            delBtn.addEventListener('click', () => cleanup(true));
            overlay.addEventListener('click', (e) => { if (e.target === overlay) cleanup(false); });
        });
    }
}

// Initialize gallery manager when DOM is ready
let galleryManager;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { setTimeout(() => { galleryManager = new GalleryManager(); }, 200); });
} else {
    setTimeout(() => { galleryManager = new GalleryManager(); }, 200);
}
