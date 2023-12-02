// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';

const getChildren = (node, tree1, tree2) => [_.get(tree1, node, null), _.get(tree2, node, null)];

const buildTree = (obj1, obj2) => {
  const uniqKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  return uniqKeys.flatMap((key) => {
    const [value1, value2] = getChildren(key, obj1, obj2);
    if (_.isObject(value1) && _.isObject(value2)) {
      return { status: 'nested', key, value: buildTree(value1, value2) };
    }
    if (value1 === value2) {
      return { status: 'unchanged', key, value: value1 };
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      return { status: 'changed', key, value: { valBefore: value1, valAfter: value2 } };
    }
    if (!value1) {
      return { status: 'added', key, value: value2 };
    }
    if (!value2) {
      return { status: 'deleted', key, value: value1 };
    }
    return key;
  });
};

export default buildTree;
