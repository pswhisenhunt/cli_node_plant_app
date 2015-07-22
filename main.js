var prompt = require('prompt');
var Plant = require('./plant.js');

var MAX_WATER_COUNT = 4;
var MAX_FEED_COUNT  = 4;
var MAX_HEIGHT = 12;

function startPlant(plant) {
  prompt.start();
  prompt.message = "What is your plant's name?";
  prompt.addProperties(plant, ['name'], function (err) {
    plant.name = plant.name.toUpperCase();
    console.log("New seed ".cyan + plant.name.rainbow + " has been planted!!".cyan);
    displayMenu(plant);
  });
};

function displayMenu(plant) {
  var menu = "\nPlease Enter\nW to water " + plant.name + " \nF to feed " + plant.name  +
   "\nT to terminate " +  plant.name + "\nS to put " + plant.name + " in the sun\nNS to remove " +
   plant.name + " from the sun\n";

   prompt.message = menu;
   prompt.start();

   prompt.get(['question'], function(err, result) {
     var self = this;
     if(result.question.toUpperCase() === "W") {
       plant.water(function(isDead, plant) {
         if (isDead) {
           if (plant.currentHeight > MAX_HEIGHT) {
            console.log('\n OH NO!! ' + plant.name + ' cannot be taller than ' + MAX_HEIGHT + '. The plant is dead!');
           }
           if (plant.waterCount > 4) {
             console.log('\n' + plant.name + ' is dead because you waterd it more than 4 times!');
           }
         } else {
            displayMenu(plant);
         }
       });
     }
     else if(result.question.toUpperCase() === "F") {
       plant.feed(function(isDead, plant) {
         if (isDead) {
           console.log('\n' + plant.name + ' is dead! You fed it more than 4 times!');
         } else {
           displayMenu(plant);
         }
       });
     }
     else if(result.question.toUpperCase() === "T") {
       plant.antiFreeze(function(isDead, plant){
         if (isDead) {
           console.log('\n OH NO!! ' + plant.name + ' is dead! You chose AntiFreeze!');
         }
       });
     }
     else if(result.question.toUpperCase() === "S") {
       plant.giveSun(function(plant) {
         console.log('\n' + plant.name + ' now has ' + plant.flowers + ' flower(s)\n');
         displayMenu(plant);
       });
     }
     else if(result.question.toUpperCase() === "NS") {
       plant.giveShade(function(plant) {
         console.log('\n' + plant.name + ' now has ' + plant.flowers + ' flower(s)\n');
         displayMenu(plant);
       });
     }
     else {
       displayMenu(plant);
     }
  });
};

var plant = new Plant();
startPlant(plant);
