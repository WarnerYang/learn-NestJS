import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  static instance: any;
  private envConfig: object;
  private constructor() { }

  /**
   * 获取唯一实例
   */
  static getInstance(): ConfigService {
    if (!this.instance) {
      this.instance = new ConfigService;
    }
    return this.instance;
  }

  /**
   * 获取单个配置
   * 原则： Docker 变量或系统变量覆盖 env 配置文件
   * @param key 配置 key
   */
  get(key: string): any {
    this.envConfig = dotenv.parse(fs.readFileSync('.env'));
    return process.env[key] || this.envConfig[key];
  }

}
