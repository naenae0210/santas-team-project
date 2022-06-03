const db = require("./models/index.js");
const models = require("./models/index.js");

process.setMaxListeners(15);

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

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});


// api test
const request = require("request");
const parseString = require("xml2js").parseString;

const key = 'uztp5PFDDh%2BCHj3iQ8dpL9e5QQM3Dn3mIfzDaVG24UwPSyxzuDw3XB9pj6m6mh1DGfT3QuoU5HcE07vLuPPGdw%3D%3D';

const add1 = 'http://apis.data.go.kr/1400000/service/cultureInfoService/mntInfoOpenAPI?searchWrd='
    add2 = '&ServiceKey=',
    add3 = '&numOfRows=10&pageNo=1&examdate=2017-12-27';

let address = add1 + encodeURI('북한산') + add2 + key + add3;

app.get('/api', function(req, res, next) {
  request(address, function(error, res, body) {
    console.log(body);
    parseString(body, function(error, result) {
      // console.log(result);
    })

  })
})

// error

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);
