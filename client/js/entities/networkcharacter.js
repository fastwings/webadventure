define(['subsystems/keyboardhandler', 'entities/character', 'core/sprite', 'core/vector'], function(Keyboardhandler, Character, Sprite, Vector) {
  var NetworkCharacter = Character.extend({
    init: function(game, sprite, x, y, isAlive, id ) {
      this.game = game;
      this.sprite = sprite;
      this.x = +x || 0;
      this.y = +y || 0;
      this.width = sprite.width;
      this.height = sprite.height;
      this.direction = new Vector(0,0);
      this.speed = new Vector(5,5);
      
      // chareacter
      this.isAlive = isAlive;
      
      //network character     
      this.userId = id || '';
      this.nextPosition = new Vector;
      this.timeStamp = 0;
      this.nextTimeStamp = 0;
      this.direction = new Vector;
      this.nextDirection = new Vector;
    },
    
    networkUpdate: function(network) {
      /*this.nextPosition = networkData.position;
      this.nextTimeStamp = networkData.timeStamp;
      this.nextDirection = networkData.direction;*/
    },
    
    update: function() {
      // interpolate
      var delataT = this.nextTimeStamp - this.timeStamp, 
          deltaX = this.nextPosition.x - this.position.x,
          deltaY = this.nextPosition.y - this.position.y,
          interpolation = 0.1 * delataT;
    
      this.timeStamp = this.nextTimeStamp;
      this.position.x += deltaX * interpolation;
      this.position.y += deltaY * interpolation;      
    },
    
    translate: function(physics) {
      // TODO: predict next position
    }
  });
  
  return NetworkCharacter ;
});
