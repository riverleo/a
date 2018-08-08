module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'a',
      script: 'server.js',
      ignore_watch: ['node_modules'],
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    a: {
      key: './wslo-www.pem',
      user: 'ubuntu',
      host: '13.125.216.161',
      ref: 'origin/master',
      repo: 'git@github.com:workslow/a.git',
      path: '/home/ubuntu',
      'post-deploy': 'npm install && npm run build && pm2 startOrReload ecosystem.config.js --env production --update-env --only a',
    },
  },
};
