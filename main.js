const db = require("./models/index.js");
const models = require("./models/index.js");

models.sequelize.sync().then( () => {
    console.log(" DB 연결 성공");
}).catch(err => {
    console.log("연결 실패");
    console.log(err);
})


const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  mountainController = require("./controllers/mountainController"),
  bookmarkController = require("./controllers/bookmarkController"),
  aroundController = require("./controllers/arouundController"),
  layouts = require("express-ejs-layouts");

db.sequelize.sync();

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
app.get("/mountain", homeController.showMountains);
app.get("/mountainInfo", homeController.showMtInfo);
app.get("/search", homeController.showSearchBar);
app.get("/signIn", homeController.showSignIn);
app.get("/signUp", homeController.showSignUp);
app.post("/signUp", homeController.postedSignUpForm);
app.get("/bookmark/:mountainNum", bookmarkController.create);
app.get("/bookmark/:mountainNum/delete", bookmarkController.delete);
app.get("/mountainInfo/:mountainNum", homeController.showMtInfo);
app.get("/mountain/:searchWord", mountainController.searchMountainByAdd);
app.get("/mountain/difficulty/:searchWord", mountainController.searchMountainByDifficulty)
app.post("/around", aroundController.searchAroundByName);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
