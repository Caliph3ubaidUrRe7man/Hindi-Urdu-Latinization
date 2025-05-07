// Hardcoded Zhupi BigModel API key (for demo/testing only)
const ZHUPI_API_KEY = "2fd9d0a0ce7647819ba69c86ed83f2ee.erwqGJiOQvNIupnV";

// Helper: Detect if text is mostly Hindi or Urdu
function detectScript(text) {
    const devanagari = /[\u0900-\u097F]/;
    const arabic = /[\u0600-\u06FF]/;
    if (devanagari.test(text)) return 'devanagari';
    if (arabic.test(text)) return 'arabic';
    return null;
}

// Call Zhupi BigModel API
async function convertWithZhupi(text, apiKey, script) {
    // Replace with the actual endpoint and payload format
    const endpoint = "https://api.zhupi.com/v1/bigmodel/convert";
    const payload = {
        text: text,
        script: script // 'devanagari' or 'arabic'
    };
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
    });
    if (!response.ok) return text;
    const data = await response.json();
    return data.converted_text || text;
}

// Recursively walk the DOM and replace text nodes
async function walk(node, apiKey) {
    let child, next;
    switch (node.nodeType) {
        case 1: // Element
        case 9: // Document
        case 11: // Document fragment
            child = node.firstChild;
            while (child) {
                next = child.nextSibling;
                await walk(child, apiKey);
                child = next;
            }
            break;
        case 3: // Text node
            await handleText(node, apiKey);
            break;
    }
}

async function handleText(textNode, apiKey) {
    const text = textNode.nodeValue;
    const script = detectScript(text);
    if (!script) return;
    const converted = await convertWithZhupi(text, apiKey, script);
    if (converted !== text) {
        textNode.nodeValue = converted;
    }
}

// Main entry
(async function() {
    await walk(document.body, ZHUPI_API_KEY);
})();