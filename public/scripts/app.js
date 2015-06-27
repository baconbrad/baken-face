// All methods for your app you want protected go here
var app = {

  startApp: function() {
    var iframe = document.getElementById('canvas-iframe');

    // Copy API to sandbox and remove parent access
    app.copyAPI(iframe);

    // Simulation of injected js
    app.injectJS(iframe);

    // Recopy API and remove parent in the event user refreshes
    iframe.addEventListener('onload', function() {  
      app.copyAPI(iframe);
    });
  },

  copyAPI: function(iframe) {
    var sandbox = iframe.contentWindow;

    // Copy api object to the sandbox
    sandbox.api = api;

    // Convert api.move() to move() etc
    for (key in api) {
      sandbox[key] = api[key];
    }

    // Prevent access to parent objects and their methods
    sandbox.api = "";
    sandbox.window.parent = "";
  },

  injectJS: function(iframe) {
    var sandbox = iframe.contentWindow;

    // Execution of move() will work
    sandbox.move();

    // Execution of privateMethod() will work
    sandbox.privateMethod();

    // Execution of app.privateMethod will fail
    sandbox.app.privateMethod();
    
    // Execution of app.privateMethod from the parent global will fail
    sandbox.parent.app.privateMethod();
  },

  privateMethod: function() {
    console.log('Private! You cant call me directly!');
  }

};

// Start the app
app.startApp();