import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import buildTree from './buildTree.js';
import formatters from './formatters/index.js';

const makeFullPath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(makeFullPath(filename), 'utf-8');

const genDiff = (filename1, filename2, formatName = 'stylish') => {
  const data1 = readFile(filename1);
  const data2 = readFile(filename2);
  const parsedFile1 = parser(data1, path.extname(filename1).slice(1));
  const parsedFile2 = parser(data2, path.extname(filename2).slice(1));

  const associationTree = buildTree(parsedFile1, parsedFile2);
  return formatters(associationTree, formatName);
};

export default genDiff;
