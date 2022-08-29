exports.handler = async (event, context) => {
    const mysql = require("mysql2/promise");
    const db_connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: context.getUserData("DB_PASSWORD")
    });

    let buff = new Buffer(event.body, 'base64');
    let data = JSON.parse(buff.toString('utf8'));

    var insert_sql = "INSERT INTO pets (Name, Color, Age) VALUES (?, ?, ?)";
    var get_inserted_sql = "select * FROM pets where id =?"

    const [insertMetadata] = await db_connection.query(insert_sql, [data.name, data.color, data.age]);
    const [rows, fields] = await db_connection.query(get_inserted_sql, insertMetadata.insertId);

    
    const output =
    {
        'statusCode': 200,
        'headers':
        {
            'Content-Type': 'application/json'
        },
        'isBase64Encoded': false,
        'body': JSON.stringify(rows[0]),
    }
    
    db_connection.end();
    return output;
}
