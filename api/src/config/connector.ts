import mariadb from 'mariadb';

const pool = mariadb.createPool({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	user: process.env.DB_USER,
	password: process.env.DB_PWD,
	database: process.env.DB,
	connectionLimit: 5,
});

export default pool;
