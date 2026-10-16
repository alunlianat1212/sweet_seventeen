
document.addEventListener("DOMContentLoaded", () => {
    const pages = Array.from(document.querySelectorAll(".page"));

    const openSurpriseBtn = document.getElementById("openSurpriseBtn");
    const previousBtn = document.getElementById("previousBtn");
    const nextBtn = document.getElementById("nextBtn");
    const replayBtn = document.getElementById("replayBtn");

    const pageIndicator = document.getElementById("pageIndicator");
    const pageNavigation = document.getElementById("pageNavigation");

    const musicBtn = document.getElementById("musicBtn");
    const birthdayMusic = document.getElementById("birthdayMusic");

    const blowCandlesBtn = document.getElementById("blowCandlesBtn");
    const candleFlames = document.getElementById("candleFlames");
    const wishMessage = document.getElementById("wishMessage");

    const confettiContainer = document.getElementById("confettiContainer");

    let currentPage = 0;
    let musicPlaying = false;
    let candlesBlown = false;

    const confettiColors = [
        "#f3c6cc",
        "#df9fae",
        "#b85c70",
        "#f6d79b",
        "#fff0e4",
        "#d8b4d8"
    ];

    function showPage(index) {
        if (index < 0 || index >= pages.length) {
            return;
        }

        currentPage = index;

        pages.forEach((page, pageIndex) => {
            const isActive = pageIndex === currentPage;

            page.hidden = !isActive;
            page.classList.toggle("active", isActive);
        });

        pageIndicator.textContent = `${currentPage + 1} / ${pages.length}`;

        previousBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === pages.length - 1;

        pageNavigation.style.display =
            currentPage === 0 || currentPage === pages.length - 1
                ? "none"
                : "flex";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function nextPage() {
        if (currentPage < pages.length - 1) {
            showPage(currentPage + 1);
        }
    }

    function previousPage() {
        if (currentPage > 0) {
            showPage(currentPage - 1);
        }
    }

    async function toggleMusic() {
        if (!birthdayMusic) {
            return;
        }

        if (musicPlaying) {
            birthdayMusic.pause();
            musicPlaying = false;
            musicBtn.textContent = "♪₊˚.🎧";
            return;
        }

        try {
            await birthdayMusic.play();
            musicPlaying = true;
            musicBtn.textContent = "♪₊˚.🎧";
        } catch (error) {
            musicPlaying = false;
            musicBtn.textContent = "♪₊˚.🎧";
            alert(
                "Musik belum dapat diputar. Periksa file birthday.mp3 di folder assets."
            );
        }
    }

    function createConfetti(amount = 100) {
        if (!confettiContainer) {
            return;
        }

        confettiContainer.replaceChildren();

        for (let i = 0; i < amount; i++) {
            const piece = document.createElement("span");

            piece.classList.add("confetti");

            piece.style.left = `${Math.random() * 100}%`;
            piece.style.backgroundColor =
                confettiColors[
                    Math.floor(Math.random() * confettiColors.length)
                ];

            piece.style.animationDelay = `${Math.random() * 2}s`;
            piece.style.animationDuration = `${3 + Math.random() * 3}s`;
            piece.style.width = `${5 + Math.random() * 7}px`;
            piece.style.height = `${8 + Math.random() * 10}px`;

            confettiContainer.appendChild(piece);
        }

        window.setTimeout(() => {
            confettiContainer.replaceChildren();
        }, 8000);
    }

    function blowCandles() {
        if (candlesBlown) {
            return;
        }

        candlesBlown = true;

        candleFlames.classList.add("blown-out");

        wishMessage.textContent =
            "Semoga semua harapan baikmu menemukan jalannya.";

        blowCandlesBtn.textContent = "Harapan Terkirim";
        blowCandlesBtn.disabled = true;

        createConfetti(120);
    }

    function resetBirthday() {
        candlesBlown = false;

        candleFlames.classList.remove("blown-out");

        wishMessage.textContent =
            "Buatlah satu harapan terbaikmu.";

        blowCandlesBtn.textContent = "Tiup Lilin";
        blowCandlesBtn.disabled = false;

        showPage(0);
        confettiContainer.replaceChildren();

        birthdayMusic.pause();
        birthdayMusic.currentTime = 0;

        musicPlaying = false;
        musicBtn.textContent = "Musik";
    }

    openSurpriseBtn.addEventListener("click", () => {
        showPage(1);
        createConfetti(45);
    });

    previousBtn.addEventListener("click", previousPage);
    nextBtn.addEventListener("click", nextPage);

    replayBtn.addEventListener("click", resetBirthday);
    musicBtn.addEventListener("click", toggleMusic);
    blowCandlesBtn.addEventListener("click", blowCandles);

    showPage(0);
});
