# 🌐 Website Index: RCCG The Envoys — 3rd Anniversary

## 🏛️ Organization Information
- **Church**: RCCG The Envoys Youth Province 20
- **Event**: 3rd Anniversary Celebration
- **Date**: 22nd February 2026
- **Purpose**: Celebrating 3 years of grace, growth, and God's faithfulness
- **Website Type**: Single-page anniversary website with testimonials collection and photo gallery

---

## 📁 Project Structure

```
Anniversary Website/
├── index.html                    # Main website (single page)
├── css/
│   └── styles.css               # All styling (~2400+ lines)
├── js/
│   ├── main.js                 # Core functionality (~280 lines)
│   └── gallery-upload.js       # Cloudinary gallery management (~350 lines)
├── img/
│   ├── logo/                   # Church logo (Logo Light.png, channels4_profile.jpg)
│   ├── hero section/           # 9 hero slideshow images
│   ├── Gallery/                # 83 gallery images
│   ├── Journey story/          # Timeline media (images + 2 videos)
│   └── Special/                # Special event images
├── netlify/
│   └── functions/
│       ├── list-images.js      # Cloudinary image listing
│       └── delete-image.js     # Cloudinary image deletion
├── APPS_SCRIPT_CODE.gs         # Google Apps Script for form
├── APPS_SCRIPT_QUICK_GUIDE.md # Setup guide
├── DOCUMENTATION_INDEX.md      # All documentation
├── DOCUMENTATION_COMPLETE.md   # Complete docs
└── package.json                # Project config
```

---

## 🎨 Design & Branding

| Element | Value |
|---------|-------|
| **Primary Color** | Army Green `#2D7A4A` |
| **Secondary** | Light Green `#3D9A5A` |
| **Dark** | `#1D5A3A` |
| **Font Family** | Poppins (body), Playfair Display (headings) |
| **Style** | Premium, modern, church-themed |
| **Responsive** | Mobile, Tablet, Desktop |

---

## 📱 Website Sections (5 Main Sections)

### 1. **Hero Section**
- **Type**: Full-viewport slideshow
- **Slides**: 9 images (auto-advances every 2.5 seconds)
- **Content**:
  - Kicker: "RCCG THE ENVOYS"
  - Title: "3rd Anniversary"
  - Subtitle: "Celebrating years of grace, growth, and God's faithfulness."
  - Date Chip: "22nd February 2026"
  - CTA: "Share Your Testimony" button

### 2. **Why We Celebrate** (Coverage Compact)
- **Background**: White
- **Items**:
  - Grace & faithfulness
  - Growth & impact
  - Community & fellowship
  - Worship & praise
  - Testimonies

### 3. **Share Your Testimony** (Form Section)
- **Background**: Light gray (#f8f9fa)
- **Form Fields**:
  | Field | Type | Required |
  |-------|------|----------|
  | Full Name | text | Yes |
  | Email | email | Yes |
  | Phone Number | tel | No |
  | Category | select | No |
  | Testimony | textarea | Yes |
- **Categories**: Salvation, Healing, Provision, Deliverance, Breakthrough, Other
- **Submit Button**: "Submit Testimony"

### 4. **Our Journey** (Timeline)
- **Background**: Army Green (#2D7A4A)
- **Timeline Items**:
  - **Year 1 — The beginning**: Vision birthed, commitment to raise young ambassadors for Christ
  - **Year 2 — Growing together**: Community expanded, lives transformed through worship
  - **Year 3 — Celebrating grace**: Three years of God's faithfulness
- **Media**: Images and videos embedded in timeline

### 5. **Gallery** (Moments of Grace)
- **Background**: Light gradient (#f5f5f5 to #fafafa)
- **Features**:
  - 83 pre-loaded images
  - "View more" button (expands hidden items)
  - Upload button with modal
  - Hover effects with overlay
  - Hashtag CTA: "#TheEnvoysAt3"

---

## 🔧 Technical Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **Fonts** | Google Fonts (Poppins, Playfair Display) |
| **Icons** | Font Awesome 6.5 (CDN) |
| **Image Hosting** | Cloudinary |
| **Backend** | Netlify Functions (serverless Node.js) |
| **Database** | Google Sheets |
| **Form Processing** | Google Apps Script |
| **Hosting** | Netlify-ready (static files) |

---

## 🌐 Integrations

### 1. **Google Sheets** (Testimony Form)
- **Spreadsheet ID**: `17TWU8JIXRTejsXGmY-9-7KaTG3abr6QPzdw2vQ8d1sc`
- **Sheet Name**: `Responses`
- **Web App URL**: `https://script.google.com/macros/s/AKfycbwMBCD9Tc0kpOXx9cQAf7zf_gQsctbxZEIDeRaRFjXXvZBMJG38rolMvS3oXl2NUP-Zhw/exec`
- **Data Columns**:
  | Column | Field |
  |--------|-------|
  | A | Timestamp |
  | B | Name |
  | C | Email |
  | D | Phone |
  | E | Testimony |
  | F | Share on Social |
  | G | Share Publicly |
  | H | User ID |
  | I | IP Address |
  | J | User Agent |

### 2. **Cloudinary** (Gallery)
- **Cloud Name**: `dmv0hpkaq`
- **Upload Preset**: `envoys-gallery` (unsigned)
- **Features**:
  - Image upload (unsigned, client-side)
  - Image listing (via Netlify function)
  - Image deletion (via Netlify function)
  - Max file size: 5MB
  - Supported formats: JPG, PNG, WebP

### 3. **Netlify Functions**
- **list-images.js**: Lists Cloudinary resources (GET)
- **delete-image.js**: Deletes Cloudinary resources (POST)
- **Environment Variables Required**:
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`

---

## 📝 JavaScript Features

### js/main.js Functions
| Function | Purpose |
|----------|---------|
| `setupMobileMenu()` | Hamburger menu toggle, mobile navigation |
| `animateOnScroll()` | IntersectionObserver for scroll animations |
| `initHeroSlideshow()` | Auto-advancing hero slider |
| `setupTestimonySheet()` | Form submission to Google Apps Script |
| `setupGalleryInteractions()` | Hover effects on gallery items |
| `setupGalleryViewMore()` | Expand/collapse gallery items |

### js/gallery-upload.js Classes
| Class/Method | Purpose |
|--------------|---------|
| `GalleryManager` | Main class for upload management |
| `openModal()` / `closeModal()` | Upload modal control |
| `validateAndSelectFile()` | File validation (type, size) |
| `uploadImage()` | Cloudinary upload via AJAX |
| `fetchSharedImages()` | Get images from Netlify function |
| `deleteImage()` | Delete via Netlify function |
| `showDeleteConfirmation()` | Delete confirmation dialog |

---

## ✅ Implemented Features

### UI/UX
- [x] Responsive design (mobile < 768px, tablet < 1024px, desktop)
- [x] Hero slideshow with 9 images
- [x] Dot navigation for slideshow
- [x] Scroll-triggered animations
- [x] Mobile hamburger menu
- [x] Navbar scroll effect (green → dark green)
- [x] Gallery grid with hover overlays
- [x] "View more" gallery expansion
- [x] Image upload modal with drag & drop

### Forms & Data
- [x] Form validation (required fields)
- [x] Form submission to Google Sheets
- [x] Success/failure modal feedback
- [x] Category dropdown for testimonies

### Gallery
- [x] Cloudinary image upload
- [x] Upload progress indicator
- [x] User upload management (localStorage)
- [x] Image deletion (local + Cloudinary)
- [x] Shared images display

### Accessibility & Performance
- [x] ARIA labels
- [x] Reduced motion support (`prefers-reduced-motion`)
- [x] Dark mode support (`prefers-color-scheme`)
- [x] Lazy loading images
- [x] Font preloading
- [x] DNS prefetching

---

## 🎯 Key Files Summary

| File | Lines | Purpose |
|------|-------|---------|
| `index.html` | ~350 | Main HTML structure with all 5 sections |
| `css/styles.css` | ~2400 | Complete styling, animations, responsive |
| `js/main.js` | ~280 | Navigation, slideshow, form, gallery UI |
| `js/gallery-upload.js` | ~350 | Cloudinary upload/list/delete management |
| `APPS_SCRIPT_CODE.gs` | ~120 | Google Apps Script for form processing |
| `netlify/functions/list-images.js` | ~40 | Serverless Cloudinary listing |
| `netlify/functions/delete-image.js` | ~45 | Serverless Cloudinary deletion |

---

## 🚀 Deployment Status

| Component | Status |
|-----------|--------|
| Frontend (HTML/CSS/JS) | ✅ Ready to deploy |
| Google Apps Script | ✅ Deployed as Web App |
| Netlify Functions | ⚠️ Ready (needs env vars) |
| Cloudinary | ✅ Configured |
| Google Sheets | ⚠️ Needs "Responses" sheet created |

---

## 📊 Image Assets Summary

| Folder | Count | Types |
|--------|-------|-------|
| `img/logo/` | 2 | PNG, JPG |
| `img/hero section/` | 9 | JPG |
| `img/Gallery/` | 83 | JPG, JPEG |
| `img/Journey story/` | 3 | JPEG, MP4 |
| `img/Special/` | 11 | JPG, JPEG |

**Total Images**: ~108

---

## 🔗 External Resources

| Resource | URL |
|----------|-----|
| Google Fonts | https://fonts.googleapis.com |
| Font Awesome | https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0 |
| Cloudinary API | https://api.cloudinary.com/v1_1/{cloud_name}/ |
| Google Apps Script | https://script.google.com |

---

## 📋 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Mobile Chrome (Android)

---

## 📝 Notes

1. **Form Submission**: The Google Apps Script is deployed but needs the "Responses" sheet to be created in the spreadsheet
2. **Gallery Upload**: Cloudinary is configured with unsigned uploads
3. **Netlify Functions**: Require environment variables to be set in Netlify dashboard
4. **Videos**: 2 MP4 videos in timeline (Year 2 and Year 3)
5. **Hashtag**: #TheEnvoysAt3 for social media sharing

---

*Last Updated: February 20, 2026*
*Status: Production Ready*
