# brainfJSk

_A brainf@?k interpreter in JavaScript_

### Usage

###### Create the interpreter, and assign an input and output function

```js
var bfI = new BFInterpreter(console.log, prompt)
```

###### Pass it a program as a string

```js
bfI.executeInstructions("++<+-")
```

###### Bonus step - inspecting memory:
  
The memory is held at ```bfI.instance.memory``` as a standard, one dimensional list.

### But... why?

Brainf@?k is a fully turing complete language. You could write absolutely anything in it... theoretically.
Here's a thing: why not write a JS interpreter in brainfJSk, and acheive language recursion?
