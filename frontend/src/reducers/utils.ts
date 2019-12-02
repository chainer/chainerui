export const updatePartialState = <S, A>(
  state: { [keyId: string]: S },
  action: A,
  keyId: string,
  childReducer: (state: S, action: A) => S
): { [keyId: string]: S } => {
  const partialState = childReducer(state[keyId], action);
  if (state[keyId] !== partialState) {
    return {
      ...state,
      [keyId]: partialState,
    };
  }
  return state;
};

export const removePartialState = <S>(
  state: { [keyId: string]: S },
  keyId: string
): { [keyId: string]: S } => {
  if (keyId in state) {
    const newState = { ...state };
    delete newState[keyId];
    return newState;
  }
  return state;
};
