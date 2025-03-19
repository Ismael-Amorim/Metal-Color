function setupCarousel(carouselContainer) {
    const carouselTrack = carouselContainer.querySelector('.carousel-track');
    const productCards = carouselContainer.querySelectorAll('.product-card');
    const prevButton = carouselContainer.querySelector('.prev-button');
    const nextButton = carouselContainer.querySelector('.next-button');
    let currentIndex = 0;
    let cardWidth = productCards[0].offsetWidth;
    let visibleCards = window.innerWidth > 768 ? 5 : 1; // 5 para desktop, 1 para mobile

    // Se houver menos produtos do que os visíveis, não faz nada
    if (productCards.length <= visibleCards) {
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
        return;
    }

    // Clonar os produtos e adicioná-los ao final
    for (let i = 0; i < productCards.length; i++) {
        carouselTrack.appendChild(productCards[i].cloneNode(true));
    }

    function updateCarousel() {
        carouselTrack.style.transition = 'transform 0.5s ease-in-out';
        carouselTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    function jumpToStart() {
        carouselTrack.style.transition = 'none';
        currentIndex = productCards.length;
        carouselTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        setTimeout(() => {
            carouselTrack.style.transition = 'transform 0.5s ease-in-out';
            currentIndex = 0; // Ajuste importante aqui
            updateCarousel();
        }, 10);
    }

    nextButton.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex === productCards.length * 2) {
            jumpToStart();
        } else {
            updateCarousel();
        }
    });

    prevButton.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) {
            jumpToStart();
            currentIndex = productCards.length * 2 - 1;
        } else {
            updateCarousel();
        }
    });

    // Intervalo específico para cada carrossel
    setInterval(() => {
        currentIndex++;
        if (currentIndex === productCards.length * 2) {
            jumpToStart();
        } else {
            updateCarousel();
        }
    }, 3000);

    // Ajuste inicial para evitar "pulo" no primeiro clique do botão "Anterior"
    updateCarousel();
}

// Inicializar os carrosséis
const lancamentosCarousel = document.querySelector('.lancamentos-carousel');
setupCarousel(lancamentosCarousel);

const destaquesCarousel = document.querySelector('.destaques-carousel');
setupCarousel(destaquesCarousel);

const maisVendidosCarousel = document.querySelector('.mais-vendidos-carousel');
setupCarousel(maisVendidosCarousel);