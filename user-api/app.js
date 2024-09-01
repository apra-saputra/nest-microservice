require("dotenv").config();

const { app, port, express } = require("./config/main");
const cors = require("cors");
const router = require("./routes/router");

// Origin Cors
const origin = process.env.ORIGIN || "*";

app.use(cors({ methods: "GET,HEAD,PUT,PATCH,POST,DELETE", origin }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`🚀 server running on port: ${port}`);
});
