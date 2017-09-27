import { appendFileSync } from 'fs';
import { Config } from './config';

export class Output {
    public config: Config;

    constructor(config) {
        this.config = config;
    }

    public print = (str) => {
        console.log(this.config, this.config.outputDir, str);
        this.config.printToConsole
          ? console.log(str)
          : appendFileSync(this.config.outputDir, str + '\n');
      }
}
