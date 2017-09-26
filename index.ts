import { OptionDefinition, Options } from 'command-line-args';
import * as cmd from 'command-line-args';
import { appendFileSync } from 'fs';

interface Config {
  interface: string;
  inputMappings: {
    [key: string]: string[];
  };
  outputMappings: {
    [key: string]: string[];
  };
  abiDir: any;
  fillInterfaces: boolean;
  outputDir: string;
  printToConsole: boolean;
}

const opts: OptionDefinition[] = [
  {
    name: 'config',
    alias: 'o',
    defaultOption: true
  }
];

const config: Config = require(cmd(opts).config);
console.log(config.abiDir);
const output = str => {
  console.log(config, config.outputDir, str);
  config.printToConsole
    ? console.log(str)
    : appendFileSync(config.outputDir, str + '\n');
};

const types = {};

const mapType = (type: string) => {
  type = type.split('[]')[0];
  if (type === 'string') {
    return;
  }
  const isArr = type.split('[]');
  const isBool = type.startsWith('bool');
  let strFactory = isBool ? 'boolean' : 'string';
  if (!types[type]) {
    types[type] = strFactory;
  }
};
output(`export default interface ${config.interface} {`);
require(config.abiDir).forEach(abiFunc => {
  if (abiFunc.type !== 'function') return;
  const inputs = abiFunc.inputs.reduce((str, curr, idx) => {
    mapType(curr.type);
    const name =
      (config.inputMappings &&
        config.inputMappings[abiFunc.name] &&
        config.inputMappings[abiFunc.name][idx]) ||
      curr.name ||
      `${curr.type}_${idx}`;
    return (str += `${name}: ${curr.type}${idx === abiFunc.inputs.length - 1
      ? ''
      : ', '}`);
  }, '');
  const outputs = abiFunc.outputs.reduce((str, curr, idx) => {
    mapType(curr.type);
    const name =
      (config.outputMappings &&
        config.outputMappings[abiFunc.name] &&
        config.outputMappings[abiFunc.name][idx]) ||
      curr.name ||
      `${curr.type}_${idx}`;
    return (str += `${name}: ${curr.type}${idx === abiFunc.outputs.length - 1
      ? ''
      : ', '}`);
  }, '');

  const ABIParamless = `ABIFuncParamless${outputs.length === 0
    ? ''
    : `<{${outputs}}>`}`;
  const ABIFunc = `ABIFunc<{${inputs}}${outputs.length === 0
    ? ''
    : `,{${outputs}}`}>`;
  output(`${abiFunc.name}:${inputs === '' ? `${ABIParamless}` : `${ABIFunc}`}`);
});
output('}');

const interfaces = `
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

config.fillInterfaces && output(interfaces);

Object.keys(types).forEach((curr, idx) => {
  output(`type ${curr} = ${types[curr]}`);
});
