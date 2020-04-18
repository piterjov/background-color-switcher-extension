import {colors} from './constants/index.js'
import './jquery.min.js'
const bodyColorsContainer = document.querySelector('.body-colors-container');
const headerColorsContainer = document.querySelector('.header-color-container');
console.log(jQuery)
for (let color of colors) {
    let button = document.createElement('button');
    button.setAttribute('class', `color-button color-${color}-button`);
    button.setAttribute('value', color);
    bodyColorsContainer.appendChild(button);

    let headerColorButton = document.createElement('button');
    headerColorButton.setAttribute('class', `header-color-button color-${color}-button`);
    headerColorButton.setAttribute('value', color);
    headerColorsContainer.appendChild(headerColorButton);
}

let colorButtons = document.getElementsByClassName('color-button');

for (let button of colorButtons) {
    let color = button.value;
    button.onclick = function (element) {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                {code: 'document.body.style.backgroundColor = "' + color + '";'});
        });
    };

    chrome.storage.sync.get(button.value, function (data) {
        console.log(data)
        $(button).css('background-color',data[color]);
        button.setAttribute('value', data.color);
    });
}

let headerButtons = document.getElementsByClassName('header-color-button');


for (let button of headerButtons) {
    let color = button.value;
    button.onclick = function (element) {

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                {code: 'document.querySelector("p").style.color = "' + color + '";'});
        });
    };

    chrome.storage.sync.get(button.value, function (data) {
        console.log(data)
        button.style.backgroundColor = data[color];
        button.setAttribute('value', data.color);
    });
}