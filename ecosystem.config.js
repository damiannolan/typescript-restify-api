module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "API",
      script    : "./lib/server.js",
      env: {
        NODE_ENV: "development"
      },
      env_production : {
        NODE_ENV: "production"
      },
      ignore_watch: ["[\/\\]\./", "node_modules", "src"]
    },

  ]
}
