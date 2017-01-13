import { JSWLogger } from "./src/JSW-Logger";

try {
    if (window) {
        window["JSWLogger"] = JSWLogger;// Logger.default;
    }
} catch(e) { /* window not found -> not a browser environment */ }

export { JSWLogger };