const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 8080);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/mountain", homeController.showMountain);
app.get("/info", homeController.showInfo);
app.get("/community", homeController.showCommunity);
app.get("/signUp", homeController.showSignUp);
app.post("/signUp", homeController.postedSignUpForm);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
