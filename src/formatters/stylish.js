import _ from 'lodash';

const parametrs = {
    space: ' ',
    doubleSpace: '  ',
    minus: '- ',
    plus: '+ ',
    spaceCount: 4,
    leftShiftCount: 2,
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    const indent =  parametrs.space.repeat((parametrs.spaceCount * depth) + parametrs.leftShiftCount);
    const outIndent = parametrs.space.repeat(parametrs.spaceCount * depth);

      if (!_.isArray(node)) {
        return _.isObject(node) ? iter(Object.entries(node), depth) : node; 
      }

      const lines = node.map((line) => {
        if (_.isArray(line)) {
          const [key, value] = line;
          return `${indent}${parametrs.doubleSpace}${key}: ${iter(value, depth + 1)}`; 
        }

      const { status, key, value } = line;

        switch (status) {
          case 'added':
            return `${indent}${parametrs.plus}${key}: ${iter(value, depth + 1)}`;
          case 'deleted':
            return `${indent}${parametrs.minus}${key}: ${iter(value, depth + 1)}`;
          case 'unchanged':
            return `${indent}${parametrs.doubleSpace}${key}: ${iter(value, depth + 1)}`;
          case 'nested':
            return `${indent}${parametrs.doubleSpace}${key}: ${iter(value, depth + 1)}`;
          case 'changed':
            const { valBefore, valAfter } = value; 
            const line1 = `${indent}${parametrs.minus}${key}: ${iter(valBefore, depth + 1)}`;
            const line2 = `${indent}${parametrs.plus}${key}: ${iter(valAfter, depth + 1)}`;
            return `${line1}\n${line2}`;
          default:
            throw new Error(`Unknown ${status}, please try again`);
        }
      });
    
      return ['{', ...lines, `${outIndent}}`].join('\n');
    };

  return iter(tree, 0);
};

export default stylish;