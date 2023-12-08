import stylish from './stylish.js';
import plain from './plain.js';

const formatters = (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`Error: Unknown ${format}, please try again`);
  }
};

export default formatters;
