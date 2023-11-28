const compared = (obj1, obj2) => {
  const keys1 = Object.keys(obj1).sort();
  const keys2 = Object.keys(obj2).sort();
  const uniqKeys = [...new Set(keys1.concat(keys2))];
  const result = uniqKeys.map((key) => {
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return { status: 'unchanged', key, valueBefore: obj1[key] };
      }
      return {
        status: 'changed', key, valueBefore: obj1[key], valueAfter: obj2[key],
      };
    }
    if (!Object.hasOwn(obj1, key)) {
      return { status: 'added', key, valueAfter: obj2[key] };
    }
    return { status: 'deleted', key, valueBefore: obj1[key] };
  });
  return result;
};

export default compared;
