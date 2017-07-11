
var configuration = require("./config.json");
var flexibee = require('../src/index.js');
flexibee.configure(configuration);

flexibee.printMsg();

flexibee.getContent('/status.json')
  .then((html) => console.log(html))
  .catch((err) => console.error(err));
