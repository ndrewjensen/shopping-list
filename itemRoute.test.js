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
  it("Gets a list of items", async function() {
    const resp = await request(app).get(`/items`);
    expect(resp.body).toEqual({ "items" : items });
  });
});
