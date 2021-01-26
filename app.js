const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require ('cors'); 

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

app.use (cors());

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ogłoszenia'
});

app.get('/all', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`conected as id ${connection.threadId}`)

        //query(sqlString, callback)
        connection.query('SELECT * FROM uzytkownik', (err, rows) => {
            connection.release();

            if (!err) {
                res.send(rows);
            } else {
                console.log(err)
            }
        })
    })
});


app.get('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`conected as id ${connection.threadId}`)

        //query(sqlString, callback)
        connection.query('SELECT * FROM uzytkownik WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release();

            if (!err) {
                res.send(rows);
            } else {
                console.log(err)
            }
        })
    })
})


app.delete('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`conected as id ${connection.threadId}`)

        //query(sqlString, callback)
        connection.query('DELETE FROM uzytkownik WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release();

            if (!err) {
                res.send(`Użytkownik z ID ${req.params.id} został usuniety`);
            } else {
                console.log(err)
            }
        })
    })
});


app.post('/', (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        
        const params = req.body;
        connection.query('INSERT INTO uzytkownik SET ?', params, (err, rows) => {
            connection.release();

            if (!err) {
                res.send(`Beer with the record ID  has been added.`);
            } else {
                console.log(err);
            }
            
            console.log('The data from beer table are:11 \n', rows);

        })
    })
});


app.listen(port, () => console.log(`Lisen on port ${port}`));