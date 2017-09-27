export const getInputs = ({ types, abiFunc, config }) => {
    const inputs = abiFunc.inputs.reduce((str, curr, idx) => {
        types.mapType(curr.type);
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
    return inputs;
}
