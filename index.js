"use strict";
var JSW_Logger_1 = require("./src/JSW-Logger");
exports.JSWLogger = JSW_Logger_1.JSWLogger;
try {
    if (window) {
        window["JSWLogger"] = JSW_Logger_1.JSWLogger; // Logger.default;
    }
}
catch (e) { }

//# sourceMappingURL=index.js.map
