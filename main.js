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
        const whatsappUrl = `https://wa.me/6281234567890?text=Halo%20Teh%20Iketan!%20Saya%20ingin%20memesan%20${encodeURIComponent(menuName)}...`;
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
