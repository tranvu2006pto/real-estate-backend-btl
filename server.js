const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const housesFile = path.join(__dirname, "houses.json");

// Khởi tạo file houses.json nếu chưa có
if (!fs.existsSync(housesFile)) {
  fs.writeFileSync(housesFile, JSON.stringify([]));
}

const server = http.createServer((req, res) => {
  // API Lưu nhà
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
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Dữ liệu không hợp lệ" }));
      }
    });
    return;
  }

  // API Lấy danh sách nhà
  if (req.url === "/api/houses" && req.method === "GET") {
    const data = JSON.parse(fs.readFileSync(housesFile));
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
    return;
  }

  // Phục vụ file tĩnh
  let filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url);
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml"
  };

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("Not Found");
    } else {
      res.writeHead(200, { "Content-Type": mimeTypes[ext] || "text/plain" });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});