const express = require("express");
const conectarDB = require("./config/db");
const app = express();

conectarDB();

app.use(express.json({ extends: true }));

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hola Mundo");
});

app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT}`);
});

app.use("/users", require("./routes/user"));
app.use("/auth", require("./routes/auth"));
