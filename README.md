# JSW-Logger

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/bf9e52282bc34265bf583d9c458d97f9)](https://www.codacy.com/app/eastolfi/JSW-Logger?utm_source=github.com&utm_medium=referral&utm_content=EastolfiWebDev/JSW-Logger&utm_campaign=badger)

Javascript logging module which writes in the console all warnings and erros

[![Package Version][npm-image]][npm-url]
[![NodeJS Version][node-image]][node-url]

[![Linux Build][travis-image]][travis-url]
[![Windows Build][appveyor-image]][appveyor-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][npm-url]
[![Documentation Status][docs-image]][docs-url]

# Installation
```shell
npm install --save jsw-logger
```
----------
# Usage
Currently, JSW-Logger can be used within a TypeScript based project, as a node dependency or directly in the browser.

## Declaration:
First we need to import the dependency:

### Typescript
```ts
import { JSWLogger } from "jsw-logger";
```

### Node JS
```js
var JSWLogger = require("jsw-logger").JSWLogger;
```

### Browser
```html
<script src="path/to/deps/dist/jsw-logger.min.js"></script>
<!-- This exposes a global "JSWLogger" variable -->
```

## Instantiating
We can instanciate the logger passing a bunch of options:
```js
var Logger = JSWLogger.getInstance({
    level: 2,   // logs "info", "warn" and "error" by default
    hideAllLogs: false, // hides messsages from being logged
    hideLevelLog: false,    // hides the "LOG: " from the begining of the message
    throwError: true   // throw an error when "Logger.throw"
});
```
Or we can retrieve the instance with the options by default:
```js
var Logger = JSWLogger.instance;
```
Also, the options can only by setted when instantiating with the first way. 
To change them, we should access the options object: `Logger.options.throwError = false`
Or we can drop the instance so we can regenerate it: `JSWLogger.__dropInstance()`
>Note that as this is a singleton (can only be instantiated once), so if you drop the instance, it will be dropped for all

## Logging
The level logging hierarchy is as follows:

| Name    | Level | Method             | Uses                                                      |
|---------|-------|--------------------|-----------------------------------------------------------|
| Silly   | 6     | Logger.silly       | Some dummy logs, less relevants than a debug              |
| Debug   | 5     | Logger.debug       | For debugging purposes                                    |
| Verbose | 4     | Logger.verbose     | For extended log messages                                 |
| Log     | 3     | Logger.log         | The standar logging                                       |
| Info    | 2     | Logger.info        | To show relevant information messages                     |
|         |       | Logger.inform      | Works as an alias for "info"                              |
|         |       | Logger.information | Worksas an alias for "info"                               |
| Warn    | 1     | Logger.warn        | To show application warnings                              |
|         |       | Logger.warning     | Works as an alias for "warn"                              |
| Error   | 0     | Logger.error       | To output error generated by the application              |
|         |       | Logger.throw       | Same as "error", but throws an Exception is configured to |

The lower we set the level whe instanciating, the less methods will output something. Eg.:
```js
Logger.debug("Not shown"); // -> outputs nothing, as the default is log (2)
Logger.info("Some informative message"); // -> INFO: Some informative message
// Can use interpolation
Logger.warn("Be careful %s!", "Ryan"); // -> WARN: Be careful Ryan!
Logger.error("Line %d doesn't compile", 562); // -> ERROR: Line 562 doesn't compile
```
----------
# License

MIT

[mongo-db-command]: https://docs.mongodb.com/manual/reference/command/

[API-MongoPortable]: https://github.com/EastolfiWebDev/MongoPortable/blob/master/api/MongoPortable.md
[API-Collection]: https://github.com/EastolfiWebDev/MongoPortable/blob/master/api/Collection.md
[API-Cursor]: https://github.com/EastolfiWebDev/MongoPortable/blob/master/api/Cursor.md

[Module-FileSystemStore]: https://github.com/EastolfiWebDev/FileSystemStore
[API-FileSystemStore]: https://github.com/EastolfiWebDev/FileSystemStore/blob/master/api/FileSystemStore.md

[npm-image]: https://img.shields.io/npm/v/jsw-logger.svg?label=Package%20Version
[npm-url]: https://www.npmjs.com/package/jsw-logger
[node-image]: https://img.shields.io/badge/node-v4.4.0-blue.svg?label=Node%20Version
[node-url]: https://nodejs.org/en/
[travis-image]: https://img.shields.io/travis/EastolfiWebDev/JSW-Logger.svg?label=linux
[travis-url]: https://travis-ci.org/EastolfiWebDev/JSW-Logger
[appveyor-image]: https://img.shields.io/appveyor/ci/eastolfi/jsw-logger/master.svg?label=windows
[appveyor-url]: https://ci.appveyor.com/project/eastolfi/jsw-logger
[coveralls-image]: https://coveralls.io/repos/github/EastolfiWebDev/JSW-Logger/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/EastolfiWebDev/JSW-Logger?branch=master
[downloads-image]: https://img.shields.io/npm/dt/jsw-logger.svg
[docs-image]: https://readthedocs.org/projects/jsw-logger/badge/?version=latest
[docs-url]: http://jsw-logger.readthedocs.io/en/latest/?badge=latest