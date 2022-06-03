const mysql = require("../models/index"),
    Mountain = mysql.Mountain,
    Around = mysql.Around;

	exports.showMountainInfo = async(req, res) => {
		const mountainNum = req.params.number;
		console.log(mountainNum);
	
		Mountain.findAll({
			where: {
				number: mountainNum
			}
		}).then(findMountain => {
			res.render('mountainInfo', {mountain : findMountain});
		}).catch(err => {
			res.status(500).send({
				message: err.message
			});
		})
	}

