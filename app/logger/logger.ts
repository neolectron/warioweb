export default {
  log: (...messages: unknown[]) => {
    // TODO: remove this test
    if (typeof window !== 'undefined') {
      throw new Error('Cannot log on the client side');
    }
    if (typeof messages[0] === 'string') {
      messages[0] = `[${new Date().toLocaleString()}] ${messages[0]}`;
    }
    console.log(...messages);
  },
  dir: (...messages: unknown[]) => {
    console.dir(...messages);
  },
  error: (messages: unknown[]) => {
    console.error(...messages);
  },
};
