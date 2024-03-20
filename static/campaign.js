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
        currentAudioElement.play();
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

export function endCleaner() {
    let princessResponse1 = document.querySelector('.princess-response1')
    let princessResponse2 = document.querySelector('.princess-response2')
    let goodbyeText = document.querySelector('.goodbye-text')
    princessResponse2.style.animation = "none"
    princessResponse2.offsetHeight
    princessResponse2.style.animation = null
    princessResponse1.textContent = ''
    princessResponse2.textContent = ''
    goodbyeText.textContent = ''
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
    button2.addEventListener('click', function () {
        endCleaner()
        princessImg.src = './assets/icons/princess_amus.png'
        princessResponse1.textContent = 'Marry you? Everything is going so fast, I\'m not sure I\'m ready.'
        princessResponse2.textContent = 'Let\'s be friends.'
        button1.hidden = true
        button2.hidden = true
        setTimeout(() => {
            goodbyeOverlay.classList.add('show-overlay')
            goodbyeText.textContent = 'Congratulations! You unlocked the first of four endings. I don\'t think you should be so pushy, dude.'
        }, 4000)
    })
    button1.addEventListener('click', function () {
        endCleaner()
        princessImg.src = './assets/icons/princess_anger.png'
        princessResponse1.textContent = 'What?? I thought you were different.'
        princessResponse2.textContent = 'But you are like all of them...'
        button1.textContent = 'I don\'t even like you'
        button2.textContent = 'I am sorry, that\'s not what I meant'
        button1.classList.add('step-2-1')
        button2.classList.add('step-2-2')
        if (button1.classList.contains('step-2-1') && button2.classList.contains('step-2-2')) {
            button1.addEventListener('click', function () {
                endCleaner()
                princessImg.src = './assets/icons/princess_amus.png'
                princessResponse1.textContent = 'Then why did you help me??'
                princessResponse2.textContent = 'That\'s so stupid!'
                button1.textContent = 'I just like cheese "Cheetos" too'
                button2.textContent = 'I just like bacon "Cheetos" too'
                button1.classList.add('step-3-1')
                button2.classList.add('step-3-2')
                if (button1.classList.contains('step-3-1') && button2.classList.contains('step-3-2')) {
                    button1.addEventListener('click', function () {
                        endCleaner()
                        princessImg.src = './assets/icons/princess_joy.png'
                        princessResponse1.textContent = 'Cheese "Cheetos"? We\'re so alike...'
                        princessResponse2.textContent = 'Maybe we\'ll go to the "Monk" one day, huh?'
                        button1.hidden = true
                        button2.hidden = true
                        setTimeout(() => {
                            goodbyeOverlay.classList.add('show-overlay')
                            goodbyeText.textContent = 'Congratulations! You unlocked the best of four endings. Do not choke on your vanity, pf.'
                        }, 4000)
                    })
                    button2.addEventListener('click', function () {
                        endCleaner()
                        princessImg.src = './assets/icons/princess_anger.png'
                        princessResponse1.textContent = 'Bacon "Cheetos"?! I hate them!'
                        princessResponse2.textContent = 'Just like I hate you!!!!!'
                        button1.hidden = true
                        button2.hidden = true
                        setTimeout(() => {
                            goodbyeOverlay.classList.add('show-overlay')
                            goodbyeText.textContent = 'Congratulations! You unlocked the worst of four endings.. Wow, didn\'t even know that it could be so-o-o bad. I am proud of your miserability!'
                        }, 4000)
                    })
                }
            })
            button2.addEventListener('click', function () {
                endCleaner()
                princessImg.src = './assets/icons/princess_amus.png'
                princessResponse1.textContent = 'Ugh.. you such... Can you finally stop making excuses?'
                princessResponse2.textContent = 'I don\'t want to know you anymore!'
                button1.hidden = true
                button2.hidden = true
                setTimeout(() => {
                    goodbyeOverlay.classList.add('show-overlay')
                    goodbyeText.textContent = 'Congratulations! You unlocked the worst of four endings. Keep up, dude, you\'ll definitely be single for the rest of your life.'
                }, 4000)
            })
        }
    })
    backtomenuBtn.addEventListener('click', function () {
        location.reload()
    })
}
