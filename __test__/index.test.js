import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const stylishData = readFile('etalonSTYLISH.txt');
const plainData = readFile('etalonPLAIN.txt');
const jsonData = readFile('etalonJSON.txt');

const options = [
  {
    file1: 'file1.json', file2: 'file2.json', format: 'stylish', expected: stylishData,
  },
  {
    file1: 'file1.yml', file2: 'file2.yml', format: 'stylish', expected: stylishData,
  },
  {
    file1: 'file1.yaml', file2: 'file2.yaml', format: 'stylish', expected: stylishData,
  },
  {
    file1: 'file1.json', file2: 'file2.json', format: 'plain', expected: plainData,
  },
  {
    file1: 'file1.yml', file2: 'file2.yml', format: 'plain', expected: plainData,
  },
  {
    file1: 'file1.yaml', file2: 'file2.yaml', format: 'plain', expected: plainData,
  },
  {
    file1: 'file1.yml', file2: 'file2.json', format: 'json', expected: jsonData,
  },
  {
    file1: 'file1.yml', file2: 'file2.yml', format: 'json', expected: jsonData,
  },
  {
    file1: 'file1.yaml', file2: 'file2.yaml', format: 'json', expected: jsonData,
  },
];

const detaultFormat = 'stylish';

test.each(options)('testing formates', (option) => {
  const result = genDiff(option.file1, option.file2, option.format);
  expect(result).toEqual(option.expected);

  const detaultDiff = genDiff(option.file1, option.file2, detaultFormat);
  expect(detaultDiff).toEqual(stylishData);
});
