const Pool = require("pg").Pool;
const pool = new Pool({
    user: 'postgres',
    host: '172.31.41.33',
    database: 'postgres',
    password: 'postgres',
    port: 5432
});

const ResponseClass = require("./model/response") 



const getMessages = (request, response) => {
    var responseReturn = new ResponseClass();
    pool.query('SELECT * FROM schemelor.sorin;', (error, results) => {
        if (error) {
            throw error
        }

        responseReturn.status = true;
        responseReturn.code = 200;
        responseReturn.message = "Success";
        responseReturn.data = results.rows;

        response.status(200).json(responseReturn);
    })
}

const sendMessage = (request, response) => {
    const { mesaj } = request.query; // Extract from query parameters

    if (!mesaj) {
        return response.status(400).send("Mesaj is required");
    }

    pool.query('INSERT INTO schemelor.sorin(mesaj) VALUES ($1);', [mesaj], (error, results) => {
        if (error) {
            console.error(error);
            return response.status(500).send("Database error");
        }
        response.status(201).send("Mesaj trimis");
    });
};
module.exports = {
    getMessages,
    sendMessage,
}
