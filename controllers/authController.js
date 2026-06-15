const db = require("../koneksi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    if (!nama || !email || !password) {
      return res.status(400).json({
        message: "Semua field wajib diisi",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (nama, email, password) VALUES (?, ?, ?)";

    db.query(sql, [nama, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      res.status(201).json({
        message: "Register berhasil",
      });
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email dan password wajib diisi",
      });
    }

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "User tidak ditemukan",
        });
      }

      const user = result[0];

      const cocok = await bcrypt.compare(password, user.password);

      if (!cocok) {
        return res.status(401).json({
          message: "Password salah",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        },
      );

      res.json({
        message: "Login berhasil",
        token,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
