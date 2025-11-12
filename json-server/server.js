import jsonServer from "json-server";
import cors from "cors";

const server = jsonServer.create();
const router = jsonServer.router("json-server/db.json"); // 👉 Đường dẫn chính xác nếu file nằm trong thư mục json-server/
const middlewares = jsonServer.defaults();

// Bật CORS để React (chạy port khác) gọi API được
server.use(cors({ origin: "*" }));

// Middleware mặc định (logger, static, no-cache)
server.use(middlewares);

// Prefix cho API (tùy chọn)
server.use("/api", router);

// Chạy server
const PORT = 3001; // nên tách port riêng với React
server.listen(PORT, () => {
  console.log(`✅ JSON Server is running at http://localhost:${PORT}/api`);
});
