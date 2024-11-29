import server from "./server.js";

async function start() {
  await server.start();
}

start().catch((err) => {
  console.error("Error starting the server:", err);
  process.exit(1);
});
