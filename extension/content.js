// Uses Gemini API via background.js for Hindi/Urdu to custom Latin conversion

function detectScript(text) {
    const devanagari = /[\u0900-\u097F]/;
    const arabic = /[\u0600-\u06FF]/;
    if (devanagari.test(text)) return 'devanagari';
    if (arabic.test(text)) return 'arabic';
    return null;
}

async function walk(node) {
    let child, next;
    switch (node.nodeType) {
        case 1: case 9: case 11:
            child = node.firstChild;
            while (child) {
                next = child.nextSibling;
                await walk(child);
                child = next;
            }
            break;
        case 3:
            await handleText(node);
            break;
    }
}

async function handleText(textNode) {
    const text = textNode.nodeValue;
    const script = detectScript(text);
    if (!script) return;
    console.log("Sending text for conversion:", text);
    chrome.runtime.sendMessage(
        { action: "convert", text, script },
        function(response) {
            if (response && response.converted) {
                console.log("Converted text:", response.converted);
                textNode.nodeValue = response.converted;
            }
        }
    );
}

walk(document.body);
console.log("Hindi-Urdu Converter content script loaded");