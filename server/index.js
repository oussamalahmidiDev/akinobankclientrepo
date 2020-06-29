const express = require("express");
const fallback = require("express-history-api-fallback");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");
var httpProxy = require("http-proxy");
var proxy = require("express-http-proxy");
const bodyParser = require("body-parser");
const history = require("connect-history-api-fallback");

const app = express();

var apiForwardingUrl = "http://api.akinobank.com/";
app.use(history());

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
const root = path.join(__dirname + "/dist/ebank");
console.log(root);
// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist/ebank"));
// app.use(fallback("index.html", { root }));

// app.get("^((?!api).)*$", function (req, res) {
//   res.sendFile(path.join(__dirname + "/dist/ebank/index.html"));
//   console.log("Requested");
// });

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://akinobankapp.herokuapp.com",
    changeOrigin: true,
    pathRewrite: {
      "/api": "", // remove base path
    },
    ws: true,
    timeout: 1000 * 60,
    onProxyRes: (proxyResponse) => {
      if (proxyResponse.headers["set-cookie"]) {
        const cookies = proxyResponse.headers["set-cookie"].map((cookie) =>
          cookie.replace(/; secure/gi, "")
        );
        proxyResponse.headers["set-cookie"] = cookies;
      }
    },
  })
);
app.use(
  "/ws",
  createProxyMiddleware({
    target: "http://api.akinobank.com/ws",
    changeOrigin: true,
    ws: true,
  })
);
// app.use("/api", proxy("api.akinobank.com", { ws: true }));
app.on("upgrade", function (req, socket, head) {
  console.log("detected ws");
  proxy.ws(req, socket, head);
});
// "akinobankapp.herokuapp.com"
// var apiProxy = httpProxy.createProxyServer();
// app.all("*", function (req, res) {
//   console.log("Request made to /api/*", req.body);
//   apiProxy.web(req, res, { target: apiForwardingUrl });
// });

// app.all("/api", function (req, res) {
//   console.log("Request made to /api");
//   apiProxy.web(req, res, { target: "http://api.akinobank.com" });
// });

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 3000, () =>
  console.log("Listening on port " + 3000)
);
