require('dotenv').config();
const mysql = require('mysql2/promise');
let db;

let test = async () => {
	db = mysql.createPool({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PW,
		port: process.env.DB_PORT,
		database: process.env.DB_NAME,
		waitForConnections: true,
		insecureAuth: true
	});
	/*
	let sql = 'SELECT * FROM around';
	let [rows, fields] = await db.query(sql);
	console.log(rows);
	*/
};
test();

// api test
const request = require("request");

const key = 'uztp5PFDDh%2BCHj3iQ8dpL9e5QQM3Dn3mIfzDaVG24UwPSyxzuDw3XB9pj6m6mh1DGfT3QuoU5HcE07vLuPPGdw%3D%3D';

const add1 = 'http://apis.data.go.kr/1400000/service/cultureInfoService/mntInfoOpenAPI?searchWrd='
    add2 = '&ServiceKey=',
    add3 = '&numOfRows=10&pageNo=1&examdate=2017-12-27&_type=json';

let reqUrl = add1 + encodeURI('북한산') + add2 + key + add3;

request.get(reqUrl, (err, res, body) => {
	if (err) {
		console.log(`err => ${err}`);
	}
	else {
		if (res.statusCode == 200) {
			const json = JSON.parse(body);

			const mountain = json.response.body.items.item;

			mountain.forEach((data) => {
				db.query(
					`INSERT INTO mountains(number, name, address, altitude) VALUES(?, ?, ?, ?)`,
					[
						data.Mntilistno,
						data.mntiname,
						data.Mntiadd,
						data.mntihigh
					],
					(err, results) => {
						if (err) throw err;
						console.log('result: ', results);
					}
				);
			});
		}
	}
});
