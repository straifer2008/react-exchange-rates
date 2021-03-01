import deepMerge from "deepmerge";

const processChange = (change, state, action) =>
  typeof change === "object" ? change : change(action, state);

export const mergeIn = (change) => (state, action) => ({
  ...state,
  ...processChange(change, state, action),
});

export const mergeInState = (stateProp, change) => (state, action) => ({
  ...state,
  [stateProp]: {
    ...state[stateProp],
    ...processChange(change, state, action),
  },
});

export const mergeInStates = (stateProp, change) => (state, action) => {
  let newState = {};
  stateProp.forEach((item) => {
    if (Array.isArray(processChange(change, state, action)[item])) {
      newState = {
        [item]: [...processChange(change, state, action)[item]],
        ...newState,
      };
    } else if (processChange(change, state, action)[item] instanceof Object) {
      newState = {
        [item]: {
          ...state[item],
          ...processChange(change, state, action)[item],
        },
        ...newState,
      };
    } else {
      newState = {
        [item]: processChange(change, state, action)[item],
        ...newState,
      };
    }
  });
  return {
    ...state,
    ...newState,
  };
};

export const getSafeValue = (state, valueName, defaultValue = null) => {
  const valueNameParts = valueName.split(".");
  let tempValue = state;
  for (let i = 0; i < valueNameParts.length; i += 1) {
    if (tempValue[valueNameParts[i]]) {
      tempValue = tempValue[valueNameParts[i]];
    } else {
      return defaultValue;
    }
  }
  return tempValue;
};

export const mergeDeep = (change) => (state, action) => ({
  ...deepMerge(state, processChange(change, state, action), {
    arrayMerge: (destinationArray, sourceArray) => sourceArray,
  }),
});

const emptyTarget = (value) => (Array.isArray(value) ? [] : {});
const clone = (value, options) => deepMerge(emptyTarget(value), value, options);

const combineMerge = (target, source, options) => {
  const destination = target.slice();
  source.forEach((e, i) => {
    if (typeof destination[i] === "undefined") {
      const cloneRequested = options.clone !== false;
      const shouldClone = cloneRequested && options.isMergeableObject(e);
      destination[i] = shouldClone ? clone(e, options) : e;
    } else if (options.isMergeableObject(e)) {
      destination[i] = deepMerge(target[i], e, options);
    } else if (target.indexOf(e) === -1) {
      destination.push(e);
    }
  });
  return destination;
};

export const mergeCombine = (change) => (state, action) => ({
  ...deepMerge(processChange(change, state, action), state, {
    arrayMerge: combineMerge,
  }),
});

export const mergeDeepInState = (stateProp, change) => (state, action) => ({
  ...state,
  [stateProp]: {
    ...state[stateProp],
    ...deepMerge(state[stateProp], processChange(change, state, action), {
      arrayMerge: combineMerge,
    }),
  },
});

export const mergeDeepInStateReverse = (stateProp, change) => (
  state,
  action
) => ({
  ...state,
  [stateProp]: {
    ...state[stateProp],
    ...deepMerge(processChange(change, state, action), state[stateProp], {
      arrayMerge: combineMerge,
    }),
  },
});

export const normalizeEntities = (name, data) => ({
  result: data.result,
  entities: data.entities[name],
});

export const setUsersUpdateMiddleware = (fn, meta) => (action) =>
  fn({
    ...action,
    meta: {
      isUsersUpdate: true,
      ...meta,
    },
  });
