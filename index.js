const mysql = require('mysql2/promise');
const http = require('http');

const port = process.env.PORT || 3000;

const dbConfig = {
	host: "sql.freedb.tech",
	user: "freedb_2351_main",
	password: "qE%6DmaDpeKvTpj",
	database: "freedb_comp2350-week2-A01301050",
	multipleStatements: false
};

var database = mysql.createPool(dbConfig);

async function printMySQLVersion() {
	let sqlQuery = `
		SHOW VARIABLES LIKE 'version';
	`;
	
	try {
		const results = await database.query(sqlQuery);
		console.log("Successfully connected to MySQL");
		console.log(results[0]);
		return true;
	}
	catch(err) {
		console.log("Error getting version from MySQL");
		return false;
	}
}


http.createServer(async function(req, res) {
	console.log("page hit");
	const success = await printMySQLVersion();
	
	if (success) {
		//Send an HTTP Status code of 200 for success!
		res.writeHead(200, {'Content-Type': 'text/html'});
		//write the HTML
		res.end('<!doctype html><html><head></head><body><div>Connected to the database, check the Qoddi logs for the results.</div></body></html>');
	}
	else {
		//Send an HTTP Status code of 500 for server error.
		res.writeHead(500, {'Content-Type': 'text/html'});
		//write the HTML
		res.end('<!doctype html><html><head></head><body><div>Database error, check the Qoddi logs for the details.</div></body></html>');
		console.log("Error connecting to mysql");
	}
}).listen(port);



