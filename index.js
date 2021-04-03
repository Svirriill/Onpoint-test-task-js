const range = document.querySelector('.range');
const circle = document.querySelector('.circle');
const sliderLine = document.querySelector('.thirdSlide');
const button = document.querySelector('.button');
const orangeShadow = document.querySelector('.orange');
let startY;
let endY;
let currentSlideX = 0;
let currentSlideY = 0;

// функция цветокорректировки поля горизонтального скролла,
// при движении за ползунком
const rangeValue = () => {
    let value = range.value;
    value = (value * 100) / 28;
    range.style.background = `-webkit-linear-gradient(left,
    #d1eaff 0%, #d1eaff ${value + '%'}, #435063 ${value + '%'}, #435063 100%)`;
};

// функция добавления отдельных элементов на первый слайд
const addFirstScreenContain = () => {
    circle.classList.remove('circle_hide');
    button.classList.remove('button_hide');
    orangeShadow.classList.remove('orange_hide');
};

// функция удаления отдельных элементов при переходе с первого слайда
const removeFirstScreenContain = () => {
    circle.classList.add('circle_hide');
    orangeShadow.classList.add('orange_hide');
    button.classList.add('button_hide');
};

// функция скролла сайта по оси Y
const scrollY = (currentSlideY) => {
    const slideWrapper = document.querySelector('.screen');

    slideWrapper.style.transform = `translateY(-${currentSlideY*768}px)`;
};

// функция изменения условий для разных слайдов по Y
const conditionsSlidesForY = () => {
    if (startY - endY > 30 && currentSlideY <= 1) {
        currentSlideY += 1;
        scrollY(currentSlideY);
    }
    if (startY - endY < -30 && currentSlideY >= 1) {
        currentSlideY -= 1;
        scrollY(currentSlideY);
    }
    if (currentSlideY === 0) {
        addFirstScreenContain();
    } else {
        removeFirstScreenContain();
    }
    if (currentSlideY === 2) {
        range.classList.add('range_active');
    } else {
        range.classList.remove('range_active');
    }
}

// функция выбора слайда по горизонтали
const changeSlider = () => {
    if (range.value <= 7) {
        currentSlideX = 0;
        sliderLine.style.left = currentSlideX + 'px';
    }
    if (range.value > 7 && range.value < 21) {
        currentSlideX = -1024;
        sliderLine.style.left = currentSlideX + 'px';
    }
    if (range.value >= 21) {
        currentSlideX = -2048;
        sliderLine.style.left = currentSlideX + 'px';
    }
}


window.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
});

window.addEventListener('touchend', (e) => {
    endY = e.changedTouches[0].clientY;
    conditionsSlidesForY();
});

button.addEventListener('click', (e) => {
    if (currentSlideY <= 1) {
        currentSlideY += 1;
        removeFirstScreenContain();
        scrollY(currentSlideY);
    }
});

range.addEventListener('input', () => {
    rangeValue();
    changeSlider();
});