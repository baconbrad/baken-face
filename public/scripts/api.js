// All api you want avaliable for your users goes here
var api = {
  
  move: function() {
    console.log('moved');
  },
  
  jump: function() {
    console.log('jump');
  },
  
  fire: function() {
    console.log('fire');
  },
  
  // Example of letting user api access protected methods correctly
  privateMethod: function() {
    app.privateMethod();
  }

};