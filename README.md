jquery.pixie.js
===============

Sprite Based Animation Plugin for JQuery

Example Usage:

```javascript
var pixie_var;
window.addEventListener('load',function(){
  var anim = {
    container:"id of container",
    frame_size:{
      height:200,
      width:200
    },
    sprite_sheet:{
      url:"url to sprite sheet image",
      height:1200,
      width:1000
    }
  };
  pixie_var = new Pixie({animation:anim,start:true,speed:(1000/30)});
});
```