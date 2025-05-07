document.getElementById('toLatin').onclick = function() {
    const input = document.getElementById('input').value;
    // Choose mapping based on script detection (simple example)
    let mapping = /[अ-ह]/.test(input) ? devanagariToCustom : arabicToCustom;
    document.getElementById('output').value = convertText(input, mapping);
};