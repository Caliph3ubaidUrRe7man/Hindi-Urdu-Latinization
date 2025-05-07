// Helper: Detect if text is mostly Hindi or Urdu
function detectScript(text) {
    // Hindi: Devanagari Unicode range \u0900-\u097F
    // Urdu: Arabic Unicode range \u0600-\u06FF
    const devanagari = /[\u0900-\u097F]/;
    const arabic = /[\u0600-\u06FF]/;
    if (devanagari.test(text)) return 'devanagari';
    if (arabic.test(text)) return 'arabic';
    return null;
}

// Recursively walk the DOM and replace text nodes
function walk(node) {
    let child, next;
    switch (node.nodeType) {
        case 1: // Element
        case 9: // Document
        case 11: // Document fragment
            child = node.firstChild;
            while (child) {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;
        case 3: // Text node
            handleText(node);
            break;
    }
}

function handleText(textNode) {
    const text = textNode.nodeValue;
    const script = detectScript(text);
    if (!script) return;
    let mapping = script === 'devanagari' ? devanagariToCustom : arabicToCustom;
    const converted = convertText(text, mapping);
    if (converted !== text) {
        textNode.nodeValue = converted;
    }
}

// Start processing after DOM is ready
walk(document.body);