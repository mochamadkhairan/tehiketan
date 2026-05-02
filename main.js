// Initialize Animations
AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-out-quad'
});

// Loading Screen Handler - Disable pointer events after fade out
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    // Ensure it's disabled after animation
    setTimeout(() => {
        loadingScreen.style.pointerEvents = 'none';
        loadingScreen.style.display = 'none';
    }, 3300);
});

// Fallback: Hide loading screen if it takes too long (4 seconds)
setTimeout(() => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
        loadingScreen.style.pointerEvents = 'none';
    }
}, 4000);

// Detect mobile
const isMobile = () => window.innerWidth < 768;

// Navbar Scroll Logic
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('glass-nav', 'text-stone-800');
        if (!isMobile()) {
            navbar.classList.add('py-4');
            navbar.classList.remove('py-6');
        }
    } else {
        navbar.classList.remove('glass-nav', 'text-stone-800', 'py-4');
        if (!isMobile()) {
            navbar.classList.add('py-6');
        }
    }
});

// Update on window resize to handle mobile/desktop toggle
window.addEventListener('resize', () => {
    if (window.scrollY > 50) {
        if (!isMobile()) {
            navbar.classList.add('py-4');
            navbar.classList.remove('py-6');
        } else {
            navbar.classList.remove('py-4', 'py-6');
        }
    }
});

// Hamburger Menu Logic
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');
const navbarEl = document.getElementById('navbar');
let isOpen = false;

// Toggle Menu
function toggleMenu() {
    isOpen = !isOpen;

    if (isOpen) {
        // Open menu
        mobileMenu.classList.remove('-translate-x-full');
        mobileMenu.classList.add('translate-x-0');

        // Animate hamburger to X
        line1.style.transform = 'rotate(45deg) translateY(8px)';
        line2.style.opacity = '0';
        line3.style.transform = 'rotate(-45deg) translateY(-8px)';

        // Disable body scroll
        document.body.style.overflow = 'hidden';
        document.body.style.overflowX = 'hidden';
        hamburger.setAttribute('aria-expanded', 'true');
    } else {
        // Close menu
        mobileMenu.classList.add('-translate-x-full');
        mobileMenu.classList.remove('translate-x-0');

        // Reset hamburger icon
        line1.style.transform = 'none';
        line2.style.opacity = '1';
        line3.style.transform = 'none';

        // Enable body scroll - restore properly
        document.body.style.overflow = '';
        document.body.style.overflowX = 'hidden';
        hamburger.setAttribute('aria-expanded', 'false');
    }
}

// Menu button click
hamburger.addEventListener('click', toggleMenu);

// Close menu when link is clicked
const menuLinks = mobileMenu.querySelectorAll('a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isOpen) {
            toggleMenu();
        }
    });
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
        toggleMenu();
    }
});

// Navbar styling for mobile menu toggle
hamburger.addEventListener('click', () => {
    // Just keep navbar styling consistent during menu toggle
    if (!isOpen) {
        // Opening menu - add glass effect
        navbarEl.classList.add('glass-nav', 'text-stone-800');
    } else {
        // Closing menu - restore based on scroll
        if (window.scrollY <= 50) {
            navbarEl.classList.remove('glass-nav', 'text-stone-800');
            navbarEl.classList.add('text-white');
        }
    }
});

// Gallery Lightbox Functionality
const galleryModal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const closeModal = document.getElementById('closeModal');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const imageCounter = document.getElementById('imageCounter');
const totalImages = document.getElementById('totalImages');

const galleryItems = [
    { src: 'images/galeri-1.jpg', title: 'Momen Kesegaran', desc: 'Es Teh Premium dengan cita rasa khas yang menyegarkan' },
    { src: 'images/galeri-2.jpeg', title: 'Kesegaran', desc: 'Momen istimewa bersama Es Teh Iketan pilihan terbaik' },
    { src: 'images/galeri-3.jpeg', title: 'Layanan Terbaik', desc: 'Kepuasan pelanggan adalah prioritas utama kami' },
    { src: 'images/galeri-4.jpeg', title: 'Cita Rasa', desc: 'Nikmat premium yang tak terlupakan di setiap tegukan' },
    { src: 'images/galeri-5.jpeg', title: 'Komunitas', desc: 'Pelanggan setia yang mempercayai kualitas kami' },
    { src: 'images/galeri-6.jpeg', title: 'Pengalaman Tak Terlupakan', desc: 'Bersama Es Teh Iketan menciptakan kenangan indah' }
];

let currentImageIndex = 0;

// Open modal on gallery item click
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openModal();
    });
});

// Open Modal Function
function openModal() {
    const item = galleryItems[currentImageIndex];
    modalImage.src = item.src;
    modalTitle.textContent = item.title;
    modalDesc.textContent = item.desc;
    imageCounter.textContent = currentImageIndex + 1;
    totalImages.textContent = galleryItems.length;
    galleryModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Close Modal Function
function closeGalleryModal() {
    galleryModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Navigation Functions
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    updateModalImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    updateModalImage();
}

function updateModalImage() {
    const item = galleryItems[currentImageIndex];
    modalImage.src = item.src;
    modalTitle.textContent = item.title;
    modalDesc.textContent = item.desc;
    imageCounter.textContent = currentImageIndex + 1;
}

// Event Listeners
closeModal.addEventListener('click', closeGalleryModal);
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

// Close modal on backdrop click
galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        closeGalleryModal();
    }
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (!galleryModal.classList.contains('hidden')) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeGalleryModal();
    }
});

// MENU FILTERING AND SEARCH FUNCTIONALITY

// Get elements
const menuFilterBtns = document.querySelectorAll('.menu-filter-btn');
const menuSearch = document.getElementById('menuSearch');
const menuCards = document.querySelectorAll('#menu .menu-card');
const menuGrid = document.getElementById('menuGrid');
const noResults = document.getElementById('noResults');

let currentFilter = 'all';
let currentSearch = '';

// Filter by category
menuFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        menuFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        btn.style.backgroundColor = '#dc2626';
        btn.style.color = 'white';
        btn.style.borderColor = '#dc2626';

        currentFilter = btn.dataset.filter;
        filterAndSearchMenu();
    });
});

// Search menu
menuSearch.addEventListener('input', (e) => {
    currentSearch = e.target.value.toLowerCase();
    filterAndSearchMenu();
});

function filterAndSearchMenu() {
    let visibleCount = 0;

    menuCards.forEach(card => {
        const category = card.dataset.category;
        const name = card.dataset.name.toLowerCase();

        // Check category filter
        const categoryMatch = currentFilter === 'all' || category === currentFilter;

        // Check search query
        const searchMatch = name.includes(currentSearch);

        // Show or hide card
        if (categoryMatch && searchMatch) {
            card.classList.remove('hide');
            card.classList.add('show');
            visibleCount++;
        } else {
            card.classList.add('hide');
            card.classList.remove('show');
        }
    });

    // Show no results message
    if (visibleCount === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
    }
}

// Add click handlers to "Pesan Sekarang" buttons
document.querySelectorAll('#menu .menu-card button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const menuName = btn.closest('.menu-card').dataset.name;
        const whatsappUrl = `https://wa.me/6285624281498?text=Halo%20Teh%20Iketan!%20Saya%20ingin%20memesan%20${encodeURIComponent(menuName)}...`;
        window.open(whatsappUrl, '_blank');
    });
});

// Floating WhatsApp Button - Show tooltip on first load
window.addEventListener('load', () => {
    const whatsappBtn = document.getElementById('whatsappFloating');
    if (whatsappBtn) {
        // Show tooltip briefly after 4 seconds
        setTimeout(() => {
            const tooltip = whatsappBtn.querySelector('[class*="group-hover"]');
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.pointerEvents = 'auto';

                // Hide after 3 seconds
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                    tooltip.style.pointerEvents = 'none';
                }, 3000);
            }
        }, 4000);
    }
});

// REVIEW CAROUSEL & FORM FUNCTIONALITY
const reviewForm = document.getElementById('reviewForm');
const reviewCarousel = document.getElementById('reviewCarousel');
const prevReviewBtn = document.getElementById('prevReview');
const nextReviewBtn = document.getElementById('nextReview');
const indicatorsContainer = document.getElementById('carouselIndicators');

let currentCarouselIndex = 0;
let allReviews = []; // Will store all reviews combined

const initialReviews = [
    { name: 'Rina S.', comment: 'Pelayanan yang sangat baik dan kopi mereka benar-benar enak! Saya sudah menjadi pelanggan setia sejak beberapa bulan lalu.', type: 'loyal' },
    { name: 'Budi W.', comment: 'Tempat yang nyaman dan kopi mereka sangat enak. Saya sering datang ke sini untuk bekerja atau bersantai.', type: 'loyal' },
    { name: 'Siti N.', comment: 'Pelayanan sangat ramah dan profesional. Saya merekomendasikan tempat ini kepada semua teman saya.', type: 'loyal' }
];

const MAX_REVIEWS = 7; // Limit to 7 most recent reviews

// Generate random avatar URL using DiceBear API
function generateRandomAvatar(name) {
    const seed = Math.random().toString(36).substring(2, 15);
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
}

// Generate avatar berdasarkan nama
function generateAvatarFromName(name) {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
}

// Create review card HTML for carousel
function createReviewCardForCarousel(name, comment, type = 'new') {
    const avatarUrl = type === 'loyal' ? generateAvatarFromName(name) : generateRandomAvatar(name);
    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card bg-white rounded-lg shadow-md p-4 md:p-6 flex-shrink-0 w-full md:w-1/2 lg:w-1/3 mx-2 my-2';
    reviewCard.innerHTML = `
        <div class="flex items-start gap-3 md:gap-4 mb-4">
            <img src="${avatarUrl}" class="w-10 md:w-12 h-10 md:h-12 rounded-full object-cover flex-shrink-0" alt="Avatar ${name}">
            <div class="flex-1 min-w-0">
                <h3 class="text-base md:text-lg font-serif text-stone-900 truncate">${name}</h3>
                <p class="text-xs md:text-sm text-stone-500">${type === 'loyal' ? 'Pelanggan Setia' : 'Pengunjung Baru'}</p>
            </div>
        </div>
        <p class="text-stone-600 text-sm leading-relaxed line-clamp-3 md:line-clamp-none">
            "${comment}"
        </p>
    `;
    return reviewCard;
}

// Render carousel with latest reviews
function renderCarousel() {
    // Clear existing carousel cards
    reviewCarousel.innerHTML = '';

    // Get latest 7 reviews (combined initial + new)
    const displayReviews = allReviews.slice(0, MAX_REVIEWS);

    // Add cards to carousel
    displayReviews.forEach(review => {
        const card = createReviewCardForCarousel(review.name, review.comment, review.type);
        reviewCarousel.appendChild(card);
    });

    // Update indicators
    updateIndicators();
    updateCarouselPosition();
}

// Update indicators dynamically
function updateIndicators() {
    const displayReviews = allReviews.slice(0, MAX_REVIEWS);
    indicatorsContainer.innerHTML = '';

    displayReviews.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.className = `carousel-indicator w-2 h-2 rounded-full transition-all duration-300 ${
            index === 0 ? 'bg-red-600 active' : 'bg-stone-300'
        }`;
        indicator.addEventListener('click', () => {
            currentCarouselIndex = index;
            updateCarouselPosition();
        });
        indicatorsContainer.appendChild(indicator);
    });
}

// Update carousel position
function updateCarouselPosition() {
    const isMobile = window.innerWidth < 768;
    const itemWidth = isMobile ? 100 : (window.innerWidth < 1025 ? 50 : 33.333);
    const translateValue = -currentCarouselIndex * itemWidth;
    reviewCarousel.style.transform = `translateX(${translateValue}%)`;

    // Update all indicators only (not buttons)
    const allIndicators = document.querySelectorAll('.carousel-indicator');
    allIndicators.forEach((indicator, index) => {
        if (index === currentCarouselIndex) {
            indicator.classList.add('active');
            indicator.classList.add('bg-red-600');
            indicator.classList.remove('bg-stone-300');
            indicator.style.width = '2.5rem';
        } else {
            indicator.classList.remove('active');
            indicator.classList.remove('bg-red-600');
            indicator.classList.add('bg-stone-300');
            indicator.style.width = '0.5rem';
        }
    });
}

// Navigate carousel
function navigateCarousel(direction) {
    const displayReviews = allReviews.slice(0, MAX_REVIEWS);
    const totalSlides = displayReviews.length;

    if (totalSlides <= 1) return;

    if (direction === 'next') {
        currentCarouselIndex = (currentCarouselIndex + 1) % totalSlides;
    } else {
        currentCarouselIndex = (currentCarouselIndex - 1 + totalSlides) % totalSlides;
    }
    updateCarouselPosition();
}

// Carousel button listeners
prevReviewBtn.addEventListener('click', () => navigateCarousel('prev'));
nextReviewBtn.addEventListener('click', () => navigateCarousel('next'));

// Handle form submission
reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('reviewName');
    const commentInput = document.getElementById('reviewComment');

    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();

    if (!name || !comment) {
        alert('Mohon isi semua field');
        return;
    }

    // Add to reviews (insert at beginning for most recent)
    allReviews.unshift({ name, comment, type: 'new', timestamp: new Date().toISOString() });

    // Keep only latest MAX_REVIEWS
    if (allReviews.length > MAX_REVIEWS) {
        allReviews = allReviews.slice(0, MAX_REVIEWS);
    }

    // Save to localStorage
    const reviews = JSON.parse(localStorage.getItem('customReviews')) || [];
    reviews.unshift({ name, comment, timestamp: new Date().toISOString() });
    localStorage.setItem('customReviews', JSON.stringify(reviews));

    // Re-render carousel
    currentCarouselIndex = 0;
    renderCarousel();

    // Reset form
    reviewForm.reset();
    nameInput.focus();

    // Show success message
    showNotification('Terima kasih! Ulasan Anda telah ditambahkan.');
});

// Load saved reviews from localStorage on page load
function loadSavedReviews() {
    // Start with initial reviews
    allReviews = [...initialReviews];

    // Add saved reviews from localStorage
    const reviews = JSON.parse(localStorage.getItem('customReviews')) || [];
    reviews.forEach(review => {
        allReviews.push({ ...review, type: 'new' });
    });

    // Keep only latest MAX_REVIEWS
    if (allReviews.length > MAX_REVIEWS) {
        allReviews = allReviews.slice(0, MAX_REVIEWS);
    }

    // Render carousel
    renderCarousel();
}

// Simple notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slideIn';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize on load
window.addEventListener('load', () => {
    loadSavedReviews();
});

// CERTIFICATE MODAL FUNCTIONALITY
const certBtns = document.querySelectorAll('.cert-btn');
const certModal = document.getElementById('certModal');
const closeCertModalBtn = document.getElementById('closeCertModal');
const certModalContent = document.getElementById('certModalContent');

// Certificate data with mock image placeholders
const certificateData = {
    halal: {
        title: 'Sertifikat Halal',
        icon: 'fa-certificate',
        color: 'from-green-400 to-emerald-600',
        content: `
            <div class="text-center mb-6">
                <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full mb-4">
                    <i class="fas fa-certificate text-white text-3xl"></i>
                </div>
                <h2 class="text-3xl font-serif text-stone-900">Sertifikat Halal</h2>
                <p class="text-stone-500 mt-2">Kementerian Agama Republik Indonesia</p>
            </div>

            <div class="bg-gradient-to-br from-green-50 to-white rounded-xl p-8 border border-green-200 mb-6">
                <div class="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <p class="text-xs text-stone-500 uppercase tracking-wide mb-1">Nomor Sertifikat</p>
                        <p class="text-lg font-bold text-stone-900">00000-00000-000</p>
                    </div>
                    <div>
                        <p class="text-xs text-stone-500 uppercase tracking-wide mb-1">Tanggal Terbit</p>
                        <p class="text-lg font-bold text-stone-900">01 Jan 2023</p>
                    </div>
                    <div>
                        <p class="text-xs text-stone-500 uppercase tracking-wide mb-1">Berlaku Hingga</p>
                        <p class="text-lg font-bold text-stone-900">31 Des 2025</p>
                    </div>
                    <div>
                        <p class="text-xs text-stone-500 uppercase tracking-wide mb-1">Status</p>
                        <p class="text-lg font-bold text-green-600"><i class="fas fa-check-circle mr-1"></i>Aktif</p>
                    </div>
                </div>

                <div class="border-t border-green-200 pt-6">
                    <h3 class="font-semibold text-stone-900 mb-3">Detail Produk</h3>
                    <ul class="space-y-2 text-sm text-stone-600">
                        <li><i class="fas fa-check text-green-600 mr-2"></i>Es Teh Racikan Premium</li>
                        <li><i class="fas fa-check text-green-600 mr-2"></i>Minuman Teh Segar</li>
                        <li><i class="fas fa-check text-green-600 mr-2"></i>Tanpa Bahan Kimia Berbahaya</li>
                        <li><i class="fas fa-check text-green-600 mr-2"></i>Lolos Uji Lab Mikrobologi</li>
                    </ul>
                </div>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p class="text-sm text-stone-700">
                    <i class="fas fa-info-circle text-blue-600 mr-2"></i>
                    Sertifikat ini menjamin bahwa produk Es Teh Iketan telah lolos seluruh proses audit halal dan memenuhi standar kehalalan menurut syariat Islam.
                </p>
            </div>
        `
    },
    'spp-irt': {
        title: 'Surat SPP-IRT',
        icon: 'fa-file-contract',
        color: 'from-blue-400 to-cyan-600',
        content: `
            <div class="text-center mb-6">
                <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full mb-4">
                    <i class="fas fa-file-contract text-white text-3xl"></i>
                </div>
                <h2 class="text-3xl font-serif text-stone-900">Surat SPP-IRT</h2>
                <p class="text-stone-500 mt-2">Dinas Kesehatan Kabupaten Bandung</p>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border border-blue-200 mb-6">
                <div class="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <p class="text-xs text-stone-500 uppercase tracking-wide mb-1">Nomor Izin</p>
                        <p class="text-lg font-bold text-stone-900">20000000000001</p>
                    </div>
                    <div>
                        <p class="text-xs text-stone-500 uppercase tracking-wide mb-1">Tanggal Penerbitan</p>
                        <p class="text-lg font-bold text-stone-900">15 Mar 2023</p>
                    </div>
                    <div>
                        <p class="text-xs text-stone-500 uppercase tracking-wide mb-1">Berlaku Hingga</p>
                        <p class="text-lg font-bold text-stone-900">14 Mar 2026</p>
                    </div>
                    <div>
                        <p class="text-xs text-stone-500 uppercase tracking-wide mb-1">Status</p>
                        <p class="text-lg font-bold text-blue-600"><i class="fas fa-check-circle mr-1"></i>Aktif</p>
                    </div>
                </div>

                <div class="border-t border-blue-200 pt-6">
                    <h3 class="font-semibold text-stone-900 mb-3">Standar Keselamatan Pangan</h3>
                    <ul class="space-y-2 text-sm text-stone-600">
                        <li><i class="fas fa-check text-blue-600 mr-2"></i>Higienitas Produksi Terjaga</li>
                        <li><i class="fas fa-check text-blue-600 mr-2"></i>Kemasan Aman & Berlabel</li>
                        <li><i class="fas fa-check text-blue-600 mr-2"></i>Proses Produksi Terawasi</li>
                        <li><i class="fas fa-check text-blue-600 mr-2"></i>Pengurusan Limbah Proper</li>
                    </ul>
                </div>
            </div>

            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <p class="text-sm text-stone-700">
                    <i class="fas fa-info-circle text-green-600 mr-2"></i>
                    Surat Persetujuan Pemasaran Industri Rumah Tangga (SPP-IRT) ini membuktikan bahwa Es Teh Iketan memenuhi standar keamanan pangan dan keselamatan kerja sesuai regulasi Dinas Kesehatan.
                </p>
            </div>
        `
    }
};

// Open modal
certBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const certType = btn.dataset.cert;
        const data = certificateData[certType];

        if (data) {
            certModalContent.innerHTML = data.content;
            certModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
function closeCertModal() {
    certModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

closeCertModalBtn.addEventListener('click', closeCertModal);

// Close on backdrop click
certModal.addEventListener('click', (e) => {
    if (e.target === certModal) {
        closeCertModal();
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !certModal.classList.contains('hidden')) {
        closeCertModal();
    }
});
