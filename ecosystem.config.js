module.exports = {
  apps: [
    {
      name: 'bookstore-next',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 6,
      exec_mode: 'cluster',
      intepreter: "C://Users/user/.bun/bin" // for config on bun
    },
  ],
};