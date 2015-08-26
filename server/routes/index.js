// Express allows you to define how *it* works

// This line comes prepopulated when we create the file
var express = require('express');


// This line comes prepopulated when we create the file
var router = express.Router();

// Create a variable called puppies to hold an array literal
var puppies =  [{ name: "lucy", age: 1}, {name: "annie", age: 2}, {name: "cara", age: 3}];


// Get information from the server (in this case, I am the server. The request is running this logic)
router.get('/puppies', function(req, res) {
    res.set('Content-Type', 'application/json');
    res.send(puppies);
});

// I'm sending a request back to the server after they sent me some information. Think of it like this: I go to Google and ask for information on gSchool. I fill out the form with my information and that's what this post request is about.
router.post('/puppies', function(req,res,next) {
    var new_puppy = {name: req.body.name, age: req.body.age};
    puppies.push(new_puppy);
    res.json(puppies);
});

// I'm defining how to handle another get request to the server (me) at /puppies/anyId. In this case, it's to put information on the screen. The get request is asking for a specific parameter (id) and that's how I'm getting back the specific information. Remember that it's zero indexed because we are using an array as our data store.
router.get('/puppies/:id', function(req, res, next) {
    if (puppies[req.params.id]) {
        res.json(puppies[req.params.id]);
    } else {
        res.send("Not Found", 404);
    }
    console.log(req.params);

});

// With a put request, I'm expecting a request to make some sort of change to a puppy.
router.put('/puppies/:id', function(req, res, next) {

    if (req.body.name && req.body.age) {
        puppies.splice(req.params.id, 1, req.body);
        res.send(puppies[req.params.id]);
    } else {
        res.send("A PUT request requires a wholistic update", 400);
    }
    // accessing the puppies array by index and replacing what's at that index with what's in the request body

});

router.patch('/puppies/:id', function(req, res, next) {
    // what to replace
    var currentPuppy = puppies[req.params.id - 1];
    if (!currentPuppy) {
        res.send("Not Found", 404);
    }
    for (var key in req.body) {
        if (currentPuppy[key]) {
            currentPuppy[key] = req.body[key];
        }
    }
     res.json(currentPuppy);


});

module.exports = router;

