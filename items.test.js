"use strict";

const request = require("supertest");
const app = require("./app"); 
let items = require("./fakeDb");

beforeEach(function() {
     
  items = [
    { name: "popsicle", price: 1.45 },
    { name: "cheerios", price: 3.40 }];

})

afterEach(function() {
  items = [];
 });


describe("GET /items", function() {
  test("Gets a list of items", async function() {
    const resp = await request(app).get(`/items`);
    expect(resp.body).toEqual({ "items" : items });
  });
});

describe("GET /items/:name", function() {
  test("Gets an item", async function() {
    const resp = await request(app).get(`/items/popsicle`);
    expect(resp.body).toEqual({ name: "popsicle", price: 1.45 });
  });
  
  test("Gets a 404 when searching for bad item", async function() {
    const resp = await request(app).get(`/items/no-item`);
    expect(resp.statusCode).toEqual(404);
  });
});

describe("POST /items", function() {
  test("Adds an item", async function() {
    const hotdog = {
      name: "hotdog",
      price: 20,
    }
    const resp = await request(app)
      .post(`/items/`)
      .send(hotdog)
    expect(resp.body).toEqual({ added : hotdog});
    expect(resp.statusCode).toEqual(201);
  });
});

describe("Patch an item /item/:name", function() {
  test("Updates an item", async function() {
    const hotdog = {
      name: "hotdog",
      price: 20,
    }
    const resp = await request(app)
      .patch(`/items/popsicle`)
      .send(hotdog)
    expect(resp.body).toEqual(hotdog);
    expect(resp.statusCode).toEqual(200);
  });
});

describe("Delete an item /item/:name", function() {
  test("Deletes an item", async function() {
   
    const resp = await request(app).delete(`/items/cheerios`)
      expect(resp.body).toEqual({message: "Deleted"});
      expect(resp.statusCode).toEqual(200);

    
  });
});
