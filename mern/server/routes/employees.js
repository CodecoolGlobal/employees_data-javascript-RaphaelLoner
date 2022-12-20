const express = require("express");
const employeesRouter = express.Router();
const dbo = require("../db/conn");
// convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


//  get a list of all the records.
employeesRouter.get("/", checkParams, async function (req, res) {
    let db_connect = dbo.getDb();
    db_connect.collection("employees").find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

async function checkParams(req, res, next) {

    if (req.query.sort === undefined && req.query.position === undefined && req.query.level === undefined) {
        next()
    }

    else if (req.query.position === "Default" && req.query.level === "Default") {
        let db_connect = dbo.getDb();
        await db_connect.collection("employees").find({}).sort({ [req.query.sort]: 1 }).toArray((error, result) => {
            if (error) throw error;
            res.json(result)
        })
    }
    else if (req.query.filter !== "Default" || req.quer.level !== "Default") {
        let obj;
        req.query.position !== "Default" && req.query.level !== "Default" ? obj = { position: req.query.position, level: req.query.level } :
            req.query.position === "Default" ? obj = { level: req.query.level } : obj = { position: req.query.position }
        let db_connect = dbo.getDb();

        await db_connect.collection("employees").find(obj).sort({ [req.query.sort]: 1 })
            .toArray((error, result) => {
                if (error) throw error;
                res.json(result)
            })
    }
    else {
        next();
    }

}

//get a single record by id
employeesRouter.get("/:id", function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("employees")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// create a new record.
employeesRouter.post("/add", function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        position: req.body.position,
        level: req.body.level,

    };

    db_connect.collection("employees").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// update a record by id.
employeesRouter.post("/update/:id", function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname,
            position: req.body.position,
            level: req.body.level,
        },
    };
    db_connect.collection("employees")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

// delete a record
employeesRouter.delete("/delete/:id", (req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("employees").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});



module.exports = employeesRouter;