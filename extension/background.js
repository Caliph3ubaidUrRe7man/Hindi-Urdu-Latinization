chrome.contextMenus.create({
    id: "convertHindiUrdu",
    title: "Convert Hindi/Urdu to Custom Latin",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "convertHindiUrdu") {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: () => {
                // You can inject converter.js and show a popup or alert with the result
            }
        });
    }
});