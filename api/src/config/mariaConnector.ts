import mariadb from 'mariadb';
import logging from './logging';

const pool = mariadb.createPool({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	user: process.env.DB_USER,
	password: process.env.DB_PWD,
	database: process.env.DB,
	trace: Boolean(process.env.DB_ERROR_TRACE) || false,
	rowsAsArray: true, // With this option on, we get Array instead of JSON as response
});

export default pool;
