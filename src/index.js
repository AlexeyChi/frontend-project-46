import fs from 'fs';
import path from 'path';

const makeFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getData = (filepath) => fs.readFileSync(makeFullPath(filepath), 'utf-8');

const genDiff = (filepath1, filepath2) => {
  const data1 = JSON.parse(getData(filepath1));
  const data2 = JSON.parse(getData(filepath2));
  console.log(data1);
  console.log(data2);
};

export default genDiff;