## Classes

<dl>
<dt><a href="#JSWLogger">JSWLogger</a></dt>
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
<dt><a href="#get">get()</a> ⇒ <code><a href="#JSWLogger">JSWLogger</a></code></dt>
<dd><p>Retrieves the current singleton instance, creating a new one if needed.</p>
</dd>
</dl>

<a name="JSWLogger"></a>

## JSWLogger
Logging module singleton which inherits the Winston Logger module.
         By default:
             <ol>
                 <li>Writes all the HANDLED exceptions under a log file in "logs/handledException.log"</li>
                 <li>Writes in the console all warnings and erros</li>
             </ol>

**Kind**: global class  
**Since**: 1.0.0  

* [JSWLogger](#JSWLogger)
    * [new JSWLogger(enforcer, [options])](#new_JSWLogger_new)
    * [.throw(error, [throwError])](#JSWLogger+throw)

<a name="new_JSWLogger_new"></a>

### new JSWLogger(enforcer, [options])
JSWLogger


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| enforcer | <code>Symbol</code> |  | Enforcer internal object to avoid instanciating as "new JSWLogger()" |
| [options] | <code>Object</code> |  | Additional options |
| [options.hideAllLogs] | <code>Boolean</code> | <code>false</code> | When set to true hides all logs (usefull when running tests) |
| [options.throwError] | <code>Boolean</code> | <code>true</code> | Whether if throw an exception when logged trought the Logger#throw method |

<a name="JSWLogger+throw"></a>

### jswLogger.throw(error, [throwError])
Method to throw a controlled exception, logging it to a log file.

**Kind**: instance method of <code>[JSWLogger](#JSWLogger)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| error | <code>Error</code> &#124; <code>String</code> |  | The exception or message to be thrown. |
| [throwError] | <code>Boolean</code> | <code>true</code> | Same as JSWLogger->options->throwError |

<a name="get"></a>

## get() ⇒ <code>[JSWLogger](#JSWLogger)</code>
Retrieves the current singleton instance, creating a new one if needed.

**Kind**: global function  
**Returns**: <code>[JSWLogger](#JSWLogger)</code> - this - The singleton Instance  
