import fs from 'fs';
import path from 'path';

const makeFullPath = (filepath) => path.resolve(process.cwd(), '__fixtures__', filepath);
const feadFile = (filepath) => fs.readFileSync(makeFullPath(filepath), 'utf-8');

const genDiff = (filepath1, filepath2) => {
  const parsedFile1 = JSON.parse(feadFile(filepath1));
  const parsedFile2 = JSON.parse(feadFile(filepath2));

  const keys1 = Object.keys(parsedFile1).sort();
  const keys2 = Object.keys(parsedFile2).sort();
  const uniqKeys = [...new Set(keys1.concat(keys2))];
  const result = uniqKeys.map((key) => {
    let line;
    if (Object.hasOwn(parsedFile1, key) && Object.hasOwn(parsedFile2, key)) {
      if (parsedFile1[key] === parsedFile2[key]) {
        line = { status: 'unchanged', key };
      } else {
        line = { status: 'changed', key };
      }
    }
    if (!Object.hasOwn(parsedFile1, key)) {
      line = { status: 'added', key };
    }
    if (!Object.hasOwn(parsedFile2, key)) {
      line = { status: 'deleted', key };
    }
    return line;
  })
    .map(({ status, key }) => {
      switch (status) {
        case 'added': {
          return `  + ${key}: ${parsedFile2[key]}`;
        }
        case 'deleted': {
          return `  - ${key}: ${parsedFile1[key]}`;
        }
        case 'unchanged': {
          return `    ${key}: ${parsedFile1[key]}`;
        }
        case 'changed': {
          return `  - ${key}: ${parsedFile1[key]}\n  + ${key}: ${parsedFile2[key]}`;
        }
        default:
          throw new Error(`Unnamed ${status}`);
      }
    })
    .join('\n');

  return `{\n${result}\n}`;
};

export default genDiff;
