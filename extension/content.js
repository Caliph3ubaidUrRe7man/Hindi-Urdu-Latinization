// Offline Hindi/Urdu to custom Latin conversion

const devanagariToLatin = {
    'अ': 'a', 'आ': 'ā', 'इ': 'i', 'ई': 'ī', 'उ': 'u', 'ऊ': 'ū', 'ए': 'e', 'ऐ': 'æ',
    'ओ': 'o', 'औ': 'œ', 'ं': '̰', 'ः': '̃',
    'क': 'k', 'ख': 'k̃', 'ग': 'g', 'घ': 'g̃', 'ङ': 'ŋ',
    'च': 'ç', 'छ': 'ç̃', 'ज': 'c', 'झ': 'c̃', 'ञ': 'ñ',
    'ट': 'ʈ', 'ठ': 'ʈ̃', 'ड': 'ɖ', 'ढ': 'ɖ̃', 'ण': 'ɲ',
    'त': 't', 'थ': 't̃', 'द': 'd', 'ध': 'd̃', 'न': 'n',
    'प': 'p', 'फ': 'p̃', 'ब': 'b', 'भ': 'b̃', 'म': 'm',
    'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'ş', 'ष': 'ś', 'स': 's', 'ह': 'h',
    'ळ': 'ɭ', 'क्ष': 'kş', 'ज्ञ': 'jñ', 'श्र': 'şr',
    'अं': 'a̰', 'अः': 'ã', 'इं': 'ḭ', 'ईं': 'ḭ̄', 'उं': 'ṵ',
    'ऊं': 'ṵ̄', 'एं': 'ḛ', 'ऐं': 'æ̰', 'ओं': 'o̰', 'औं': 'œ̰', 
    'क़': 'q', 'ख़': 'x', 'ग़': 'ɣ', 'ज़': 'z', 'ड़': 'ɽ', 'ढ़': 'ɽ̃',
    'फ़': 'f', 'य़': 'y̰', 'व़': 'v̰', 'ल़': 'l̰',
    'ऋ': 'r̥', 'ॠ': 'r̥̄', 'ऌ': 'l̥', 'ॡ': 'l̥̄',
    'ऍ': 'ē', 'ऑ': 'ō' ,  'ा': 'ā', 'ि': 'i', 'ी': 'ī', 'ु': 'u', 'ू': 'ū',
    'े': 'e', 'ै': 'æ', 'ो': 'o', 'ौ': 'œ', '्': '', 'ँ': '̃','ृ': 'r', 'ॄ': 'r̄',
    'ॢ': 'l', 'ॣ': 'l̄', 'ऽ': '', '।': '.', '॥': '..', '०': '0', '१': '1', 
    '२': '2', '३': '3', '४': '4', '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
    'ॐ': 'ōm', '॒': '̄'
    // ...add more mappings...
};
const arabicToLatin = {
 'َ': 'a', 'آ': 'ā', 'ِ': 'i', 'اي': 'ī', 'ُ': 'u', 'او': 'ū',
    'اَے': 'æ', 'او': 'o', 'اں': 'ḭ', 'اں': 'a̰', 'اَہ': 'ã',
    'ے': 'e',  'اُں': 'ṵ', 'آ': 'ā', 'آں': 'ā̰', 'آہ': 'ā̃',
    'آئے': 'āe', 'آؤ': 'āo', 'آئی': 'āī', 'آؤں': 'āṵ',
    'ب': 'b', 'بھ': 'b̃', 'پ': 'p', 'پھ': 'p̃', 'ت': 't', 'تھ': 't̃', 
    'ٹ': 'ʈ', 'ٹھ': 'ʈ̃', 'ث': 's', 'ج': 'c', 'جھ': 'c̃', 'چ': 'ç', 'چھ': 'ç̃',
    'ح': 'h', 'خ': 'x', 'د': 'd', 'دھ': 'd̃', 'ڈ': 'ɖ',  'ڈھ': 'ɖ̃', 
    'ذ': 'z', 'ر': 'r', 'ڑ': 'ɽ', 'ڑھ': 'ɽ̃',  'ز': 'z', 'ژ': 'j', 
    'س': 's', 'ش': 'ş', 'ص': 's', 'ض': 'z', 'ط': 't',
    'ظ': 'z', 'ع': 'ʕ', 'غ': 'ɣ', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'کھ': 'k̃',
      'گ': 'g', 'گھ': 'g̃',  'ل': 'l', 'م': 'm', 'ن': 'n', 'ں': '̰', 'و': 'v',
      'ہ': 'h', 'ۓ': 'ē', 'ئ': 'i', 'ے': 'e', 'ؤ': 'o', 'ئہ': 'ĩ', 'ئوں': 'ṵ̄',
     'ئیں': 'ḭ̄',  'ی': 'y', 'ا': 'ā', 'آ': 'ā', 'آں': 'ā̰', 'آہ': 'ā̃',
    'آئے': 'āe', 'آؤ': 'āo', 'آئی': 'āī', 'آؤں': 'āṵ', 'ھ': 'h', 'ۂ': 'h̄'
    // ...add more mappings...
};

function detectScript(text) {
    if (/[\u0900-\u097F]/.test(text)) return 'devanagari';
    if (/[\u0600-\u06FF]/.test(text)) return 'arabic';
    return null;
}

function convertText(text, mapping) {
    let result = '';
    for (let char of text) {
        result += mapping[char] || char;
    }
    return result;
}

function walk(node) {
    let child, next;
    switch (node.nodeType) {
        case 1: case 9: case 11:
            child = node.firstChild;
            while (child) {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;
        case 3:
            handleText(node);
            break;
    }
}

function handleText(textNode) {
    const text = textNode.nodeValue;
    const script = detectScript(text);
    if (!script) return;
    const mapping = script === 'devanagari' ? devanagariToLatin : arabicToLatin;
    const converted = convertText(text, mapping);
    if (converted !== text) {
        textNode.nodeValue = converted;
    }
}

walk(document.body);