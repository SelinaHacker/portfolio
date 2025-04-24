document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("nav a");
    const projectBtn = document.querySelector(".btn");
    const sections = document.querySelectorAll("section");

    function showSection(id) {
        sections.forEach(sec =>
            sec.classList.toggle("active", sec.id === id)
        );
    }

    const initial = window.location.hash.slice(1) || "hero";
    showSection(initial);

    navLinks.forEach(link =>
        link.addEventListener("click", e => {
            e.preventDefault();
            const targetId = link.getAttribute("href").slice(1);
            showSection(targetId);
            history.pushState(null, "", `#${targetId}`);
        })
    );

    if (projectBtn) {
        projectBtn.addEventListener("click", e => {
            e.preventDefault();
            showSection("projects");
            history.pushState(null, "", "#projects");
        });
    }
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
    });
});
