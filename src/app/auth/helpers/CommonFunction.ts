interface SignalState {
  update: (fn: () => boolean) => void;
}
export const showPasswordToggler = (signalState: SignalState, value: boolean): void => {
  signalState.update(() => !value);
};
