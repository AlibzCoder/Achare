import { IsFunction } from ".";

export class QueueCallbacks {
  
  currentCallbacksProccessingCount = 0;
  concurrency = 0;
  queues : Array<{
    callback : () => any,
    resolve : (c : any) => any,
    reject : (c : any) => any,
  }> = [];

  constructor(concurrency = 1) {
    this.concurrency = concurrency || 1;
    if (isNaN(Number(this.concurrency)) || this.concurrency <= 0)
      this.concurrency = 1;
    this.queues = [];
    this.currentCallbacksProccessingCount = 0;
  }

  async HandleCallback(callback : () => any, resolve : (c : any) => any, reject : (c : any) => any) {
    this.currentCallbacksProccessingCount += 1;
    try {
      const result = await callback();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally{
      this.ProccessNextCallbackOnQueue();
    }
  }

  ProccessNextCallbackOnQueue() {
    this.currentCallbacksProccessingCount -= 1;
    if (this.queues.length === 0) return;
    const queue = this.queues.shift();
    if(queue?.callback && IsFunction(queue.callback) && 
      queue?.resolve && IsFunction(queue.resolve) && 
      queue?.reject && IsFunction(queue.reject)){
        this.HandleCallback(queue?.callback, queue?.resolve, queue?.reject);
      }
  }

  Queue(callback : () => any) {
    if (!callback || !(callback instanceof Function)) return Promise.reject();
    const self = this;
    return new Promise((resolve, reject) => {
      if (this.currentCallbacksProccessingCount < self.concurrency) {
        self.HandleCallback(callback, resolve, reject);
      } else {
        self.queues.push({ callback, resolve, reject });
      }
    });
  }
}

export class CustomError extends Error {

  data = {};
  sendLogs = false;
  isCustomError = true;

  constructor(message : string, data = {}, sendLogs = true) {
    super(message);
    this.data = data;
    this.sendLogs = sendLogs;
  }

}