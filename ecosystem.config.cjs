module.exports = {
  apps: [
    {
      name: "portfolio-frontend",
      cwd: "./",
      script: "npm",
      args: "run start:prod",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
    {
      name: "portfolio-backend",
      cwd: "./backend",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
        PORT: "4000",
      },
    },
  ],
};
