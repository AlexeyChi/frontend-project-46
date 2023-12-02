// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';

const makeCurrValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return _.isObject(value) ? '[complex value]' : value;
};

const plain = (tree) => {
  const iter = (node, path) => {
    const lines = node.flatMap((line) => {
      const { status, key, value } = line;
      const filePath = _.isArray(value) ? `${path}${key}.` : `${path}${key}`;
      switch (status) {
        case 'nested':
          return iter(value, filePath);
        case 'added':
          return `Property '${filePath}' was added with value: ${makeCurrValue(value)}`;
        case 'deleted':
          return `Property '${filePath}' was removed`;
        case 'changed': {
          const { valBefore, valAfter } = value;
          return `Property '${filePath}' was updated. From ${makeCurrValue(valBefore)} to ${makeCurrValue(valAfter)}`;
        }
        case 'unchanged': return [];
        default:
          throw new Error(`Unknown ${status}, please try again`);
      }
    });
    return lines.join('\n');
  };
  return `${iter(tree, '')}\n`;
};

export default plain;
