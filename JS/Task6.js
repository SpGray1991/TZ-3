class ConcurrencyQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.requestsForQueue = {};
    this.queuingRequestsIds = [];
  }

  process() {
    Object.keys(this.requestsForQueue)
      .filter((requestId) => !this.queuingRequestsIds.includes(requestId))
      .sort((requestId1, requestId2) => requestId1 - requestId2)
      .slice(0, this.concurrency - this.queuingRequestsIds.length)
      .forEach((requestId) => this.queuing(requestId));
  }

  //встать в очередь
  queue(queueCallback) {
    if (typeof queueCallback !== "function") {
      return;
    }

    const requestIds = Object.keys(this.requestsForQueue);

    const newRequestId = requestIds.length ? Math.max(...requestIds) + 1 : 0;

    this.requestsForQueue[newRequestId] = queueCallback;
  }

  //удалить из очереди после выполнения
  deQueue(requestId) {
    if (this.requestsForQueue[requestId]) {
      delete this.requestsForQueue[requestId];
    }

    const requestIdIndex = this.queuingRequestsIds.findIndex(
      (queuingRequestId) => queuingRequestId === requestId
    );

    if (requestIdIndex >= 0) {
      this.queuingRequestsIds.splice(requestIdIndex, 1);
    }

    this.process();
  }

  //Обработка очереди
  queuing(requestId) {
    if (!this.requestsForQueue[requestId]) {
      return;
    }

    new Promise(this.requestsForQueue[requestId]).then(() => {
      this.deQueue(requestId);
    });

    this.queuingRequestsIds.push(requestId);
  }
}

setTimeout(() => {
  const queue = new ConcurrencyQueue(4);
  queue.queue((resolve) =>
    setTimeout(() => {
      console.log("0, TIMEOUT 8 sec.", new Date());
      resolve();
    }, 8000)
  );
  queue.queue((resolve) =>
    setTimeout(() => {
      console.log("1, TIMEOUT 3 sec.", new Date());
      resolve();
    }, 3000)
  );
  queue.queue((resolve) =>
    setTimeout(() => {
      console.log("2, TIMEOUT 5 sec.", new Date());
      resolve();
    }, 5000)
  );
  queue.queue((resolve) =>
    setTimeout(() => {
      console.log("3, TIMEOUT 11 sec.", new Date());
      resolve();
    }, 11000)
  );
  queue.queue((resolve) =>
    setTimeout(() => {
      console.log("4, TIMEOUT 4 sec.", new Date());
      resolve();
    }, 4000)
  );

  queue.process();
}, 0);
