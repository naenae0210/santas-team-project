require('dotenv').config();
const mysql = require('mysql2/promise');

let test = async () => {
	const db = mysql.createPool({
		host: "34.64.117.60",
		user: "naenae0210",
		password: "password",
		port: 3306,
		database: "santas_db",
		waitForConnections: true,
		insecureAuth: true
	});
	let sql = 'SELECT * FROM around';
	let [rows, fields] = await db.query(sql);
	console.log(rows);
};
test();

