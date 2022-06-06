const express = require("express"),
  app = express(),
  router = express.Router(),
  path = require('path'),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  mountainController = require("./controllers/mountainController"),
  bookmarkController = require("./controllers/bookmarkController"),
  aroundController = require("./controllers/arouundController"),
  userController = require("./controllers/userController"),
  postController = require("./controllers/postController"),
  db = require("./models/index"),
  models = require("./models/index.js"),
  layouts = require("express-ejs-layouts"),
  mountainInfoController = require("./controllers/mountainInfoController"),
  imgController = require("./controllers/imgController"),
  searchController = require("./controllers/searchController"),
  session = require('express-session');

db.sequelize.sync();

const User = db.user;
const Post = db.post;

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
//app.use(session());

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
app.get("/mountain/image/:number", imgController.getImage);
app.get("/mountainInfo", mountainInfoController.showMountainInfo); // test용
app.get("/mountainInfo/:number", mountainInfoController.showMountainInfo);
app.get("/mountainInfo/:number/:imgNum", imgController.getImages);
app.get("/search", homeController.showSearchBar);
app.post("/search", searchController.searchMountain);
app.post("/search/region", searchController.searchMountainByAdd);
app.get("/signIn", homeController.showSignIn);
app.get("/signUp", homeController.showSignUp);
app.post("/signUp", homeController.postedSignUpForm);
app.post("/bookmark/:mountainNum/create", bookmarkController.create);
app.post("/bookmark/:mountainNum/delete", bookmarkController.delete);
app.post("/around", aroundController.searchAroundByName);


router.get("/posts", postController.index, postController.indexView);
router.get("/posts/new", postController.new);
router.post("/posts/create", postController.create, postController.redirectView);
router.get("/posts/:id/edit", postController.edit);
router.post("/posts/:id/update", postController.update, postController.redirectView);
router.get("/posts/:id", postController.show, postController.showView);
router.post("/posts/:id/delete", postController.delete, postController.redirectView);

router.get("/users", userController.index, userController.indexView);
router.get("/users/new", userController.new);
router.post("/users/create", userController.create, userController.redirectView);
router.get("/users/:id/edit", userController.edit);
router.post("/users/:id/update", userController.update, userController.redirectView);
router.get("/users/:id", userController.show, userController.showView);
router.post("/users/:id/delete", userController.delete, userController.redirectView);



router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/", router);





app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});


// api test
const request = require("request");

const key = 'uztp5PFDDh%2BCHj3iQ8dpL9e5QQM3Dn3mIfzDaVG24UwPSyxzuDw3XB9pj6m6mh1DGfT3QuoU5HcE07vLuPPGdw%3D%3D';

const add1 = 'http://apis.data.go.kr/1400000/service/cultureInfoService/mntInfoOpenAPI?searchWrd='
    add2 = '&ServiceKey=',
    add3 = '&numOfRows=10&pageNo=1&examdate=2017-12-27&_type=json';

let address = add1 + encodeURI('북한산') + add2 + key + add3;

app.get('/api', function(req, res, next) {
  request(address, function(error, res, body) {
    console.log(body);
  })
})

// error

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);
