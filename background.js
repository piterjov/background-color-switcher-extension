const colors = ['blue', 'green', 'yellow','pink', 'black', 'orange', 'gray', 'purple', 'white', 'lightblue']


chrome.runtime.onInstalled.addListener(function() {
    colors.forEach(function (color) {
        let colorObj = {}
        colorObj[color] = color;
        chrome.storage.sync.set(colorObj, function() {
            console.log("The color is " + color);
            console.log(colorObj);
        });
    })

});


chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'developer.chrome.com'},
        })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});