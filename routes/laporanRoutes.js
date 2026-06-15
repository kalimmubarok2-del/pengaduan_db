const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
getLaporan,
createLaporan,
deleteLaporan,
updateLaporan,
} = require("../controllers/laporanController");

router.get("/", auth, getLaporan);

router.post(
"/",
auth,
upload.single("foto"),
createLaporan
);

router.put("/:id", auth, updateLaporan);

router.delete("/:id", auth, deleteLaporan);

module.exports = router;
