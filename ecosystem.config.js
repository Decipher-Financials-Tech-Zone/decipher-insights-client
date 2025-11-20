module.exports = {
  apps: [
    {
      name: "decipher_frontend",
      cwd: "/var/www/decipher_insights_frontend/current",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3020",
      env: {
        NODE_ENV: "production"
      },
      instances: 1,
      exec_mode: "fork",
      out_file: "/var/www/decipher_insights_frontend/logs/out.log",
      error_file: "/var/www/decipher_insights_frontend/logs/err.log",
      merge_logs: true,
      max_memory_restart: "512M"
    }
  ]
}
