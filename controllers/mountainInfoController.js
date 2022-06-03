const mysql = require("../models/index"),
    Mountain = mysql.Mountain,
    Around = mysql.Around;

exports.showMountainInfo = async (req, res) => {
	const mountainNum = req.params.number;
	Mountain.findOne( {
		where: {
			number: mountainNum
		}
	})
	.then(mountain => {
		res.render('mountainInfo', {mountain: mountain});
	})
	.catch(err => {
        res.status(500).send({
            message: err.message
        });
	});

}


