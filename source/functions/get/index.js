exports.handler = async (event, context) => {
    const mysql = require("mysql2/promise");
    const db_connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: context.getUserData("DB_PASSWORD")
    });
    var sql = "select * FROM pets";
    const [rows, fields] = await db_connection.query(sql);

    const output =
    {
        'statusCode': 200,
        'headers':
        {
            'Content-Type': 'application/json'
        },
        'isBase64Encoded': false,
        'body': JSON.stringify(rows)
    }
    db_connection.end();
    return output;
}
