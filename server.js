const http = require("http");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

// ====== MONGODB ======
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const HouseSchema = new mongoose.Schema({
  title: String,
  price: Number,   // TỶ
  size: Number,
  type: String,
  area: String
});

const House = mongoose.model("House", HouseSchema);

// ====== SERVER ======
const server = http.createServer(async (req, res) => {

  // POST
  if (req.url === "/api/houses" && req.method === "POST") {
    let body = "";
    req.on("data", c => body += c);
    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        await House.create(data);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Lưu thành công" }));
      } catch {
        res.writeHead(400);
        res.end("Invalid data");
      }
    });
    return;
  }

  // GET
  if (req.url === "/api/houses" && req.method === "GET") {
    const houses = await House.find();
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(houses));
  }

  // STATIC
  let filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url);
  const ext = path.extname(filePath);
  const types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript"
  };

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("Not Found");
    } else {
      res.writeHead(200, { "Content-Type": types[ext] || "text/plain" });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
