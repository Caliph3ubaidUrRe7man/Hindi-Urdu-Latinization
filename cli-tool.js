#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { latinize } = require('./latinizer');

// Define command line arguments
const yargs = require('yargs');

const argv = yargs
  .usage('Usage: $0 [options]')
  .example('$0 -i input.txt -o output.txt', 'Convert a file from Hindi/Urdu to Latin script')
  .example('$0 -t "کیا حال ہے"', 'Convert a text string')
  
  .option('i', {
    alias: 'input',
    describe: 'Input file path',
    type: 'string'
  })
  .option('o', {
    alias: 'output',
    describe: 'Output file path',
    type: 'string'
  })
  .option('t', {
    alias: 'text',
    describe: 'Text to convert',
    type: 'string'
  })
  .option('s', {
    alias: 'script',
    describe: 'Input script type',
    choices: ['urdu', 'hindi', 'auto'],
    default: 'auto'
  })
  .option('f', {
    alias: 'format',
    describe: 'Output format',
    choices: ['text', 'json', 'csv'],
    default: 'text'
  })
  .option('d', {
    alias: 'directory',
    describe: 'Process an entire directory',
    type: 'string'
  })
  .option('r', {
    alias: 'recursive',
    describe: 'Process directories recursively',
    type: 'boolean',
    default: false
  })
  .option('v', {
    alias: 'verbose',
    describe: 'Show detailed logs',
    type: 'boolean',
    default: false
  })
  .help('h')
  .alias('h', 'help')
  .epilog('For more information visit: https://github.com/Caliph3ubaidUrRe7man/Hindi-Urdu-Latinization')
  .argv;

// Main function
async function main() {
  try {
    // Process text mode
    if (argv.text) {
      const result = latinize(argv.text);
      outputResult(result);
      return;
    }
    
    // Process directory mode
    if (argv.directory) {
      await processDirectory(argv.directory, argv.recursive);
      return;
    }
    
    // Process file mode
    if (argv.input) {
      if (!argv.output) {
        console.error('Error: Output file must be specified with input file');
        process.exit(1);
      }
      
      await processFile(argv.input, argv.output);
      return;
    }
    
    // If no mode selected, run interactive mode
    runInteractiveMode();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Process a single file
async function processFile(inputPath, outputPath) {
  if (argv.verbose) {
    console.log(`Processing file: ${inputPath}`);
  }
  
  try {
    const text = fs.readFileSync(inputPath, 'utf8');
    const result = latinize(text);
    
    fs.writeFileSync(outputPath, result);
    
    if (argv.verbose) {
      console.log(`Successfully converted. Output saved to: ${outputPath}`);
    }
  } catch (error) {
    console.error(`Error processing file ${inputPath}: ${error.message}`);
  }
}

// Stub for processDirectory
async function processDirectory(directoryPath, recursive) {
  console.log('Directory processing not implemented yet.');
}

// Stub for outputResult
function outputResult(result) {
  console.log(result);
}

// Stub for runInteractiveMode
function runInteractiveMode() {
  console.log('Interactive mode not implemented yet.');
}

// Start the CLI
main();
