import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  static instance: any;
  private envConfig: dotenv.DotenvParseOutput;
  constructor() {
    this.envConfig = dotenv.parse(fs.readFileSync('.env'));
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ConfigService;
    }
    return this.instance;
  }

  // Docker 变量或系统变量覆盖 env 配置文件
  get(key: string) {
    return process.env[key] || this.envConfig[key];
  }

}
