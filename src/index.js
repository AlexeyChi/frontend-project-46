import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import compared from './compareData.js';

const makeFullPath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(makeFullPath(filename), 'utf-8');

const genDiff = (filename1, filename2) => {
  const data1 = readFile(filename1);
  const data2 = readFile(filename2);
  const parsedFile1 = parser(data1, path.extname(filename1).slice(1));
  const parsedFile2 = parser(data2, path.extname(filename2).slice(1));

  const getDifStatus = compared(parsedFile1, parsedFile2);
  const result = getDifStatus.map(({
    status, key, valueBefore, valueAfter,
  }) => {
    switch (status) {
      case 'added': return `  + ${key}: ${valueAfter}`;
      case 'deleted': return `  - ${key}: ${valueBefore}`;
      case 'unchanged': return `    ${key}: ${valueBefore}`;
      case 'changed': return `  - ${key}: ${valueBefore}\n  + ${key}: ${valueAfter}`;
      default:
        throw new Error(`Unnamed ${status}`);
    }
  })
    .join('\n');

  return `{\n${result}\n}\n`;
};

export default genDiff;
