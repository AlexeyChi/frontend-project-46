import _ from 'lodash';

const makeCurrValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return _.isObject(value) ? '[complex value]' : value;
};

const plain = (tree, path = '') => {
  const lines = tree.flatMap(({
    status,
    key,
    value,
    children,
    valBefore,
    valAfter,
  }) => {
    switch (status) {
      case 'nested':
        return plain(children, `${path}${key}.`);
      case 'added':
        return `Property '${path}${key}' was added with value: ${makeCurrValue(value)}`;
      case 'deleted':
        return `Property '${path}${key}' was removed`;
      case 'changed': {
        return `Property '${path}${key}' was updated. From ${makeCurrValue(valBefore)} to ${makeCurrValue(valAfter)}`;
      }
      case 'unchanged': return [];
      default:
        throw new Error(`Unknown ${status}, please try again`);
    }
  });
  return lines.join('\n');
};

export default plain;
