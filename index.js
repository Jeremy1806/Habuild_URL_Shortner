const express = require("express");

const app = express();

app.use(express.json({ extended: false }));

const PORT = 8000;

app.use("/api", require("./routes/url"));
app.use("/destination", require("./routes/index"));

app.listen(PORT, () => {
  console.log(`Server running on Port : ${PORT}`);
});
