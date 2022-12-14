const express = require("express");
const { getDb } = require("../db/conn");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
// convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;



//  get a list of all the records.
recordRoutes.route("/record").get(checkParams, async function (req, res) {
    let db_connect = dbo.getDb("employees");
    db_connect.collection("records").find({})
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
        let db_connect = getDb();
        await db_connect.collection("records").find({}).sort({ [req.query.sort]: 1 }).toArray((error, result) => {
            if (error) throw error;
            res.json(result)
        })
    }
    else if (req.query.filter !== "Default" || req.quer.level !== "Default") {
        let obj;
        req.query.position !== "Default" && req.query.level !== "Default" ? obj = { position: req.query.position, level: req.query.level } :
            req.query.position === "Default" ? obj = { level: req.query.level } : obj = { position: req.query.position }
        let db_connect = getDb();

        await db_connect.collection("records").find(obj).sort({ [req.query.sort]: 1 })
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
recordRoutes.route("/record/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("records")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// create a new record.
recordRoutes.route("/record/add").post(logger, function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        position: req.body.position,
        level: req.body.level,

    };

    db_connect.collection("records").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });



});

// update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
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
    db_connect.collection("records")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

// delete a record
recordRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("records").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

function logger(req, res, next) {
    const date = new Date();
    console.log(date.toLocaleDateString() + " " + date.toLocaleTimeString());
    next();

}

module.exports = recordRoutes;