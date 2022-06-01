const express = require("express");
const pool = require("../models/db");
const router = express.Router();

router.get("/:code", async (req, res) => {
  try {
    const days = req.params.code;
    const url = await pool.query("SELECT * FROM shortner WHERE urlcode=$1", [
      days,
    ]);

    console.log(req.params.code);

    if (url.rowCount != 0) {
      console.log(url.rows[0]);
      return res.redirect(url.rows[0].long_url);
    } else {
      return res.status(404).json("No url found!!!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;
