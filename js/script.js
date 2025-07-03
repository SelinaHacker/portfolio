document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("nav a");
    const projectBtn = document.querySelector(".btn");
    const sections = document.querySelectorAll("section");
    const menuToggle = document.querySelector(".menu-toggle");
    const navList = document.querySelector(".nav-links");

    function showSection(id) {
        sections.forEach(sec =>
            sec.classList.toggle("active", sec.id === id)
        );
    }

    if (sections.length > 0) {
        const initial = window.location.hash.slice(1) || "hero";
        showSection(initial);

        navLinks.forEach(link =>
            link.addEventListener("click", e => {
                // Nur Links, die auf Sections zeigen (#) behandeln
                if (link.getAttribute("href").startsWith("#")) {
                    e.preventDefault();
                    const targetId = link.getAttribute("href").slice(1);
                    showSection(targetId);
                    history.pushState(null, "", `#${targetId}`);

                    // Menü auf Mobilgeräten nach Klick schließen
                    if (window.innerWidth <= 768 && navList.classList.contains("show")) {
                        navList.classList.remove("show");
                    }
                }
            })
        );

        if (projectBtn) {
            projectBtn.addEventListener("click", e => {
                e.preventDefault();
                showSection("projects");
                history.pushState(null, "", "#projects");
            });
        }
    }

    if (menuToggle && navList) {
        menuToggle.addEventListener("click", () => {
            navList.classList.toggle("show");
        });
    }

    // Carousel-Logik
    document.querySelectorAll('.carousel').forEach(carousel => {
        const track = carousel.querySelector('.carousel-images');
        const images = track.querySelectorAll('img');
        const prevBtn = carousel.querySelector('.carousel-btn.left');
        const nextBtn = carousel.querySelector('.carousel-btn.right');

        let currentIndex = 0;
        const imagesPerPage = 2;

        function updateCarousel() {
            const containerWidth = carousel.offsetWidth;
            track.style.transform = `translateX(-${currentIndex * containerWidth}px)`;
        }

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                const maxIndex = Math.ceil(images.length / imagesPerPage) - 1;
                if (currentIndex < maxIndex) {
                    currentIndex++;
                    updateCarousel();
                }
            });

            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });

            window.addEventListener('resize', updateCarousel);
        }
    });

    // Lightbox-Logik
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    let images = [];
    let currentIndex = 0;

    if (lightbox && lightboxImg && closeLightbox) {
        images = Array.from(document.querySelectorAll('.project-images img'));

        images.forEach((img, index) => {
            img.addEventListener('click', () => {
                currentIndex = index;
                openLightbox();
            });
        });

        function openLightbox() {
            lightboxImg.src = images[currentIndex].src;
            lightbox.classList.add('show');
        }

        function closeLightboxFn() {
            lightbox.classList.remove('show');
        }

        function showPrevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            openLightbox();
        }

        function showNextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            openLightbox();
        }

        closeLightbox.addEventListener('click', closeLightboxFn);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightboxFn();
            }
        });

        if (leftArrow) {
            leftArrow.addEventListener('click', (e) => {
                e.stopPropagation(); // Verhindert, dass Lightbox sich schließt
                showPrevImage();
            });
        }

        if (rightArrow) {
            rightArrow.addEventListener('click', (e) => {
                e.stopPropagation();
                showNextImage();
            });
        }

        // ➡️ Tastatursteuerung (Pfeile und Esc)
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('show')) return;

            if (e.key === "ArrowLeft") {
                showPrevImage();
            }
            if (e.key === "ArrowRight") {
                showNextImage();
            }
            if (e.key === "Escape") {
                closeLightboxFn();
            }
        });
    }
});
