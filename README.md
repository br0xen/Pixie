Example usage:

var anim={
  container:"jquery selector",
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

$("selector").pixie({animation:anim,start:true,speed:(1000/30)});