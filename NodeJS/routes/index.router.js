const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const ctrlUser = require('../controller/userController');

const jwtHelper = require('../config/jwtHelper');


router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

router.get('/', (req, res) => {
    ctrlUser.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Dinos :' + JSON.stringify(err, undefined, 2)) }
    })
})

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`)

    ctrlUser.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving ctrlUser :' + JSON.stringify(err, undefined, 2)) }
    });
});

router.post('/', (req, res) => {
    let di = new ctrlUser({
        fullName: req.body.fullName,
        age: req.body.age,
        famille: req.body.famille,
        race: req.body.race,
        nourriture: req.body.nourriture,
        email : req.body.email,
        password : req.body.password
    })
    di.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in ctrlUser Save :' + JSON.stringify(err, undefined, 2)) }
    });
})

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`)

    let di = {
        fullName: req.body.fullName,
        age: req.body.age,
        famille: req.body.famille,
        race: req.body.race,
        nourriture: req.body.nourriture,
        email : req.body.email,
        password : req.body.password
    };
    ctrlUser.findByIdAndUpdate(req.params.id, { $set: di }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in ctrlUser update :' + JSON.stringify(err, undefined, 2)) }
    })
})

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`)
    
    ctrlUser.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in ctrlUser delete :' + JSON.stringify(err, undefined, 2)) }
    })
})





module.exports = router;