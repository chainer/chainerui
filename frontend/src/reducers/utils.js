export const updatePartialState = (state, action, keyId, fn) => {
  const partialState = fn(state[keyId], action);
  if (state[keyId] !== partialState) {
    return {
      ...state,
      [keyId]: partialState,
    };
  }
  return state;
};

export const removePartialState = (state, keyId) => {
  if (keyId in state) {
    const newState = { ...state };
    delete newState[keyId];
    return newState;
  }
  return state;
};
