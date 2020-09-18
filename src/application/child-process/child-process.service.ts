import { Injectable } from '@nestjs/common';
import { fork } from 'child_process';
import * as path from 'path';

@Injectable()
export class ChildProcessService {
  private forked;
  constructor() {
    this.forked = null;
  }

  /**
   * 创建 fork 进程
   */
  createChildProcess() {
    const scriptPath = path.resolve(__dirname, './child-process.js');
    this.forked = fork(scriptPath);
    this.bindListener();
  }

  consoleLog(msg, data = null) {
    if (data === null) {
      console.log(`[${new Date}][${process.pid}] ${msg}`);
    } else {
      console.log(`[${new Date}][${process.pid}] ${msg}`, data);
    }
  }

  /**
   * 监听
   */
  bindListener() {
    this.forked.on('exit', (code) => {
      if (code !== 500) {
        this.consoleLog('子进程退出码：', code);
        return;
      }
      // 进程重启
      this.consoleLog('子进程重启');
      this.forked = null;
      this.createChildProcess();
    });

    this.forked.on('message', (msg) => {
      this.consoleLog('父进程收到的消息：', msg);
    });

    this.forked.send({ counter: 0, from: 'parent-process' });
  }
}
