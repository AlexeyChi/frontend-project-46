import _ from 'lodash';

const PARAMETRS = {
  space: ' ',
  doubleSpace: '  ',
  deleted: '- ',
  added: '+ ',
  spaceCount: 4,
  leftShiftCount: 2,
};

const makeIndents = (depth) => {
  const newSpaceCount = PARAMETRS.spaceCount * depth - PARAMETRS.leftShiftCount;
  return PARAMETRS.space.repeat(newSpaceCount);
};

const stringify = (node, depth) => {
  if (!_.isObject(node)) {
    return `${node}`;
  }
  const lines = Object.entries(node)
    .map(([key, value]) => `${makeIndents(depth + 1)}${PARAMETRS.doubleSpace}${key}: ${stringify(value, depth + 1)}`)
    .join('\n');

  return `{\n${lines}\n${makeIndents(depth)}${PARAMETRS.doubleSpace}}`;
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    const diff = node.flatMap(({
      status,
      key,
      value,
      children,
      valBefore,
      valAfter,
    }) => {
      switch (status) {
        case 'nested':
          return `${makeIndents(depth)}${PARAMETRS.doubleSpace}${key}: {\n${iter(children, depth + 1)}\n${makeIndents(depth)}${PARAMETRS.doubleSpace}}`;
        case 'added':
        case 'deleted':
          return `${makeIndents(depth)}${PARAMETRS[status]}${key}: ${stringify(value, depth)}`;
        case 'changed': {
          const line1 = `${makeIndents(depth)}${PARAMETRS.deleted}${key}: ${stringify(valBefore, depth)}`;
          const line2 = `${makeIndents(depth)}${PARAMETRS.added}${key}: ${stringify(valAfter, depth)}`;
          return `${line1}\n${line2}`;
        }
        case 'unchanged':
          return `${makeIndents(depth)}${PARAMETRS.doubleSpace}${key}: ${stringify(value, depth)}`;
        default:
          throw new Error(`Unnamed ${status}`);
      }
    });
    return diff.join('\n');
  };
  return `{\n${iter(tree, 1)}\n}`;
};

export default stylish;
