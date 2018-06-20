import Student from '../database-model/db-connection'
import express from 'express';
import bodyparser from 'body-parser';
const app = express();

// tells the system to use JSON fromat data
app.use(bodyparser.json());

// define the routing using the express method
const router = express.Router();

//Mount the router as middleware at path /Student
app.use('/stud', router);

//get a Student detailslist from database
router.get('/stud', function (req, res) {

    if (!req.body) {
        return res.status(400).send({ message: "Student Cannot be empty!" });
    }

    Student.find({}).then(function (data) {
        res.send(data);
        console.log('get the data successfully')
    }).catch((error) => {
        console.error(error.message);
        res.send({ err: error.message });
    });
});


// Get the data with id
router.get('/stud/:_id', function (req, res) {

    if (!req.body) {
        return res.status(400).send({ message: "Student Cannot be empty!" });
    }
    let id = req.params._id;
    Student.find({ id: req.param._id }, req.body).then(function (data) {
        res.send(data);
        console.log('get the data successfully')
    }).catch((error) => {
        console.error(error.message);
        res.send({ err: error.message });
    });
});



//add a new member to database using Post method

router.post('/stud', function (req, res) {
    if (!req.body) {
        return res.status(400).send({ message: "Student Cannot be empty!" });
    }
    Student.create(req.body).then(function (stud) {
        res.status(201).json(stud);
        console.log('Post the data successfully')
    }).catch((error) => {
        console.error(error.message);
        res.send({ err: error.message });
    });

});



//update a data
router.put('/stud/:id', function (req, res) {
    if (!req.body) {
        return res.status(400).send({ message: "Student Cannot be empty!" });
    }

    Student.findById(req.params.id, (err, data) => {
        data.name = req.body[0].name;
        console.log('data => ', data);
        data.save(function (err) {
            if (err)
                res.send(err);
            res.json(beer);
        });
        res.send(data);
        console.log('update the data successfully')
    });
});



//delete a data from database
router.delete('/stud/:id', function (req, res) {
    if (!req.body) {
        return res.status(400).send({ message: "Student Cannot be empty!" });
    }

    Student.findByIdAndRemove({ _id: req.params.id }).then(function (data) {
        res.send(data);
        console.log('Delete the data successfully')
    }).catch((error) => {
        console.error(error.message);
        res.send({ err: error.message });
    });

});


//Exporting router 
module.exports = router;
