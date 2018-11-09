/* This is all the basic code you need to run brainfJSk! */ 

function execBF () {
  document.getElementById('codeOutput').innerHTML = ""
  var bfI = new BFInterpreter(
    (str) => {
      document.getElementById('codeOutput').innerHTML += str
    },
    () => {
      return prompt('Enter char')
    })
  var program = document.getElementById('codeIn').value
  bfI.executeInstructions(program)
  console.dir(bfI.instance.memory)
}
