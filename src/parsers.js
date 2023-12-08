import yaml from 'js-yaml';

const getParsedData = (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unnamed ${format}`);
  }
};

export default getParsedData;
