import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const formats = ['json', 'yml'];
const data = readFile('etalonJSON.txt');
const expected = JSON.stringify(data);

test.each(formats)('testing formates', (format) => {
  const data1 = `file1.${format}`;
  const data2 = `file2.${format}`;
  const result = JSON.stringify(genDiff(data1, data2));
  expect(result).toEqual(expected);
});
