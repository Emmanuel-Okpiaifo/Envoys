// Gallery Upload and Delete Functionality

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
        // Modal controls
        if (this.uploadBtn) {
            this.uploadBtn.addEventListener('click', () => this.openModal());
        }
        
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeModal());
        }
        
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.closeModal();
            });
        }
        
        // File input handling
        if (this.fileInput) {
            this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        }
        
        // Drag and drop
        const uploadZone = document.querySelector('.upload-file-label');
        if (uploadZone) {
            uploadZone.addEventListener('dragover', (e) => this.handleDragOver(e));
            uploadZone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
            uploadZone.addEventListener('drop', (e) => this.handleDrop(e));
        }
        
        // Submit button
        if (this.submitBtn) {
            this.submitBtn.addEventListener('click', () => this.uploadImage());
        }
        
        // Load existing user uploads on page load
        this.loadUserUploadedImages();
    }
    
    openModal() {
        if (this.modal) {
            this.modal.removeAttribute('hidden');
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeModal() {
        if (this.modal) {
            this.modal.setAttribute('hidden', '');
            document.body.style.overflow = '';
            this.resetForm();
        }
    }
    
    resetForm() {
        if (this.fileInput) this.fileInput.value = '';
        this.selectedFile = null;
        if (this.submitBtn) this.submitBtn.disabled = true;
        if (this.progressDiv) this.progressDiv.setAttribute('hidden', '');
        if (this.statusDiv) this.statusDiv.setAttribute('hidden', '');
    }
    
    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.validateAndSelectFile(file);
        }
    }
    
    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.add('drag-over');
    }
    
    handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove('drag-over');
    }
    
    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove('drag-over');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            this.validateAndSelectFile(file);
        } else {
            this.showStatus('Please select a valid image file', 'error');
        }
    }
    
    validateAndSelectFile(file) {
        const maxSize = 5 * 1024 * 1024; // 5MB
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        
        if (!validTypes.includes(file.type)) {
            this.showStatus('Only JPG, PNG, and WebP images are allowed', 'error');
            return;
        }
        
        if (file.size > maxSize) {
            this.showStatus('Image must be smaller than 5MB', 'error');
            return;
        }
        
        this.selectedFile = file;
        this.submitBtn.disabled = false;
        
        // Update label text
        const label = document.querySelector('.upload-file-label span');
        if (label) {
            label.textContent = file.name;
        }
        
        this.statusDiv.setAttribute('hidden', '');
    }
    
    async uploadImage() {
        if (!this.selectedFile || !CURRENT_USER_ID) {
            this.showStatus('Please select an image first', 'error');
            return;
        }
        
        this.submitBtn.disabled = true;
        this.progressDiv.removeAttribute('hidden');
        
        try {
            // Create unique filename
            const timestamp = Date.now();
            const filename = `${CURRENT_USER_ID}-${timestamp}-${this.selectedFile.name.replace(/\s+/g, '-')}`;
            const storageRef = storage.ref(`gallery-uploads/${filename}`);
            
            // Upload file
            const uploadTask = storageRef.put(this.selectedFile);
            
            // Monitor upload progress
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    document.querySelector('.progress-fill').style.width = progress + '%';
                },
                (error) => {
                    console.error('Upload error:', error);
                    this.showStatus('Upload failed: ' + error.message, 'error');
                    this.progressDiv.setAttribute('hidden', '');
                    this.submitBtn.disabled = false;
                },
                async () => {
                    // Get download URL
                    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                    
                    // Save metadata to database
                    await this.saveImageMetadata({
                        filename: filename,
                        downloadURL: downloadURL,
                        timestamp: timestamp,
                        userId: CURRENT_USER_ID,
                        fileName: this.selectedFile.name,
                        fileSize: this.selectedFile.size
                    });
                    
                    // Success message
                    this.progressDiv.setAttribute('hidden', '');
                    this.showStatus('Image uploaded successfully! 🎉', 'success');
                    
                    // Close modal after 2 seconds
                    setTimeout(() => {
                        this.closeModal();
                        this.loadUserUploadedImages();
                    }, 2000);
                }
            );
        } catch (error) {
            console.error('Upload error:', error);
            this.showStatus('Error: ' + error.message, 'error');
            this.submitBtn.disabled = false;
            this.progressDiv.setAttribute('hidden', '');
        }
    }
    
    async saveImageMetadata(metadata) {
        try {
            const ref = database.ref('gallery-uploads').push();
            await ref.set(metadata);
            console.log('Metadata saved with key:', ref.key);
        } catch (error) {
            console.error('Error saving metadata:', error);
            throw error;
        }
    }
    
    showStatus(message, type = 'info') {
        this.statusDiv.textContent = message;
        this.statusDiv.className = `upload-status upload-status-${type}`;
        this.statusDiv.removeAttribute('hidden');
    }
    
    async loadUserUploadedImages() {
        try {
            const snapshot = await database.ref('gallery-uploads').once('value');
            const uploads = snapshot.val();
            
            if (!uploads) return;
            
            const userUploads = Object.entries(uploads)
                .filter(([_, data]) => data.userId === CURRENT_USER_ID)
                .map(([key, data]) => ({ key, ...data }));
            
            if (userUploads.length > 0) {
                this.displayUserUploads(userUploads);
            }
        } catch (error) {
            console.error('Error loading uploads:', error);
        }
    }
    
    displayUserUploads(uploads) {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (!galleryGrid) return;
        
        // Create section for user uploads
        let userUploadsSection = document.getElementById('user-uploads-section');
        
        if (!userUploadsSection) {
            userUploadsSection = document.createElement('div');
            userUploadsSection.id = 'user-uploads-section';
            userUploadsSection.className = 'user-uploads-section';
            
            const header = document.createElement('p');
            header.className = 'user-uploads-header';
            header.innerHTML = '<i class="fas fa-star"></i> Your Contributions';
            
            userUploadsSection.appendChild(header);
            galleryGrid.parentElement.insertBefore(userUploadsSection, galleryGrid);
        }
        
        // Clear existing user uploads
        const existingItems = userUploadsSection.querySelectorAll('.gallery-item');
        existingItems.forEach(item => item.remove());
        
        // Add user's uploads
        uploads.forEach(upload => {
            const item = document.createElement('div');
            item.className = 'gallery-item user-uploaded-item';
            item.innerHTML = `
                <div class="gallery-image-wrapper">
                    <img src="${upload.downloadURL}" alt="User upload" class="gallery-image" loading="lazy">
                    <div class="gallery-overlay"></div>
                    <button class="delete-upload-btn" data-key="${upload.key}" aria-label="Delete this image">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            
            // Add delete event listener
            const deleteBtn = item.querySelector('.delete-upload-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => this.deleteImage(upload.key, item));
            }
            
            userUploadsSection.appendChild(item);
        });
    }
    
    async deleteImage(key, element) {
        if (!confirm('Delete this image? This action cannot be undone.')) {
            return;
        }
        
        try {
            // Get image data to delete from storage
            const snapshot = await database.ref(`gallery-uploads/${key}`).once('value');
            const imageData = snapshot.val();
            
            // Delete from database
            await database.ref(`gallery-uploads/${key}`).remove();
            
            // Delete from storage
            if (imageData && imageData.filename) {
                await storage.ref(`gallery-uploads/${imageData.filename}`).delete();
            }
            
            // Remove from DOM with animation
            element.style.animation = 'fadeOut 0.4s ease';
            setTimeout(() => {
                element.remove();
                
                // Check if section is empty and remove if so
                const userUploadsSection = document.getElementById('user-uploads-section');
                if (userUploadsSection && userUploadsSection.querySelectorAll('.gallery-item').length === 0) {
                    userUploadsSection.remove();
                }
            }, 400);
            
        } catch (error) {
            console.error('Error deleting image:', error);
            alert('Failed to delete image. Please try again.');
        }
    }
}

// Initialize gallery manager when DOM is ready
let galleryManager;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Wait for Firebase to initialize
        setTimeout(() => {
            galleryManager = new GalleryManager();
        }, 500);
    });
} else {
    setTimeout(() => {
        galleryManager = new GalleryManager();
    }, 500);
}
