const app = require("express")();
const path = require("path");
const helmet = require("helmet");
require("dotenv").config();
app.disable("x-powered-by");

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CDN is running on PORT: ${PORT}`);
});
