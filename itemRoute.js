"use strict";

const express = require("express");
const app = express();

const { NotFoundError } = require("./expressError.js");

const { items } = require("./fakeDb.js");

const router = new express.Router();


///ROUTES 

router.get('/', function (req, res) {

    return res.status(200).json({ items: items });

});

router.post('/', function (req, res) {

    items.push(req.body);
    return res.status(201).json({ added: items.at(-1) });

});

router.get('/:name', function (req, res) {
    const name = req.params.name;
    const singleItem = items.find(item => item.name === name);

    return res.status(200).json(singleItem);
});

router.patch('/:name', function (req, res) {

    debugger
    
    const name = req.params.name;
    let singleItem = items.find(item => item.name === name);

    const index = items.indexOf(singleItem);

    for (let update in req.body) {
        items[index][update] = req.body[update];
    }
    return res.status(200).json(items[index]);

});

router.delete('/:name', function (req, res) {

    const name = req.params.name;
    let singleItem = items.find(item => item.name === name);
    const index = items.indexOf(singleItem);
    items.splice(index,1)

    return res.status(200).json({message: "Deleted"})
});




module.exports = router;