exports.showMountain = (req, res) => {
  res.render("mountain");
};

exports.showInfo = (req, res) => {
  res.render("info", {
  });
};

exports.showCommunity = (req, res) => {
  res.render("community");
};

exports.showSignUp = (req, res) => {
  res.render("signUp");
};

exports.postedSignUpForm = (req, res) => {
  res.render("signUp");
};
