const mysql = require("../models/index"),
    Mountain = mysql.Mountain,
    Around = mysql.Around;

const request = require("request");

exports.showMountainInfo = async(req, res, next) => {
	const mountainNum = req.params.number;
	
	Mountain.findOne({
		where: {
			number: mountainNum
		}
	}).then(findMountain => {
		Around.findAll({
			where: {
				mountainNum: mountainNum
			}
		}).then((aroundList) => {
			res.render('mountainInfo', {
				mountain: findMountain,
				arounds: aroundList
			})
		})	
	}).catch(err => {
		res.status(500).send({
			message: err.message
		});
	})
}