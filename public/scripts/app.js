// All methods for your app you want protected go here
var app = {
  
  copyAPI: function() {
    var iframe = document.getElementById("canvas-iframe").contentWindow;

    // Copy api object to the iframe
    iframe.api = api;

    // Convert api.move() to move() etc
    for (key in api) {
      iframe[key] = api[key];
    }

    // Prevent access to parent objects and their methods
    iframe.api = "";
    iframe.window.parent = "";
  },

  injectJS: function() {
    var iframe = document.getElementById("canvas-iframe").contentWindow;

    // Execution of move() will work
    iframe.move();

    // Execution of privateMethod() will work
    iframe.privateMethod();

    // Execution of app.privateMethod will fail
    iframe.app.privateMethod();
    
    // Execution of app.privateMethod from the parent global will fail
    iframe.parent.app.privateMethod();
  },

  startApp: function() {
    var iframe = document.getElementById('canvas-iframe');

    // Copy API to iframe and remove parent access
    app.copyAPI();

    // Simulation of injected js
    app.injectJS();

    // Recopy API and remove parent in the event user refreshes
    iframe.addEventListener('onload', function() {  
      app.copyAPI();
    });
  },

  privateMethod: function() {
    console.log('Private! You cant call me directly!');
  }

};

// Start the app
app.startApp();