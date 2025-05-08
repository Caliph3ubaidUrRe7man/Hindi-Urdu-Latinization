// Hindi-Urdu Latinization Core Library

const fs = require('fs');

/**
 * Configuration for the latinization system
 */
const config = {
  // Mapping for Urdu/Hindi consonants to Turkish/IPA letters
  consonantMapping: {
    // Turkish letters
    'ج': 'c', // Turkish c for j sound
    'چ': 'ç', // Turkish ç for ch sound
    'ش': 'ş', // Turkish ş for sh sound
    'گ': 'g', // Turkish g for hard g sound
    'ژ': 'j', // Turkish j for zh sound
    
    // IPA for retroflexive sounds
    'ٹ': 'ʈ', // Retroflex t
    'ڈ': 'ɖ', // Retroflex d
    'ڑ': 'ɽ', // Retroflex r
    
    // IPA for velar fricatives
    'خ': 'χ', // kh sound
    'غ': 'ɣ', // gh sound
    
    // Regular consonants
    'ب': 'b',
    'پ': 'p',
    'ت': 't',
    'ث': 's',
    'ح': 'h',
    'د': 'd',
    'ذ': 'z',
    'ر': 'r',
    'ز': 'z',
    'س': 's',
    'ص': 's',
    'ض': 'z',
    'ط': 't',
    'ظ': 'z',
    'ع': "'",
    'ف': 'f',
    'ق': 'q',
    'ك': 'k',
    'ل': 'l',
    'م': 'm',
    'ن': 'n',
    'ه': 'h',
    'و': 'v',
    'ی': 'y',
    
    // Devanagari equivalents
    'क': 'k',
    'ख': 'k̃', // aspirated k
    'ग': 'g',
    'घ': 'g̃', // aspirated g
    'च': 'ç',
    'छ': 'ç̃', // aspirated ch
    'ज': 'c',
    'झ': 'c̃', // aspirated j
    'ट': 'ʈ',
    'ठ': 'ʈ̃', // aspirated retroflex t
    'ड': 'ɖ',
    'ढ': 'ɖ̃', // aspirated retroflex d
    'त': 't',
    'थ': 't̃', // aspirated t
    'द': 'd',
    'ध': 'd̃', // aspirated d
    'न': 'n',
    'प': 'p',
    'फ': 'p̃', // aspirated p
    'ब': 'b',
    'भ': 'b̃', // aspirated b
    'म': 'm',
    'य': 'y',
    'र': 'r',
    'ल': 'l',
    'व': 'v',
    'श': 'ş',
    'ष': 'ş',
    'स': 's',
    'ह': 'h',
    'ड़': 'ɽ',
    'ढ़': 'ɽ̃', // aspirated retroflex r
    'क्ष': 'kṣ', // Example multi-char mapping
  },

  // Mapping for vowels with diacritics
  vowelMapping: {
    // Short vowels
    'َ': 'a', // Fatha
    'ِ': 'i', // Kasra
    'ُ': 'u', // Damma
    'े': 'e', // Devanagari e
    'ो': 'o', // Devanagari o
    
    // Long vowels
    'ا': 'ā',
    'آ': 'ā',
    'ی': 'ī',
    'ई': 'ī',
    'و': 'ū',
    'ऊ': 'ū',
    'ए': 'ē',
    'ओ': 'ō',
    
    // Nasalized vowels
    'ں': '̰', // Nun ghunna for nasalization
    'ँ': '̰', // Chandrabindu for nasalization
    'ं': '̰', // Anusvara for nasalization
  },
  nasalization: ['ں', 'ँ', 'ं'],
};

/**
 * Main function to convert text to latinized form
 * @param {string} text - The original Hindi/Urdu text
 * @return {string} - The latinized text
 */
function latinize(text) {
  let result = '';
  let prevVowelIndex = -1;

  for (let i = 0; i < text.length; i++) {
    let char = text[i];

    // Multi-character mapping (e.g., 'क्ष')
    if (i + 1 < text.length) {
      const twoChar = text.slice(i, i + 2);
      if (config.consonantMapping[twoChar]) {
        result += config.consonantMapping[twoChar];
        i++;
        continue;
      }
    }

    // Consonant
    if (config.consonantMapping[char]) {
      result += config.consonantMapping[char];
      continue;
    }

    // Vowel
    if (config.vowelMapping[char]) {
      result += config.vowelMapping[char];
      prevVowelIndex = result.length - 1;
      continue;
    }

    // Nasalization: attach to previous vowel if possible
    if (config.nasalization.includes(char) && prevVowelIndex >= 0) {
      result = result.slice(0, prevVowelIndex + 1) + '̰' + result.slice(prevVowelIndex + 1);
      continue;
    }

    // Pass through any unhandled characters
    result += char;
  }

  return result;
}

/**
 * Helper function to determine if a vowel is long
 * @param {string} char - The character to check
 * @return {boolean} - Whether the vowel is long
 */
function isLongVowel(char) {
  const longVowels = ['ا', 'آ', 'ی', 'ई', 'و', 'ऊ', 'ए', 'ओ'];
  return longVowels.includes(char);
}

/**
 * Convert a text file from Hindi/Urdu to latinized form
 * @param {string} inputPath - Path to the input file
 * @param {string} outputPath - Path to the output file
 */
function convertFile(inputPath, outputPath) {
  try {
    const text = fs.readFileSync(inputPath, 'utf8');
    const latinized = latinize(text);
    fs.writeFileSync(outputPath, latinized);
    console.log(`Converted: ${inputPath} → ${outputPath}`);
  } catch (err) {
    console.error('File conversion error:', err.message);
  }
}

// CLI usage
if (require.main === module) {
  const [,, input, output] = process.argv;
  if (!input || !output) {
    console.log('Usage: node latinization-implementation.js <input.txt> <output.txt>');
    process.exit(1);
  }
  convertFile(input, output);
}

// Export the functions for use in other modules
module.exports = {
  latinize,
  convertFile,
  config
};
