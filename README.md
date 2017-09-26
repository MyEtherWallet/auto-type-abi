# auto-type-abi

## Usage 

Compile code with `tsc`

`node ./dist/index --config ./<configDir>/config.json`

``` ts
interface: string; // The name of the interface to generate
inputMappings: {
[key: string]: string[]; // Optional mappings for input parameter names for the generated object
};
outputMappings: {
[key: string]: string[]; // Optional mappings for output parameter names for the generated object
};
abiDir: any; // Directory of the ABI to parse and make types for
fillInterfaces: boolean; // Fill in interface function types
outputDir: string; // Where to output type file
printToConsole: boolean; // Print to console or not
```
