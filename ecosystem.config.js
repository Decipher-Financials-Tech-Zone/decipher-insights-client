module.exports = {
  apps: [
    {
      name: "decipher_insights_client",
      cwd: "/var/www/decipher_insights_client",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3020",
      env: {
        NODE_ENV: "production",
      },
      instances: 1,
      exec_mode: "fork",
      out_file: "/var/www/decipher_insights_client/logs/out.log",
      error_file: "/var/www/decipher_insights_client/logs/err.log",
      merge_logs: true,
      max_memory_restart: "512M",
    },
  ],
};
