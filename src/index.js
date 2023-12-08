import fs from 'fs';
import path from 'path';
import getParsedData from './parsers.js';
import buildTree from './buildTree.js';
import formatters from './formatters/index.js';

const genDiff = (filename1, filename2, formatName = 'stylish') => {
  const fullPath1 = path.resolve(process.cwd(), filename1);
  const fullPath2 = path.resolve(process.cwd(), filename2);

  const data1 = fs.readFileSync(fullPath1, 'utf-8');
  const data2 = fs.readFileSync(fullPath2, 'utf-8');

  const parsedFile1 = getParsedData(data1, path.extname(filename1));
  const parsedFile2 = getParsedData(data2, path.extname(filename2));

  const associationTree = buildTree(parsedFile1, parsedFile2);
  return formatters(associationTree, formatName);
};

export default genDiff;
