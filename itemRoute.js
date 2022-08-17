"use strict";

const express = require("express");
const app = express();

const { NotFoundError } = require("./expressError.js");

const { items } = require("./fakeDb.js");

const router = new express.Router();


///ROUTES 

router.get('/', function(req,res) {

    return res.status(200).json({ items: items});

});

router.post('/', function(req,res) {

    items.push(req.body);
    return res.status(201).json({added: items.at(-1)});

});

router.get('/:name', function(req,res) {
    debugger
    const name = req.params.name
    const singleItem = items.find(item => item.name === name)

    return res.status(200).json(singleItem)
});

router.patch('/:name', function(req,res) {


});

router.delete('/:name', function(req,res) {


});




module.exports = router;