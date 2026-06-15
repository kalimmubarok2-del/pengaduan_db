require("dotenv").config();
require("./koneksi");

const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const laporanRoutes = require("./routes/laporanRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// AKSES FOLDER UPLOADS
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/laporan", laporanRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Server Pengaduan Aktif",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
