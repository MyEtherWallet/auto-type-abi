export interface Config {
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
