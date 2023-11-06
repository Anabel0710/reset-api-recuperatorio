import mysqlConnection from 'mysql2/promise';

const properties = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'reset-api2'
};

export const pool = mysqlConnection.createPool(properties);