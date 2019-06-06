/*
  brainfJSk
  Adam Soutar

  https://github.com/Adybo123
  MIT License
*/

/* INSTANCE - Handles memory and all instructions bar loops */
class BFInstance {
  constructor () {
    this.memory = [0]
    this.pointer = 0
  }

  right () {
    this.pointer++
    if (this.pointer === this.memory.length) {
      this.memory.push(0)
    }
  }
  left () {
    this.pointer--
    if (this.pointer === -1) {
      this.memory = [0].concat(this.memory)
      this.pointer = 0
    }
  }

  increment () {
    this.memory[this.pointer]++
  }
  decrement () {
    this.memory[this.pointer]--
  }

  getCellAscii () {
    return String.fromCharCode(this.memory[this.pointer])
  }
  setCellAscii (setChar) {
    this.memory[this.pointer] = setChar.charCodeAt(0)
  }

  getCellValue () {
    return this.memory[this.pointer]
  }
  setCellValue (setInt) {
    this.memory[this.pointer] = setInt
  }
}

/* INTERPRETER - Handles string interpreting and loops */
class BFInterpreter {
  constructor (outFunc, inFunc) {
    this.instance = new BFInstance()
    this.outFunc = outFunc
    this.inFunc = inFunc
    this.instructions = []
    this.insPointer = 0
  }

  executeInstructions (inString) {
    this.instructions = inString.split('')
    this.insPointer = 0
    while (this.insPointer < this.instructions.length) {
      this.doInstruction(this.instructions[this.insPointer])
      this.insPointer++
    }
  }

  findLoopClose () {
    // Finds ]
    var ignore = 0
    for (let i = this.insPointer + 1; i < this.instructions.length; i++) {
      var ch = this.instructions[i]
      if (ch === ']') {
        if (ignore === 0) {
          return i
        } else {
          ignore--
        }
      }
      if (ch === '[') {
        ignore++
      }
    }
    return false
  }
  findLoopOpen () {
    // Finds [
    var ignore = 0
    for (let i = this.insPointer - 1; i > -1; i--) {
      var ch = this.instructions[i]
      if (ch === '[') {
        if (ignore === 0) {
          return i
        } else {
          ignore--
        }
      }
      if (ch === ']') {
        ignore++
      }
    }
    return false
  }
  
  startLoop () {
    if (this.instance.getCellValue() === 0) {
      const closeLoop = this.findLoopClose()
      if (closeLoop) {
        this.insPointer = closeLoop
      } else {
        throw new Error('BRAINFJSK - JMP to end of loop without closing ]!')
      }
    }
  }
  endLoop () {
    if (this.instance.getCellValue() !== 0) {
      const startLoop = this.findLoopOpen()
      if (startLoop) {
        this.insPointer = startLoop
      } else {
        throw new Error('BRAINFJSK - JMP back to start of loop without starting [!')
      }
    }
  }

  doInstruction (insChar) {
    // These are all in lambdas to circumvent 'this' changing parent
    const instructionTable = {
      '+': () => { this.instance.increment() },
      '-': () => { this.instance.decrement() },
      '<': () => { this.instance.left() },
      '>': () => { this.instance.right() },
      '[': () => { this.startLoop() },
      ']': () => { this.endLoop() },
      '.': () => { this.outFunc(this.instance.getCellAscii()) },
      ',': () => { this.instance.setCellAscii(this.inFunc()) }
    }
    if (Object.keys(instructionTable).indexOf(insChar) !== -1) {
      instructionTable[insChar]()
    }
  }
}
