"use strict";

const express = require("express");
const app = express();

const { NotFoundError, BadRequestError } = require("./expressError.js");

const { items } = require("./fakeDb.js");

const router = new express.Router();


///ROUTES 

router.get('/', function (req, res, next) {

    return res.status(200).json({ items: items });

});

router.post('/', function (req, res, next) {

    items.push(req.body);
    return res.status(201).json({ added: items.at(-1) });
    //need error handling for a bad post request
});

router.get('/:name', function (req, res, next) {
    const name = req.params.name;
    const singleItem = items.find(item => item.name === name)
    if (singleItem) return res.json(singleItem)
    next()
});

router.patch('/:name', function (req, res, next) {
    
    const name = req.params.name;
    let singleItem = items.find(item => item.name === name);

    const index = items.indexOf(singleItem);

    for (let update in req.body) {
        items[index][update] = req.body[update];
    }
    return res.status(200).json(items[index]);

});

router.delete('/:name', function (req, res, next) {

    const name = req.params.name;
    let singleItem = items.find(item => item.name === name);
    if (singleItem) {
        const index = items.indexOf(singleItem);
        items.splice(index,1)
        return res.status(200).json({message: "Deleted"})
    }
    next()
});




module.exports = router;