const fs = require("fs");
const path = require("path");
const jsonServer = require("json-server");

const server = jsonServer.create();
const dbPath = path.join(__dirname, "..", "server", "db.json");
const routesPath = path.join(__dirname, "..", "server", "routes.json");
const data = JSON.parse(fs.readFileSync(dbPath, "utf8"));
const routes = JSON.parse(fs.readFileSync(routesPath, "utf8"));

server.use(jsonServer.defaults());
server.use(jsonServer.rewriter(routes));
server.use(jsonServer.bodyParser);
server.use(jsonServer.router(data));

const port = Number(process.env.PORT || 4000);
server.listen(port, "127.0.0.1", () => {
  console.log("E2E API server listening on port " + port);
});
