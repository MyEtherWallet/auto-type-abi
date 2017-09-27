export const getOutputs = ({ types, abiFunc, config }) => {
    const outputs = abiFunc.outputs.reduce((str, curr, idx) => {
        types.mapType(curr.type);
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
    return outputs;
}
