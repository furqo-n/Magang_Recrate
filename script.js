// Initialize Bootstrap components (optional if using data-bs attributes only, but good practice)
document.addEventListener('DOMContentLoaded', function () {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }
    });

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                bsCollapse.toggle();
            }
        });
    });

    // Optional: Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });
    const clientButtons = document.querySelectorAll('.client-category-btn');
    clientButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            clientButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Vision & Mission Tabs
    const vmTabButtons = document.querySelectorAll('.vm-tab-btn');
    const vmTabPanes = document.querySelectorAll('.vm-tab-pane');

    vmTabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and panes
            vmTabButtons.forEach(btn => btn.classList.remove('active'));
            vmTabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab + '-content').classList.add('active');
        });
    });

    // Portfolio Category Buttons
    const portfolioButtons = document.querySelectorAll('.portfolio-category-btn');
    portfolioButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            portfolioButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Stats Counter Animation
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const duration = 2000; // 2 seconds animation
                const increment = target / (duration / 16); // ~60 FPS

                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        counter.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCount();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    const counters = document.querySelectorAll('.count');
    counters.forEach(counter => {
        observer.observe(counter);
    });
});

// Image Preview Modal Logic
document.addEventListener('DOMContentLoaded', function () {
    const imagePreviewModal = document.getElementById('imagePreviewModal');
    if (imagePreviewModal) {
        imagePreviewModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const imageUrl = button.getAttribute('data-bs-image');
            const modalImage = imagePreviewModal.querySelector('#modalPreviewImage');
            modalImage.src = imageUrl;
        });
    }
});
