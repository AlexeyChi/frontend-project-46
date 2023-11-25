import fs from 'fs';
import path from 'path';

const makeFullPath = (filepath) => path.resolve(process.cwd(), '__fixtures__', filepath);
const getData = (filepath) => fs.readFileSync(makeFullPath(filepath), 'utf-8');

const genDiff = (filepath1, filepath2) => {
  const parsedFile1 = JSON.parse(getData(filepath1));
  const parsedFile2 = JSON.parse(getData(filepath2));

  const keys1 = Object.keys(parsedFile1).sort();
  const keys2 = Object.keys(parsedFile2).sort();
  const uniqKeys = [...new Set(keys1.concat(keys2))];
  const result = uniqKeys.reduce((acc, key) => {
    if (keys1.includes(key) && keys2.includes(key)) {
      if (parsedFile1[key] !== parsedFile2[key]) {
        acc += `  - ${key}: ${parsedFile1[key]}\n  + ${key}: ${parsedFile2[key]}\n`;
      }
      acc += `    ${key}: ${parsedFile1[key]}\n`;
    }
    if (!keys2.includes(key)) {
      acc += `  - ${key}: ${parsedFile1[key]}\n`;
    }
    if (!keys1.includes(key)) {
      acc += `  + ${key}: ${parsedFile2[key]}\n`;
    }

    return acc;
  }, '');

  return `{\n${result}}`;
};

export default genDiff;
