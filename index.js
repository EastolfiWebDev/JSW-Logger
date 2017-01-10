"use strict";
var JSW_Logger_1 = require("./src/JSW-Logger");
try {
    if (window) {
        window["JSWLogger"] = JSW_Logger_1.JSWLogger; // Logger.default;
    }
}
catch (e) { }
module.exports = JSW_Logger_1.JSWLogger;

//# sourceMappingURL=index.js.map
