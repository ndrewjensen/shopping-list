"use strict";

const express = require("express");
const app = express();

const { NotFoundError } = require("./expressError.js");

const router = new express.Router();

router.get('/', function(req,res) {


});

router.post('/', function(req,res) {


});

router.get('/:name', function(req,res) {


});

router.patch('/:name', function(req,res) {


});

router.delete('/:name', function(req,res) {


});




module.export = { router };