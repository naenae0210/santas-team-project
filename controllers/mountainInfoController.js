const { render } = require("ejs");

const mysql = require("../models/index"),
    Mountain = mysql.Mountain,
    Around = mysql.Around;


exports.showMoutainInfo = (req, res) => {
    res.render(`/mountainInfo/${req.params.mountainNum}`);
}