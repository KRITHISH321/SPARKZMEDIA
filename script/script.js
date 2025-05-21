// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.querySelector('nav');
    const body = document.body;

    if (menuBtn) {
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            nav.classList.toggle('active');
            menuBtn.classList.toggle('ri-close-line');
            menuBtn.classList.toggle('ri-menu-line');
            body.classList.toggle('no-scroll');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active') && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
            nav.classList.remove('active');
            menuBtn.classList.add('ri-menu-line');
            menuBtn.classList.remove('ri-close-line');
            body.classList.remove('no-scroll');
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            menuBtn.classList.add('ri-menu-line');
            menuBtn.classList.remove('ri-close-line');
            body.classList.remove('no-scroll');
        });
    });

    // Initialize Swiper
    const serviceSwiper = new Swiper('.service__swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        grabCursor: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });

    // Portfolio Video Handling
    const portfolioVideos = document.querySelectorAll('.portfolio__video');

    // Function to force play video
    const forcePlayVideo = (video) => {
        video.muted = true;
        video.play().catch(error => {
            console.log('Video autoplay failed:', error);
            // Try playing again after a short delay
            setTimeout(() => {
                video.play().catch(e => console.log('Retry failed:', e));
            }, 1000);
        });
    };

    // Initialize all videos
    portfolioVideos.forEach(video => {
        // Set initial state
        video.muted = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.setAttribute('x5-playsinline', '');
        
        // Force play on load
        video.addEventListener('loadeddata', () => {
            forcePlayVideo(video);
        });

        // Force play when video becomes visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    forcePlayVideo(video);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        observer.observe(video);

        // Ensure video stays playing
        video.addEventListener('pause', () => {
            forcePlayVideo(video);
        });

        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                forcePlayVideo(video);
            }
        });
    });

    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter__btn');
    const portfolioItems = document.querySelectorAll('.portfolio__item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Lightbox for Posters
    const posterItems = document.querySelectorAll('.portfolio__item.poster');
    const lightboxModal = document.querySelector('.lightbox__modal');
    const modalImage = lightboxModal.querySelector('img');
    const lightboxClose = lightboxModal.querySelector('.modal__close');

    posterItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').getAttribute('src');
            modalImage.setAttribute('src', imgSrc);
            lightboxModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Video Modal
    const videoItems = document.querySelectorAll('.portfolio__item.video');
    const videoModal = document.querySelector('.video__modal');
    const modalVideo = videoModal.querySelector('video');
    const videoModalClose = videoModal.querySelector('.modal__close');

    videoItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoSrc = item.querySelector('video source').getAttribute('src');
            modalVideo.querySelector('source').setAttribute('src', videoSrc);
            modalVideo.load();
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    videoModalClose.addEventListener('click', () => {
        videoModal.classList.remove('active');
        modalVideo.pause();
        document.body.style.overflow = 'auto';
    });

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            modalVideo.pause();
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            videoModal.classList.remove('active');
            modalVideo.pause();
            document.body.style.overflow = 'auto';
        }
    });
});
