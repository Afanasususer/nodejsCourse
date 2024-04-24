const express = require("express");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const Article = require("./models/articleSchema");
app.set("view engine", "ejs");
app.use(express.static('public'))


// this codes for auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});





app.get("/", (req, res) => {
  Article.find()
    .then((results) => { res.render("index.ejs", { myTitle: "Home Page", userName: results.at(-1).useName});})
    .catch((err) => {console.log(err);});
  // res.sendFile("./views/index.html", { root: __dirname });

});
app.get("/htlm", (req, res) => {
  res.send("this page not exist yet !!");
});

mongoose
  .connect(
    "mongodb://elalamisamadi:dUwllcrqSZYStQ9Q@ac-jqqib8i-shard-00-00.ckvnrli.mongodb.net:27017,ac-jqqib8i-shard-00-01.ckvnrli.mongodb.net:27017,ac-jqqib8i-shard-00-02.ckvnrli.mongodb.net:27017/all-data?ssl=true&replicaSet=atlas-x5q5ug-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Mongoo db connection successfully lhamdlah");
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/", (req, res) => {
  const article = new Article(req.body);
  article
    .save()
    .then(() => {
      res.redirect("/htlm");
    })
    .catch((err) => {
      console.log(err);
    });
});
