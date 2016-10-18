<a name="Logger"></a>

## Logger
Logging module singleton which inherits the Winston Logger module.
         By default: 
             <ol>
                 <li>Writes all the HANDLED exceptions under a log file in "logs/handledException.log"</li>
                 <li>Writes in the console all warnings and erros</li>
             </ol>

**Kind**: global class  
**Since**: 1.0.0  

* [Logger](#Logger)
    * [new Logger(enforcer, [options])](#new_Logger_new)
    * _instance_
        * [.throw(error, [throwError])](#Logger+throw)
    * _static_
        * [.instance](#Logger.instance) ⇒ <code>[Logger](#Logger)</code>
        * [.getInstance([options])](#Logger.getInstance) ⇒ <code>[Logger](#Logger)</code>
        * [.__dropInstance()](#Logger.__dropInstance)

<a name="new_Logger_new"></a>

### new Logger(enforcer, [options])
Logger


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| enforcer | <code>Symbol</code> |  | Enforcer internal object to avoid instanciating as "new Logger()" |
| [options] | <code>Object</code> |  | Additional options |
| [options.hideAllLogs] | <code>Boolean</code> | <code>false</code> | When set to true hides all logs (usefull when running tests) |
| [options.throwError] | <code>Boolean</code> | <code>true</code> | Whether if throw an exception when logged trought the Logger#throw method |

<a name="Logger+throw"></a>

### logger.throw(error, [throwError])
Method to throw a controlled exception, logging it to a log file.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| error | <code>Error</code> &#124; <code>String</code> |  | The exception or message to be thrown. |
| [throwError] | <code>Boolean</code> | <code>true</code> | Same as Logger->options->throwError |

<a name="Logger.instance"></a>

### Logger.instance ⇒ <code>[Logger](#Logger)</code>
Retrieves the current singleton instance, creating a new one if needed.

**Kind**: static property of <code>[Logger](#Logger)</code>  
**Returns**: <code>[Logger](#Logger)</code> - this - The singleton Instance  
<a name="Logger.getInstance"></a>

### Logger.getInstance([options]) ⇒ <code>[Logger](#Logger)</code>
Retrieves the current singleton instance, creating a new one if needed. 
It allows, when creating the first time, a set of options. Otherwise, it will return the singleton instance

**Kind**: static method of <code>[Logger](#Logger)</code>  
**Returns**: <code>[Logger](#Logger)</code> - this - The singleton Instance  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | Additional options. See [Logger#constructor](Logger#constructor) |

<a name="Logger.__dropInstance"></a>

### Logger.__dropInstance()
Destroy the current singleton instance

**Kind**: static method of <code>[Logger](#Logger)</code>  
