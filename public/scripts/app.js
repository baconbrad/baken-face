// All methods for your app you want protected go here
var app = {

  startApp: function() {
    // Create the iframe for the sandbox
    var iframe = app.createSandbox();

    // Copy API to sandbox and remove parent access
    app.copyAPI(iframe);

    // Simulation of injected js
    app.injectJS(iframe);

    // Recopy API and remove parent in the event user refreshes
    iframe.addEventListener('onload', function() {  
      app.copyAPI(iframe);
    });
  },

  createSandbox: function() {
    iframe = document.createElement("IFRAME");
    iframe.setAttribute("src", "about:blank");
    iframe.style.width = 0+"px";
    iframe.style.height = 0+"px";
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    return iframe;
  },

  copyAPI: function(iframe) {
    var sandbox = iframe.contentWindow;

    // Copy api object methods to sandbox
    // IE: parent.api.move() -> move()
    for (key in api) {
      sandbox[key] = api[key];
    }

    // Prevent access to parent objects and their methods
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