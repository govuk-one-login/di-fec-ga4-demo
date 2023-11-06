/* eslint-disable no-console */
import { createApp } from "./app";
import { portNumber } from "./config";

const port = portNumber();

(async () => {
  const app = await createApp();
  const server = app

    .listen(port, () => {
      console.log(`Server listening on port ${port}`);
    })
    .on("error", (error) => {
      console.log(`Unable to start server because of ${error.message}`);
    });
  server.keepAliveTimeout = 61 * 1000;
  server.headersTimeout = 91 * 1000; // This should be bigger than `keepAliveTimeout + your server's expected response time (30s max, due to being behind API Gateway)`
})().catch((err) => {
  console.log("Server failed to create app", err);
});
