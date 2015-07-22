var prompt = require('prompt');

var MAX_WATER_COUNT = 4;
var MAX_FEED_COUNT  = 4;
var MAX_HEIGHT = 12;

function Plant() {
  this.plant = this;
  this.isSeed = true;
  this.isPlant = false;
  this.currentHeight = 0;
  this.fedCount = 0;
  this.waterCount = 0;
  this.flowers = 0;
  this.inSun = false;
  this.isDead = false;
};

Plant.prototype.water= function(callback) {
  if (this.isSeed) {
    this.isSeed = false;
    this.isPlant = true;
    this.waterCount += 1;
    console.log('\n' + this.name + ' is now a plant!\n');
    callback(this.isDead, this.plant);
  } else {
    this.waterCount += 1;
    if (this.waterCount > 4) {
      this.antiFreeze(callback);
    } else{
      this.currentHeight += 2;
      this.checkHeight(callback);
    }
  }
};

Plant.prototype.feed= function(callback) {
  if (this.isPlant) {
    this.currentHeight += 1;
    this.fedCount += 1;
    if(this.fedCount > 4) {
      this.antiFreeze(callback);
    } else {
      this.checkHeight(callback);
    }
  } else {
    console.log('You can\'t feed the plant yet because it is still a seed! Water it first so it can become a plant. THEN you can feed it :-)');
    callback(this.isDead, this.plant);
  }
};

Plant.prototype.giveSun= function(callback) {
  this.flowers += 1;
  callback(this.plant);
};

Plant.prototype.giveShade= function(callback) {
  if(this.flowers > 0) {
    this.flowers -= 1;
  } else {
  this.flowers = 0;
  }
  callback(this.plant);
};

Plant.prototype.antiFreeze= function(callback) {
  this.isDead = true;
  callback(this.isDead, this.plant);
};

Plant.prototype.checkHeight= function(callback) {
  if(this.currentHeight > MAX_HEIGHT) {
    this.isDead = true;
    callback(this.isDead, this.plant);
  } else {
    this.isDead = false;
    console.log('\n'+ this.name + ' is now ' + this.currentHeight + ' inches tall\n');
    callback(this.isDead, this.plant);
  }
};

module.exports = Plant;
