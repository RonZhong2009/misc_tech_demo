# misc_tech_demo


# Basic concepts you need to know
## javascript engine V8
The most popular js engine is V8 which developed by Google.
For example, Chrome and node.js adopt V8 as the javascript engine.
It consists of two major components.
* memory heap
* call stack

## Runtime (APIs)
In runtime, there will be two group APIs called in javascript engine.
* The Javascript engine built-in API
* The named "WEB API" provided by Browser


      ** DOM (document)
      ** ajax(XMLHttpRequest)
      ** Timeout(settimeout)
Besides that, in runtime,
Browser? also gives two other critical components.

      **Event Loop
      **Callback Queue
## callstack frame
not too much to say, just like the same as c/cpp.
## concurrent and event loop
It will be easy to understand with Promises API.
Seems JS engine only take the control of the execution of the code blocks
(see them as "funtions"), it will build up the host environment for the 
code blocks, and execute the code blocks in the callstack frames.BUT the event 
loop and callback queue, outside the JS engine control will determine which 
callback funtion and when will be placed into the callstack frame.

    callback hell=>Promises =>async/await 


websocket is based on long time tcp connection ?
# Why We need websocket ?Pros and cons 
