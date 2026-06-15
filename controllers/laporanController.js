const db = require("../koneksi");

// GET semua laporan
exports.getLaporan = (req, res) => {
  const sql = `
    SELECT laporan.*, users.nama
    FROM laporan
    LEFT JOIN users
    ON laporan.user_id = users.id
    ORDER BY laporan.id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    res.json(result);
  });
};

// TAMBAH LAPORAN
exports.createLaporan = (req, res) => {
  const { judul, deskripsi } = req.body;

  const user_id = req.user.id;

  const foto = req.file ? req.file.filename : null;

  if (!judul || !deskripsi) {
    return res.status(400).json({
      message: "Data tidak lengkap",
    });
  }

  const sql = `     INSERT INTO laporan
    (judul, deskripsi, foto, user_id)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [judul, deskripsi, foto, user_id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    res.status(201).json({
      message: "Laporan berhasil ditambahkan",
    });
  });
};

exports.deleteLaporan = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM laporan WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    res.json({
      message: "Laporan berhasil dihapus",
    });
  });
};
exports.updateLaporan = (req, res) => {
  console.log("UPDATE DIPANGGIL");
  console.log(req.params);
  console.log(req.body);

  const { id } = req.params;
  const { judul, deskripsi } = req.body;

  if (!judul || !deskripsi) {
    return res.status(400).json({
      message: "Data tidak lengkap",
    });
  }

  const sql = `     UPDATE laporan
    SET judul = ?, deskripsi = ?
    WHERE id = ?
  `;

  db.query(sql, [judul, deskripsi, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    res.json({
      message: "Laporan berhasil diupdate",
    });
  });
};
