define(['subsystems/renderer', 'subsystems/physics', 'core/entity', 'core/viewport', 'entities/tilemap'], function(Renderer, Physics, Entity, Viewport, TileMap) {
    
  var Game = Class.extend({
    init: function() {
      var canvas = document.getElementById('canvas');
      
      this.entities = [];
      this.fps = 30;
      
      this.tileMap = new TileMap(50, 50);
      
      this.viewport = new Viewport(canvas.width, canvas.height, this.tileMap.height * this.tileMap.tileHeight, this.tileMap.width * this.tileMap.tileWidth);
      
      this.initRenderer(canvas);
      this.initPhysics();
    },
        
    initRenderer: function(canvas) {
      this.renderer = new Renderer(canvas, this.viewport);
    },
    
    initPhysics: function() {
      this.physics = new Physics();
    },
    
    draw: function(interpolation) {
      var renderer = this.renderer;
      
      //renderer.clear();
      
      this.tileMap.render(renderer);
      
      for (var i = 0, entity; entity = this.entities[i]; i++) {
        entity.render(renderer);
      }
    },
    
    update: function () {
      this.physics.translate(this.entities);
    },
    
    run: function() {
      var loops = 0, 
          skipTicks = 1000 / this.fps,
          maxFrameSkip = 10,
          nextGameTick = Game.localTime = window.perfNow(),
          lastGameTick,
          that = this,
          tick = function() {
            loops = 0;
        
            while (window.perfNow() > nextGameTick) {
              that.update();
              nextGameTick += skipTicks;
              loops++;
            }
        
            if (!loops) {
              that.draw((nextGameTick - window.perfNow()) / skipTicks);
            } else {
              that.draw(0);
            }
            
            window.requestAnimationFrame(tick);
          };
          
      window.requestAnimationFrame(tick);
    },

    getTime: function() {
      return Game.localTime;
    }
  });
  
  return Game;
});