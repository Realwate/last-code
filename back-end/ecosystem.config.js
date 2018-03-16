module.exports = {
  apps : [{
    name        : "server",
    script      : "./server.js",
    watch       : false,
    env: {
      "NODE_ENV": "production",
      "EGG_SERVER_ENV": "prod",
    },
  }]
}
