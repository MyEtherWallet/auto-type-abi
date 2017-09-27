export const interfaces = `
interface ABIFunc<T, K = void> {
  call(x: T): string;
  encodeOutput(x: T): string;
  decodeOutput(argStr: string): K;
}
interface ABIFuncParamless<T = void> {
  call(): string;
  encodeOutput(): string;
  decodeOutput(argStr: string): T;
}
`;
