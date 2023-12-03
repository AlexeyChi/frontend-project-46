import _ from 'lodash';

const PARAMETRS = {
  space: ' ',
  doubleSpace: '  ',
  minus: '- ',
  plus: '+ ',
  spaceCount: 4,
  leftShiftCount: 2,
};

const makeIndents = (depth) => {
  const replacer = (PARAMETRS.spaceCount * depth) + PARAMETRS.leftShiftCount;
  const indent = PARAMETRS.space.repeat(replacer);
  const outIndent = PARAMETRS.space.repeat(PARAMETRS.spaceCount * depth);
  return [indent, outIndent];
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    if (!_.isArray(node)) {
      return _.isObject(node) ? iter(Object.entries(node), depth) : node;
    }
    const [indent, outIndent] = makeIndents(depth);

    const lines = node.map((line) => {
      if (_.isArray(line)) {
        const [key, value] = line;
        return `${indent}${PARAMETRS.doubleSpace}${key}: ${iter(value, depth + 1)}`;
      }

      const { status, key, value } = line;

      switch (status) {
        case 'added':
          return `${indent}${PARAMETRS.plus}${key}: ${iter(value, depth + 1)}`;
        case 'deleted':
          return `${indent}${PARAMETRS.minus}${key}: ${iter(value, depth + 1)}`;
        case 'unchanged':
          return `${indent}${PARAMETRS.doubleSpace}${key}: ${iter(value, depth + 1)}`;
        case 'nested':
          return `${indent}${PARAMETRS.doubleSpace}${key}: ${iter(value, depth + 1)}`;
        case 'changed': {
          const { valBefore, valAfter } = value;
          const line1 = `${indent}${PARAMETRS.minus}${key}: ${iter(valBefore, depth + 1)}`;
          const line2 = `${indent}${PARAMETRS.plus}${key}: ${iter(valAfter, depth + 1)}`;
          return `${line1}\n${line2}`;
        }
        default:
          throw new Error(`Unknown ${status}, please try again`);
      }
    });

    return ['{', ...lines, `${outIndent}}`].join('\n');
  };

  return `${iter(tree, 0)}\n`;
};

export default stylish;
