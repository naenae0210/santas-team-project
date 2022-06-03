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
  layouts = require("express-ejs-layouts"),
  mountainInfoController = require("./controllers/mountainInfoController");

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
app.get("/around", aroundController.allAround);
app.get("/around/:region", aroundController.searchAroundByAdd);
app.get("/bookmark", bookmarkController.allBookmark);
app.get("/community", homeController.showCommunity);
app.get("/delPost", homeController.showMyPost);
app.get("/myProfile", homeController.showMyProfile);
app.get("/mountain", mountainController.allMountain);
app.get("/mountain/:region", mountainController.searchMountainByAdd);
app.get("/mountain/difficulty/:difficulty", mountainController.searchMountainByDifficulty);
app.get("/mountainInfo", mountainInfoController.showMountainInfo); // test용
app.get("/mountainInfo/:number", mountainInfoController.showMountainInfo);
app.get("/search", homeController.showSearchBar);
app.get("/signIn", homeController.showSignIn);
app.get("/signUp", homeController.showSignUp);
app.post("/signUp", homeController.postedSignUpForm);
app.get("/bookmark/:mountainNum", bookmarkController.create);
app.get("/bookmark/:mountainNum/delete", bookmarkController.delete);
app.post("/around", aroundController.searchAroundByName);


app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});


