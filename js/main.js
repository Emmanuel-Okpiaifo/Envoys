// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('header nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

// Mobile navigation toggle
const setupMobileMenu = () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('header nav ul');
    const body = document.body;

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') &&
                !e.target.closest('nav') &&
                !e.target.closest('.nav-toggle')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        navMenu.querySelectorAll('li a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
};

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    elements.forEach(el => observer.observe(el));
};

// Hero slideshow
function initHeroSlideshow() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    if (!slides.length) return;

    const DURATION = 2500;
    let current = 0;
    let timer = null;

    function goTo(i) {
        current = ((i % slides.length) + slides.length) % slides.length;
        slides.forEach((s, idx) => s.classList.toggle('hero-slide-active', idx === current));
        dots.forEach((d, idx) => {
            d.classList.toggle('active', idx === current);
            d.setAttribute('aria-current', idx === current ? 'true' : null);
        });
    }

    function next() {
        goTo(current + 1);
    }

    function startTimer() {
        if (timer) clearInterval(timer);
        timer = setInterval(next, DURATION);
    }

    goTo(0);
    startTimer();

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goTo(i);
            startTimer();
        });
    });
}

// Testimony form — Google Sheets
function setupTestimonySheet() {
    // Replace with your Google Apps Script Web App URL after deployment
    const SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwMBCD9Tc0kpOXx9cQAf7zf_gQsctbxZEIDeRaRFjXXvZBMJG38rolMvS3oXl2NUP-Zhw/exec';
    if (!SHEET_WEBHOOK_URL || SHEET_WEBHOOK_URL.includes('YOUR_')) return;

    function showSubmitOverlay(title, message, type = 'success') {
        const overlay = document.getElementById('submit-overlay');
        const modal = document.querySelector('.sample-modal');
        const closeBtn = document.getElementById('submit-close');
        const t = document.getElementById('submit-title');
        const m = document.getElementById('submit-message');
        if (!overlay || !t || !m) return;
        
        // Set content
        t.textContent = title || 'Thank You!';
        m.textContent = message || 'Your testimony has been received.';
        
        // Remove previous state classes
        if (modal) {
            modal.classList.remove('success', 'failure');
            if (type === 'success') {
                modal.classList.add('success');
            } else if (type === 'failure') {
                modal.classList.add('failure');
            }
        }
        
        overlay.hidden = false;
        overlay.classList.remove('active');
        setTimeout(() => overlay.classList.add('active'), 10);
        
        const close = () => {
            overlay.classList.remove('active');
            overlay.hidden = true;
            if (modal) {
                modal.classList.remove('success', 'failure');
            }
        };
        
        if (closeBtn) closeBtn.addEventListener('click', close, { once: true });
        overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); }, { once: true });
    }

    async function postJSON(url, payload) {
        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8', 'Accept': 'application/json' },
            body: JSON.stringify(payload),
            mode: 'cors'
        });
        const ok = (resp.status >= 200 && resp.status < 400) || resp.type === 'opaque';
        return { ok, status: resp.status };
    }

    const form = document.getElementById('testimony-form');
    const submitBtn = document.getElementById('testimony-submit-btn');
    if (form && submitBtn) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            submitBtn.classList.add('is-loading');
            submitBtn.disabled = true;

            const payload = {
                name: (document.getElementById('fullName') || {}).value || '',
                email: (document.getElementById('email') || {}).value || '',
                phone: (document.getElementById('phone') || {}).value || '',
                testimony: (document.getElementById('testimonyText') || {}).value || '',
                shareOnSocial: (document.getElementById('shareOnSocial') || {}).checked || false,
                sharePublicly: (document.getElementById('sharePublicly') || {}).checked || false,
                userId: localStorage.getItem('envoys-user-id') || '',
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString()
            };
            
            try {
                const result = await postJSON(SHEET_WEBHOOK_URL, payload);
                submitBtn.classList.remove('is-loading');
                submitBtn.disabled = false;
                
                if (result.ok) {
                    form.reset();
                    showSubmitOverlay(
                        'Thank You! 🙏',
                        'Your testimony has been received successfully. We are grateful that you chose to share how God has been faithful in your life. Your story will encourage and inspire others as we celebrate three years of grace together. May the Lord continue to be glorified through your life.',
                        'success'
                    );
                } else {
                    showSubmitOverlay(
                        'Submission Failed',
                        'We were unable to receive your testimony at this time. This may be due to a temporary connection issue or a problem on our end. Please check your internet connection and try again. If the problem persists, reach out to us directly so we can assist you in sharing your testimony.',
                        'failure'
                    );
                }
            } catch (err) {
                console.warn('Testimony submission failed:', err);
                submitBtn.classList.remove('is-loading');
                submitBtn.disabled = false;
                showSubmitOverlay(
                    'Submission Failed',
                    'We were unable to receive your testimony at this time. This may be due to a temporary connection issue or a problem on our end. Please check your internet connection and try again. If the problem persists, reach out to us directly so we can assist you in sharing your testimony.',
                    'failure'
                );
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    animateOnScroll();
    initHeroSlideshow();
    setupTestimonySheet();
    setupGalleryInteractions();
    setupGalleryViewMore();
    setupLightbox();
});

// Gallery interactions
function setupGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        // Stagger animation on scroll
        item.style.animationDelay = `${index * 0.1}s`;
        
        // Add subtle parallax effect on mouse move
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) * 0.02;
            const rotateY = (x - centerX) * 0.02;
            
            const imageWrapper = item.querySelector('.gallery-image-wrapper');
            if (imageWrapper) {
                imageWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
        
        // Reset transform on mouse leave
        item.addEventListener('mouseleave', () => {
            const imageWrapper = item.querySelector('.gallery-image-wrapper');
            if (imageWrapper) {
                imageWrapper.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            }
        });
    });
    
    // Handle broken images - remove them if they fail to load
    handleBrokenImages();
}

// Function to handle broken/missing images
function handleBrokenImages() {
    const galleryImages = document.querySelectorAll('.gallery-grid .gallery-image');
    let removedCount = 0;
    
    galleryImages.forEach(img => {
        // Check if the image is already loaded and has failed
        if (img.complete && img.naturalHeight === 0) {
            // Image failed to load
            removeGalleryItem(img);
            removedCount++;
        } else if (!img.complete) {
            // Image hasn't loaded yet, add error handler
            img.addEventListener('error', function() {
                removeGalleryItem(this);
            });
            
            // Also handle case where src is empty or invalid
            if (!img.src || img.src === window.location.href || img.src === '') {
                removeGalleryItem(img);
            }
        }
    });
    
    // Also clean up any gallery items that are completely empty or have no valid content
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');
    galleryItems.forEach(item => {
        const img = item.querySelector('.gallery-image');
        if (!img || !img.src || img.src === window.location.href) {
            // Check if there's any valid content
            const wrapper = item.querySelector('.gallery-image-wrapper');
            if (!wrapper || !wrapper.querySelector('img')) {
                item.remove();
            }
        }
    });
    
    // Re-setup lightbox after any removals
    if (removedCount > 0) {
        console.log(`Removed ${removedCount} broken images from gallery`);
    }
}

// Helper function to remove a gallery item
function removeGalleryItem(img) {
    const galleryItem = img.closest('.gallery-item');
    if (galleryItem) {
        galleryItem.remove();
    }
}

// Gallery View More
function setupGalleryViewMore() {
    const viewMoreBtn = document.getElementById('gallery-view-more');
    const hiddenItems = document.querySelectorAll('.gallery-hidden');
    let isExpanded = false;
    
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;
            
            hiddenItems.forEach(item => {
                if (isExpanded) {
                    item.classList.remove('gallery-hidden');
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    item.classList.add('gallery-hidden');
                }
            });
            
            // Update button text and aria-expanded
            viewMoreBtn.textContent = isExpanded ? 'Show less' : 'View more';
            viewMoreBtn.setAttribute('aria-expanded', isExpanded);
        });
    }
}

// Lightbox for Gallery Images
function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxBack = document.getElementById('lightbox-back');
    const galleryGrid = document.querySelector('.gallery-grid');
    
    if (!lightbox || !lightboxImage || !galleryGrid) return;
    
    // Function to open lightbox with an image
    function openLightbox(imageSrc) {
        lightboxImage.src = imageSrc;
        lightbox.removeAttribute('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    // Function to close lightbox
    function closeLightbox() {
        lightbox.setAttribute('hidden', '');
        lightboxImage.src = '';
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Add click handlers to all gallery images
    galleryGrid.addEventListener('click', function(e) {
        const img = e.target.closest('.gallery-image');
        if (img) {
            e.preventDefault();
            openLightbox(img.src);
        }
    });
    
    // Close button handler
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Back button handler - goes back to website (closes lightbox)
    if (lightboxBack) {
        lightboxBack.addEventListener('click', function() {
            closeLightbox();
            // Scroll back to gallery section
            const gallerySection = document.getElementById('gallery');
            if (gallerySection) {
                gallerySection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !lightbox.hasAttribute('hidden')) {
            closeLightbox();
        }
    });
}
