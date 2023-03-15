self.onmessage = function () {
  // console.log('Worker received message:', e.data);
  // self.postMessage('Result');

  setInterval(() => {
    // console.log('Worker sending message');
    self.postMessage('Message');
  }, 1000);
};
