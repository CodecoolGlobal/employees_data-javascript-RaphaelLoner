const express = require("express");
const equipmentRouter = express.Router();

const dbo = require("../db/conn");
// convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;



equipmentRouter.get("/", function (req, res) {
    let db_connect = dbo.getDb();
    db_connect.collection("equipment").find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});


equipmentRouter.get("/:id", function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("equipment")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});


equipmentRouter.post("/add", function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        type: req.body.type,
        amount: Number(req.body.amount),
    };
    db_connect.collection("equipment").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});


equipmentRouter.post("/update/:id", function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            name: req.body.name,
            type: req.body.type,
            amount: Number(req.body.amount),
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


equipmentRouter.delete("/delete/:id", (req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("equipment").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = equipmentRouter;