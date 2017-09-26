# auto-type-abi

This CLI tool takes a JSON representation of a contract ABI file as an input, and returns a mapped typing, compatible with our Ethereum-ABI-Interface library. From the ABI, the parser generates a typescript definition file, fully compatible with our Ethereum-ABI-Interface. 

## Usage 

Compile code with `tsc`

`node ./dist/index --config ./<configDir>/config.json`

### JSON Structure

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

### Example JSON

```json
{
  "interface": "Registry",
  "outputMappings": {
    "resolver": ["resolverAddress"],
    "owner": ["ownerAddress"],
    "ttl": ["timeToLive"]
  },
  "outputDir": "./index.d.ts",
  "abiDir": "./test/auction.json",
  "printToConsole": false,
  "fillInterfaces": true
}

```

#### Example usage with JS object made by [PLACEHOLDER]

```js
 import Registry from '<outputDir>.d.ts'
 import RegistryABI from './registryABI.json'
 const registry:Registry = [PLACEHOLDER](RegistryABI) as Registry
 ```
