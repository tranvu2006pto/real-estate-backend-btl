const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const housesFile = path.join(__dirname, "houses.json");
const publicDir = path.join(__dirname, "public");

// Tạo houses.json nếu chưa tồn tại
if (!fs.existsSync(housesFile)) {
  fs.writeFileSync(housesFile, JSON.stringify([]));
}

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

const server = http.createServer((req, res) => {
  /* ================= API ================= */

  // GET danh sách nhà
  if (req.url === "/api/houses" && req.method === "GET") {
    const data = JSON.parse(fs.readFileSync(housesFile));
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(data));
  }

  // POST thêm nhà
  if (req.url === "/api/houses" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      try {
        const house = JSON.parse(body);
        const data = JSON.parse(fs.readFileSync(housesFile));
        data.push(house);
        fs.writeFileSync(housesFile, JSON.stringify(data, null, 2));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Lưu thành công!" }));
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Dữ liệu không hợp lệ" }));
      }
    });
    return;
  }

  /* ============== FRONTEND ============== */

  let filePath =
    req.url === "/"
      ? path.join(publicDir, "index.html")
      : path.join(publicDir, req.url);

  const ext = path.extname(filePath).toLowerCase();

  fs.readFile(filePath, (err, content) => {
    if (err) {
      // fallback: mọi route không phải api đều trả index.html
      if (!req.url.startsWith("/api")) {
        const indexPath = path.join(publicDir, "index.html");
        fs.readFile(indexPath, (e, indexContent) => {
          if (e) {
            res.writeHead(500);
            res.end("Server error");
          } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(indexContent);
          }
        });
      } else {
        res.writeHead(404);
        res.end("Not Found");
      }
    } else {
      res.writeHead(200, {
        "Content-Type": mimeTypes[ext] || "text/plain"
      });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
