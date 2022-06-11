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
  commentController = require("./controllers/commentController"),
  db = require("./models/index"),
  layouts = require("express-ejs-layouts"),
  mountainInfoController = require("./controllers/mountainInfoController"),
  imgController = require("./controllers/imgController"),
  searchController = require("./controllers/searchController");

const passport = require("passport");
const session = require("express-session"),
    flash = require("connect-flash");

db.sequelize.sync();

const User = db.User;

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 80);
router.use(layouts);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

router.use(express.static("public"));
router.use(
  express.urlencoded({
    extended: false
  })
);
router.use(express.json());

router.use(
  session({
    secret: "secretKey",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);

router.use(flash());

router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

router.get("/", homeController.showHome);
router.get("/around", aroundController.allAround);
router.get("/around/:region", aroundController.searchAroundByAdd);
router.get("/bookmark/:id", bookmarkController.allBookmark);

router.get("/community", homeController.showCommunity);
router.get("/delPost", homeController.showMyPost);
router.get("/myProfile", homeController.showMyProfile);
router.get("/mountain", mountainController.allMountain, bookmarkController.isBookmark);
router.get("/mountain/:region", mountainController.searchMountainByAdd, bookmarkController.isBookmark);
router.get("/mountain/difficulty/:difficulty", mountainController.searchMountainByDifficulty, bookmarkController.isBookmark);
router.get("/mountain/image/:number", imgController.getImage);
router.get("/mountainInfo", mountainInfoController.showMountainInfo); // test용
router.get("/mountainInfo/:number", mountainInfoController.showMountainInfo);
router.get("/mountainInfo/:number/:imgNum", imgController.getImages);
router.get("/search", homeController.showSearchBar);
router.post("/search", searchController.searchMountain);
router.post("/search/name", searchController.searchMountainByName);
router.post("/search/region", searchController.searchMountainByAdd);
//app.get("/signIn", homeController.showSignIn);
//app.get("/signUp", homeController.showSignUp);
//app.post("/signUp", homeController.postedSignUpForm);
router.post("/bookmark/:mountainNum/:id/create", bookmarkController.create);
router.post("/bookmark/:mountainNum/:id/delete", bookmarkController.delete);
router.post("/around", aroundController.searchAroundByName);

router.get("/posts", postController.index, postController.indexView);
router.get("/posts/new", postController.new);
router.post("/posts/create", postController.create, postController.redirectView);
router.get("/posts/:id/edit", postController.edit);
router.post("/posts/:id/update", postController.update, postController.redirectView);
router.get("/posts/:id", postController.show, postController.showView);
router.post("/posts/:id/delete", postController.delete, postController.redirectView);

router.post("/comments/:postId/create", commentController.create);
router.post("/comments/:postId/update", commentController.update);
router.get("/comments/:postId/getComment", commentController.getComment);
router.post("/comments/:postId/delete", commentController.delete);



router.get("/users/login", userController.login);
router.post("/users/login", userController.authenticate);
router.get("/users/logout", userController.logout, userController.redirectView);
//router.get("/users", userController.index, userController.indexView);
router.get("/users/new", userController.new);
router.post("/users/create", userController.create, userController.redirectView);
router.get("/users/:id/edit", userController.edit);
router.post("/users/:id/edit", userController.update, userController.redirectView);
router.get("/users/:id", userController.show, userController.showView);
router.post("/users/:id/delete", userController.delete, userController.redirectView);


router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/", router);





app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

// error

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);
