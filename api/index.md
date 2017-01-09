## Classes

<dl>
<dt><a href="#Logger">Logger</a></dt>
<dd><p>Logging module singleton which inherits the Winston Logger module.
         By default:
             <ol>
                 <li>Writes all the HANDLED exceptions under a log file in &quot;logs/handledException.log&quot;</li>
                 <li>Writes in the console all warnings and erros</li>
             </ol></p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#get">get()</a> ⇒ <code><a href="#Logger">Logger</a></code></dt>
<dd><p>Retrieves the current singleton instance, creating a new one if needed.</p>
</dd>
</dl>

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
    * [.throw(error, [throwError])](#Logger+throw)

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

<a name="get"></a>

## get() ⇒ <code>[Logger](#Logger)</code>
Retrieves the current singleton instance, creating a new one if needed.

**Kind**: global function  
**Returns**: <code>[Logger](#Logger)</code> - this - The singleton Instance  
