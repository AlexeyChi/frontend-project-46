import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const stylishData = readFile('etalonSTYLISH.txt').trim();
const plainData = readFile('etalonPLAIN.txt').trim();
const jsonData = readFile('etalonJSON.txt').trim();

const options = [
  { format1: 'json', format2: 'json' },
  { format1: 'json', format2: 'yml' },
  { format1: 'json', format2: 'yaml' },
  { format1: 'yml', format2: 'yml' },
  { format1: 'yml', format2: 'yaml' },
  { format1: 'yaml', format2: 'yaml' },
];

test.each(options)('testing formats', (option) => {
  const filepath1 = getFixturePath(`file1.${option.format1}`);
  const filepath2 = getFixturePath(`file2.${option.format2}`);

  expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(stylishData);
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(plainData);
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(jsonData);
  expect(genDiff(filepath1, filepath2)).toEqual(stylishData);
});
