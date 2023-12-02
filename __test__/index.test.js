import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const options = [
  { file1: 'json', file2: 'json', format: 'stylish' },
  { file1: 'json', file2: 'yml', format: 'stylish' },
  { file1: 'yml', file2: 'yml', format: 'stylish' },
  { file1: 'json', file2: 'json', format: 'plain' },
  { file1: 'yml', file2: 'yml', format: 'plain' },
  { file1: 'json', file2: 'yml', format: 'plain' },
];

test.each(options)('testing formates', (option) => {
  const data1 = `file1.${option.file1}`;
  const data2 = `file2.${option.file2}`;
  const etalonFile = `etalon${option.format.toUpperCase()}.txt`;
  const expected = readFile(etalonFile);
  const result = genDiff(data1, data2, option.format);
  expect(result).toEqual(expected);
});
