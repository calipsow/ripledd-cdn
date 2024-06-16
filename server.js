const express = require("express");
const app = require("express")();
const path = require("path");
const helmet = require("helmet");
const UploadRouter = require("./middleware/images/image-upload");
require("dotenv").config();
app.disable("x-powered-by");

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(UploadRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CDN is running on PORT: ${PORT}`);
});
