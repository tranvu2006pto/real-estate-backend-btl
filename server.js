const http = require("http");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 10000;

// ====== CONNECT MONGODB ======
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// ====== SCHEMA ======
const HouseSchema = new mongoose.Schema({
  title: String,
  price: Number,
  size: Number,
  type: String,
  area: String
});
const House = mongoose.model("House", HouseSchema);

// ====== SERVER ======
const server = http.createServer(async (req, res) => {

  // POST /api/houses
  if (req.url === "/api/houses" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        // convert price & size to number
        data.price = Number(data.price);
        data.size  = Number(data.size);
        await House.create(data);
        res.writeHead(200, {"Content-Type":"application/json"});
        res.end(JSON.stringify({message:"Lưu thành công"}));
      } catch {
        res.writeHead(400);
        res.end("Invalid data");
      }
    });
    return;
  }

  // GET /api/houses
  if (req.url === "/api/houses" && req.method === "GET") {
    const houses = await House.find();
    res.writeHead(200, {"Content-Type":"application/json"});
    return res.end(JSON.stringify(houses));
  }

  // GET /
  if (req.url === "/") {
    const indexPath = path.join(__dirname, "public", "index.html");
    fs.readFile(indexPath, (err, content) => {
      if (err) { res.writeHead(404); res.end("Not Found"); }
      else { res.writeHead(200, {"Content-Type":"text/html"}); res.end(content); }
    });
    return;
  }

  // STATIC FILES
  const filePath = path.join(__dirname, "public", req.url);
  const ext = path.extname(filePath);
  const types = {".css":"text/css",".js":"application/javascript",".png":"image/png",".jpg":"image/jpeg",".ico":"image/x-icon"};
  fs.readFile(filePath, (err, content) => {
    if (err) { res.writeHead(404); res.end("Not Found"); }
    else { res.writeHead(200, {"Content-Type": types[ext]||"text/plain"}); res.end(content); }
  });

});

server.listen(PORT, ()=>console.log("Server running on port",PORT));
