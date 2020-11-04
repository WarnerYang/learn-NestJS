class ChildProcess {
  /**
   * 获取实例
   */
  getInstance() {
    if (!this.instance) {
      this.instance = new ChildProcess();
    }
    return this.instance;
  }

  consoleLog(msg, data = null) {
    if (data === null) {
      console.log(`[${new Date}][${process.pid}] ${msg}`);
    } else {
      console.log(`[${new Date}][${process.pid}] ${msg}`, data);
    }
  }

}

(() => {
  // 监听父进程的消息
  process.on('message', (msg) => {
    const getInstance = new ChildProcess().getInstance();
    getInstance.consoleLog('子进程收到的消息：', msg);
    let counter = msg.counter || 0;
    // 定时输出
    setInterval(() => {
      getInstance.consoleLog('子进程打印：', counter++);
      if (10 === counter) {
        process.exit(400);
      }
    }, 1000);
    process.send({ from: 'child-process' });
  });

  // 处理未捕获的reject信息
  process.on('unhandledRejection', async (e) => {
    getInstance.consoleLog('unhandledRejection', e);
    if (e.original) {
      switch (e.original.code) {
      case 'PROTOCOL_CONNECTION_LOST':
        process.exit(500);
        break;
      case 'ER_SERVER_SHUTDOWN':
        process.exit(500);
        break;
      case 'ECONNREFUSED':
        process.exit(500);
        break;
      case 'ECONNRESET':
        process.exit(500);
        break;
      default:
        process.exit(0);
      }
    } else if (e.name) {
      switch (e.name) {
      case 'MongoNetworkError':
        process.exit(500);
        break;
      case 'MongooseServerSelectionError':
        process.exit(500);
        break;
      }
    } else {
      process.exit(0);
    }
  });
})();
