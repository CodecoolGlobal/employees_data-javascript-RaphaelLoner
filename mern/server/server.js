const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config({ path: './config.env' });

const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const employeesRouter = require('./routes/employees')
const equipmentRouter = require('./routes/equipment')


app.use('/employees', employeesRouter);
app.use('/equipment', equipmentRouter);


const dbo = require('./db/conn');

app.get("/fieldlist", (req, res) => {
    let db_connect = dbo.getDb();
    db_connect.collection(req.query.collection).find({}).project({ [req.query.field]: 1, _id: 0 }).toArray((error, result) => {
        if (error) throw error;
        res.json(result)
    })


})
app.listen(port, () => {
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
    });
    console.log(`Server is running on port: ${port}`);
})
