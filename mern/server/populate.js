
const { MongoClient } = require("mongodb");
require('dotenv').config({ path: './config.env' });
const MONGOURL = process.env.ATLAS_URI;

const client = new MongoClient(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const employees = [
    {

        firstname: 'Sebastian',
        middlename: 'Dolum',
        lastname: 'Margiol',
        position: 'Lektor',
        level: 'Senior'
    },
    {

        firstname: 'Christoph',
        middlename: 'Bread',
        lastname: 'Brodnig',
        position: 'Bio und Resourcen Manager',
        level: 'Senior'
    },
    {

        firstname: 'Peter',
        middlename: 'Pinky',
        lastname: 'Roith',
        position: 'Assistent',
        level: 'Junior'
    },
    {

        firstname: 'Raphael',
        middlename: 'Aslan',
        lastname: 'Loner',
        position: 'Fullstack Developer',
        level: 'Junior'
    },
    {

        firstname: 'Benedikt',
        middlename: 'Olum',
        lastname: 'Knotzer',
        position: 'Assistent',
        level: 'Intern'
    },
    {

        firstname: 'Thomas',
        middlename: 'Tapezierer',
        lastname: 'Krischanitz',
        position: 'Haustechniker',
        level: 'Senior'
    },
    {

        firstname: 'Alex',
        middlename: 'Franzi',
        lastname: 'Franz',
        position: 'Security',
        level: 'Senior'
    },
    {

        firstname: 'Andreas',
        middlename: 'Tempo',
        lastname: 'Andi',
        position: 'Security',
        level: 'Senior'
    }
]
const positions = [
    { "name": "Main Actor", "salary": 1200, overbudget: 20 },
    { "name": "Comic Relief", "salary": 1000, overbudget: 20 },
    { "name": "Love Interests", "salary": 1500, overbudget: 20 },
    { "name": "Protagonist", "salary": 2000, overbudget: 20 },
    { "name": "Antagonist", "salary": 2100, overbudget: 20 },
    { "name": "Operatour", "salary": 1000, overbudget: 20 },
    { "name": "Director", "salary": 3200, overbudget: 20 },
    { "name": "Joker", "salary": 600, overbudget: 20 },
    { "name": "Superhero", "salary": 1500, overbudget: 20 }
]

var _db;


client.connect(function (err, db) {

    if (db) {
        _db = db.db("employees-data");
        console.log("Successfully connected to MongoDB.");

        _db.collection("employees").deleteMany({}, (err, result) => {
            if (err) throw err;
            console.log("cleaning finished");

            _db.collection("employees").insertMany(employees, (err, result) => {
                if (err) throw err;
                console.log("populate employees finished");
                db.close();
            })

        })

    }

})















