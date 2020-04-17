let colorButtons = document.getElementsByClassName('color-button');

for (let button of colorButtons) {
    let color = button.value;
    button.onclick = function(element) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                {code: 'document.body.style.backgroundColor = "' + color + '";'});
        });
}

    chrome.storage.sync.get(button.value, function(data) {
        console.log(data)
        button.style.backgroundColor = data[color];
        button.setAttribute('value', data.color);
    });



}

