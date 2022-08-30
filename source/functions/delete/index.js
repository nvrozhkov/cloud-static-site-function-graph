exports.handler = async (event, context) => {
    const mysql = require("mysql2/promise");
    const db_connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: context.getUserData("DB_PASSWORD")
    });

    const id = event.pathParameters.id;
    const delete_sql = "DELETE FROM pets WHERE id = ?";
    const [deleteMetadata] = await db_connection.query(delete_sql, [id]);
    db_connection.end();

    const output =
    {
        'statusCode': 204
    }
    return output;
}
