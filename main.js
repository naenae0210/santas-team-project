const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 80);
app.use(layouts);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.get("/", homeController.showHome);
app.get("/around", homeController.showAround);
app.get("/bookmark", homeController.showBookmark);
app.get("/community", homeController.showCommunity);
app.get("/delPost", homeController.showMyPost);
app.get("/myProfile", homeController.showMyProfile);
app.get("/mountain", homeController.showMountain);
app.get("/mountainInfo", homeController.showMtInfo);
app.get("/search", homeController.showSearchBar);
app.get("/signUp", homeController.showSignUp);
app.post("/signUp", homeController.postedSignUpForm);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
