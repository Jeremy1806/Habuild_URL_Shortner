const express = require('express')
// const connectDB = require('./app/config/db')
const app = express();

app.use(express.json({ extended : false}));

const PORT = 5000;

app.use('/api',require('./app/routes/url'));
app.use('/destination',require('./app/routes/index'));

// app.get("/", (req, res) => {
//     res.send("Hello world!");
// });



app.listen(PORT,() => {
    console.log(`Server running on Port : ${PORT}`);
})