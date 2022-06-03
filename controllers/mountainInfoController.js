const mysql = require("../models/index"),
    Mountain = mysql.Mountain,
    Around = mysql.Around;

exports.showMountainInfo = async (req, res, next) => {
	const mountainNum = req.params.number;
	Mountain.findById(mountainNum)
	.then(mountain => {
		res.render("mountainInfo", mountain);
	})
	.catch(err => {
        res.status(500).send({
            message: err.message
        });
	});

}


