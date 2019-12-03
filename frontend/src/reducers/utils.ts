export const updatePartialState = <S, A>(
  state: { [keyId: number]: S },
  action: A,
  keyId: number,
  childReducer: (state: S, action: A) => S
): { [keyId: number]: S } => {
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
  state: { [keyId: number]: S },
  keyId: number
): { [keyId: number]: S } => {
  if (keyId in state) {
    const newState = { ...state };
    delete newState[keyId];
    return newState;
  }
  return state;
};
