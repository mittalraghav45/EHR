const fs = require("fs");
const http = require("http");
const path = require("path");

const port = Number(process.env.PORT || 3000);
const apiTarget = new URL(process.env.API_TARGET || "http://127.0.0.1:4000");
const buildDir = path.join(__dirname, "..", "build");
const indexPath = path.join(buildDir, "index.html");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

function sendFile(response, filePath) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(500);
      response.end("Unable to read file");
      return;
    }
    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream"
    });
    response.end(data);
  });
}

const server = http.createServer((request, response) => {
  const urlPath = decodeURIComponent(new URL(request.url, `http://127.0.0.1:${port}`).pathname);

  if (urlPath === "/api" || urlPath.startsWith("/api/")) {
    const targetPath = urlPath.replace(/^\/api/, "") || "/";
    const proxyRequest = http.request(
      {
        hostname: apiTarget.hostname,
        port: apiTarget.port,
        path: targetPath + (new URL(request.url, `http://127.0.0.1:${port}`).search || ""),
        method: request.method,
        headers: {
          ...request.headers,
          host: apiTarget.host
        }
      },
      proxyResponse => {
        response.writeHead(proxyResponse.statusCode || 500, proxyResponse.headers);
        proxyResponse.pipe(response);
      }
    );

    proxyRequest.on("error", () => {
      if (!response.headersSent) {
        response.writeHead(502);
        response.end("API proxy error");
      } else {
        response.destroy();
      }
    });
    request.pipe(proxyRequest);
    return;
  }

  const requestedPath = path.normalize(path.join(buildDir, urlPath));
  const relativePath = path.relative(buildDir, requestedPath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.stat(requestedPath, (error, stat) => {
    if (!error && stat.isFile()) {
      sendFile(response, requestedPath);
      return;
    }
    sendFile(response, indexPath);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Static E2E server listening on http://127.0.0.1:${port}`);
});
