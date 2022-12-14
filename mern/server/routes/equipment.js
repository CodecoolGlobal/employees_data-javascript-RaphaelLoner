const express = require("express");
const equipmentRouter = express.Router();
// connect to the database
const dbo = require("../db/conn");
// convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


//  get a list of all the equipment.
equipmentRouter.route("/equipment").get(function (req, res) {
    let db_connect = dbo.getDb("employees");
    db_connect.collection("equipment").find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

//get a single equipment by id
equipmentRouter.route("/equipment/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("equipment")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// create a new equipment.
equipmentRouter.route("/equipment/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        type: req.body.type,
        amount: req.body.amount,
    };
    db_connect.collection("equipment").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// update a equipment by id.
equipmentRouter.route("/equipment/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            name: req.body.name,
            type: req.body.type,
            amount: req.body.amount,
        },
    };
    db_connect
        .collection("equipment")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

// delete a equipment
equipmentRouter.route("/equipment/delete/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("equipment").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = equipmentRouter;