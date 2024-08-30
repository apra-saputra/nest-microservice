const { app, port, express } = require("./config/main");
const cors = require("cors");
const router = require("./routes/router");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`🚀 server running on port: ${port}`);
});
