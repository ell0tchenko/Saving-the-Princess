import { startGameFromStory, currentAudioElement } from './game.js';

export let plotText, plotText1, imageContainer, arrow, arrowImg;
export const timeline = [1000, 2000, 6000, 7000, 8000, 1000, 1100];
export let paragraphs = [];
export let pageNumber = 0;
export let nextPageBtn;
export let campaignStart = false;

export function startCampaignWindow() {
    const startCampaign = document.querySelector('.start-campaign-button');
    startCampaign.addEventListener('click', () => {
        // currentAudioElement.play();
        campaignStart = true;
        const startOverlay = document.querySelector('.start-overlay');
        const startBtn = document.querySelector('.start-campaign-button');
        const plotOverlay = document.querySelector('.plot-overlay');
        startOverlay.hidden = true;
        startBtn.hidden = true;
        plotOverlay.hidden = false;
        setupPlotContainer();
    });
}

function setupPlotContainer() {
    const plotContainer = document.createElement('div');
    imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    plotContainer.classList.add('plot-container');
    plotText = document.createElement('p');
    plotText1 = document.createElement('p');

    const nextPage = document.createElement('div');
    arrow = document.createElement('button');
    arrowImg = document.createElement('img');
    arrowImg.hidden = true;
    nextPage.classList.add('next-page');
    arrow.classList.add('arrow-button');
    arrowImg.classList.add('arrow');
    plotText.classList.add('plot-text');
    plotText1.classList.add('plot-text1');
    arrow.append(arrowImg);
    nextPage.append(arrow);
    plotContainer.append(plotText, imageContainer, plotText1, nextPage);
    
    document.querySelector('.plot-overlay').append(plotContainer);
    arrow.disabled = true;
    arrow.style.cursor = 'default';
    nextPageBtn = document.querySelector('.arrow-button');
    fetch('./assets/plot.txt')
        .then(response => response.text())
        .then(text => {
            paragraphs = text.split('\n');
            firstPage();
            arrow.classList.add('page1');
            nextPageBtn.addEventListener('click', nextPageHandler);
        });
}

function nextPageHandler() {
    if (arrow.classList.contains('page1')) {
        arrow.classList.remove('page1');
        arrow.classList.add('page2');
        secondPage();
    } else if (arrow.classList.contains('page2')) {
        arrow.classList.remove('page2');
        arrow.classList.add('page3');
        thirdPage();
    } else if (arrow.classList.contains('page3')) {
        arrow.classList.remove('page3');
        arrow.classList.add('page4');
        fourthPage();
    } else if (arrow.classList.contains('page4')) {
        arrow.classList.remove('page4');
        arrow.classList.add('page5');
        fifthPage();
    }
}

export function nextPage() {
    arrowImg.hidden = true;
    arrow.hidden = true;
    const nextPageTiming = pageNumber === 1 || pageNumber === 3 || pageNumber === 4 || pageNumber === 5 ? timeline[6] : timeline[5];
    setTimeout(() => {
        arrow.disabled = false;
        arrowImg.hidden = false;
        arrow.hidden = false;
        arrow.style.cursor = 'pointer';
        arrowImg.src = './assets/icons/next-page.svg';
        arrowImg.addEventListener('mouseenter', () => {
            arrowImg.src = './assets/icons/next-page-hover.svg';
        });
        arrowImg.addEventListener('mouseleave', () => {
            arrowImg.src = './assets/icons/next-page.svg';
        });
    }, nextPageTiming);
}

function cleaner() {
    [plotText, plotText1].forEach(element => {
        element.style.animation = "none";
        element.offsetHeight;
        element.style.animation = null;
        element.textContent = "";
    });
    imageContainer.innerHTML = "";
    arrow.hidden = true;
    arrow.disabled = true;
}

function showImage(imageSrc, className) {
    const image = document.createElement('img');
    image.src = imageSrc;
    image.classList.add(className);
    imageContainer.appendChild(image);
}

function setPageContent(firstParagraphIndex, secondParagraphIndex, firstImageSrc, secondImageSrc) {
    plotText.textContent = paragraphs[firstParagraphIndex];
    if (secondParagraphIndex !== undefined && paragraphs.length > 1) {
        plotText1.textContent = paragraphs[secondParagraphIndex];
    }
    if (firstImageSrc) {
        showImage(firstImageSrc, 'first-image');
    }
    if (secondImageSrc) {
        showImage(secondImageSrc, 'first-image');
    }
}

function setPage(pageNumber, firstParagraphIndex, secondParagraphIndex, firstImageSrc, secondImageSrc) {
    cleaner();
    setPageContent(firstParagraphIndex, secondParagraphIndex, firstImageSrc, secondImageSrc);
    nextPage();
    pageNumber++;
}

export function firstPage() {
    setPage(1, 0, 1, './assets/icons/girl.png', './assets/icons/tetris-phone.png');
}

export function secondPage() {
    setPage(2, 2, 3, './assets/icons/casino.png');
}

export function thirdPage() {
    setPage(3, 4, 5, './assets/icons/window.png', './assets/icons/crowd.png');
}

export function fourthPage() {
    setPage(4, 6, 7, './assets/icons/angry-woman.png', './assets/icons/monk.png');
}

export function fifthPage() {
    setPage(5, 8, 9, './assets/icons/princess.png');

    const plotOverlay = document.querySelector('.plot-overlay');
    nextPageBtn.addEventListener('click', () => {
        if (arrow.classList.contains('page5')) {
            plotOverlay.hidden = true;
            startGameFromStory();
        }
    });
}

export function ending() {
    const endingOverlay = document.querySelector('.ending-overlay');
    const goodbyeOverlay = document.querySelector('.goodbye-overlay');
    endingOverlay.classList.add('show-overlay');
    const princessImg = document.querySelector('.princess-img');
    const goodbyeText = document.querySelector('.goodbye-text');
    const backtomenuBtn = document.querySelector('.backtomenu');
    const princessResponse1 = document.querySelector('.princess-response1');
    const princessResponse2 = document.querySelector('.princess-response2');
    const button1 = document.querySelector('.butt-1');
    const button2 = document.querySelector('.butt-2');
    princessImg.src = './assets/icons/princess1.png';
    princessResponse1.textContent = 'Well... Didn\'t expect to meet you here.';
    princessResponse2.textContent = 'I guess I have to say "thank you"?';
    button1.textContent = 'I did it just because of the audits ratio';
    button2.textContent = 'Will you marry me?';
    button2.addEventListener('click', () => {
        // Handling button click event...
    });
    button1.addEventListener('click', () => {
        // Handling button click event...
    });
    backtomenuBtn.addEventListener('click', () => {
        location.reload();
    });
}
