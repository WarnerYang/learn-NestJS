import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  static instance: any;
  private envConfig: object;

  constructor() {
    this.envConfig = dotenv.parse(fs.readFileSync('.env'));
  }

  /**
   * 获取单个配置
   * 原则： Docker 变量或系统变量覆盖 env 配置文件
   * @param key 配置 key
   */
  get(key: string): any {
    return process.env[key] || this.envConfig[key];
  }
}
