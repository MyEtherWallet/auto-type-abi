import { OptionDefinition, Options } from 'command-line-args';
import * as cmd from 'command-line-args';
import { getInputs, getOutputs, interfaces, TypeMappings } from './builder';
import { Config, opts, Output } from './config';

const TypeBuilder = () => {
    const config: Config = require(cmd(opts).config);
    const output = new Output(config);
    const types = new TypeMappings();
    console.log(config.abiDir);
    
    output.print(`export default interface ${config.interface} {`);
    require(config.abiDir).forEach((abiFunc) => {
        const abiData = { types, abiFunc, config };
        if (abiFunc.type !== 'function') {
          return;
        }
        const inputs = getInputs(abiData);
        const outputs = getOutputs(abiData);
    
        const ABIParamless = `ABIFuncParamless${outputs.length === 0
            ? ''
            : `<{${outputs}}>`}`;
        const ABIFunc = `ABIFunc<{${inputs}}${outputs.length === 0
            ? ''
            : `,{${outputs}}`}>`;
        output.print(`${abiFunc.name}:${inputs === '' ? `${ABIParamless}` : `${ABIFunc}`}`);
    });
    output.print('}');
    
    config.fillInterfaces && output.print(interfaces);
    
    Object.keys(types.getTypes()).forEach((curr, idx) => {
      output.print(`type ${curr} = ${types.getTypes()[curr]}`);
    });
}

export default TypeBuilder;

