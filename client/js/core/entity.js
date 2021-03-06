define(['core/sprite'], function(Sprite) {
  var Entity = Class.extend({
    init: function(game, sprite, x, y) {
      this.game = game;
      this.sprite = sprite;
      this.direction = new Vector(0,0);
      this.speed = new Vector(0,0);
      this.isCollidable = true;
      
      this.position(0, 0);
    },
    
    position: function(x, y) {
      if (arguments.length <= 0) {
        return [this.x, this.y];
      }
      
      this.x = Math.max(+x || 0, 0);
      this.y = Math.max(+y || 0, 0);
      
      this.screenX = this.x - this.game.viewport.x;
      this.screenY = this.y - this.game.viewport.y;
      
      return this;
    },
    
    move: function(x, y) {
      return this.position(this.x + x, this.y + y);
    },
    
    isAlive: function() {
      return !!this.alive;
    },
     
    distanceToEntity: function(entity) {
      var distX = Math.abs(entity.gridX - this.gridX);
      var distY = Math.abs(entity.gridY - this.gridY);

      return Math.sqrt(distX * distX + distY * distY);
    },
    
    invisible: function() {
      this.opacity = 0;
      
      return this;
    },
    
    isVisible: function() {
      return this.opacity <= 0;
    },
    
    render: function(renderer) {
      renderer.render(this.sprite, this.x, this.y);
    },
    
    update: function() {
      
    },
    
    translate: function() {
      
    }
    
  });
  
  return Entity;
});
