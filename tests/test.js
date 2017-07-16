
var configuration = require("./config.json");
var flexibee = require('../src/FlexiBeeRO.js');
flexibee.configure(configuration);

flexibee.printBanner();

flexibee.getContent('/status.json')
        .then((html) => console.log(html))
        .catch((err) => console.error(err));


console.log(flexibee);
