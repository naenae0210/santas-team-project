exports.showHome = (req, res) => {
  res.render("index");
};

exports.showAround = (req, res) => {
  res.render("around");
};

exports.showBookmark = (req, res) => {
  res.render("bookmark");
};

exports.showCommunity = (req, res) => {
  res.render("community");
};

exports.showMyPost = (req, res) => {
  res.render("delPost");
};

exports.showMyProfile = (req, res) => {
  res.render("editProfile");
};

exports.showMountain = (req, res) => {
  res.render("mountain");
};

exports.showMtInfo = (req, res) => {
  res.render("mountainInfo");
};

exports.showSearchBar = (req, res) => {
  res.render("search");
};

exports.showSignIn = (req, res) => {
  res.render("signIn");
};

exports.postedSignUpForm = (req, res) => {
  res.render("signUp");
};
