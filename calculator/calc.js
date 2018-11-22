const element = (el) => {
    return document.querySelector(`${el}`)
}

// VARIABLES    =====================================================================================================

const screen = element('.screen span')
const ac = element('#ac')
const point = element('#point')
const operators = [
    negative = element('#negative'),
    percent = element('#percent'),
    divide = element('#divide'),
    mult = element('#mult'),
    minus = element('#minus'),
    plus = element('#plus'),
    equal = element('#equal')
]
const numbers = [
    zero = element('#zero'),
    one = element('#one'),
    two = element('#two'),
    three = element('#three'),
    four = element('#four'),
    five = element('#five'),
    six = element('#six'),
    seven = element('#seven'),
    eight = element('#eight'),
    nine = element('#nine')
]

let resultStr = ''
let var1Str = ''
let var2Str = ''
let op = ''
let screenUpdate = '0'
let typeStr = 1
let var1 = Number(var1Str)
let var2 = Number(var2Str)

// FUNCTIONS    =====================================================================================================

const numBtns = (numStr, btnNum) => {
    numStr.addEventListener('click', (e) => {
        if (screenUpdate.length < 9) {
            if (typeStr === 1) {
                var1Str += `${btnNum}`
                if (screenUpdate.charAt(0) === '0') {
                    const temp = screenUpdate.slice(1)
                    screenUpdate = temp
                    screenUpdate += `${btnNum}`
                } else {
                    screenUpdate += `${btnNum}`
                }
            } else if (typeStr === 2) {
                var2Str += `${btnNum}`
                if (screenUpdate.charAt(0) === '0') {
                    const temp = screenUpdate.slice(1)
                    screenUpdate = temp
                    screenUpdate += `${btnNum}`
                } else {
                    screenUpdate += `${btnNum}`
                }
            }
            let screenTemp = Number(screenUpdate)
            screen.textContent = screenTemp.toLocaleString()
        }
    })
}

const calculate = () => {
    if (op === '+') {
        resultStr = var1 + var2
    } else if (op === '-') {
        resultStr = var1 - var2
    } else if (op === '*') {
        resultStr = var1 * var2
    } else if (op === '/') {
        resultStr = var1 / var2
    } else if (op === '%') {
        resultStr = var1 / 100
    }
}

const operationBtns = (operator, operatorStr) => {
    screenUpdate = '0'
    if (var2Str === '') {
        typeStr = 2
        op = operator
    }
    var1 = Number(var1Str)
    screen.textContent = screenUpdate
    operatorStr.classList.add('oranged')
}


const animation = (el, btnColor) => {
    el.addEventListener('mousedown', () => {
        el.classList.add(`${btnColor}`)
    })
    el.addEventListener('mouseup', () => {
        el.classList.remove(`${btnColor}`)
    })
}

const reset = () => {
    resultStr = ''
    var1Str = ''
    var2Str = ''
    op = ''
    var1 = Number(var1Str)
    var2 = Number(var2Str)
    typeStr = 1
    screenUpdate = '0'
}

const removeOpColor = () => {
    let buttons = document.querySelectorAll('.numBtn')
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            divide.classList.remove('oranged')
            mult.classList.remove('oranged')
            minus.classList.remove('oranged')
            plus.classList.remove('oranged')
        })
    });
}

const cut = (str, cutStart) => {
    return str.substring(0, cutStart) + str.substring(resultLength - 4)
}

// EVENT LISTENERS    =====================================================================================================

ac.addEventListener('click', (e) => {
    reset()
    screen.textContent = screenUpdate
})

negative.addEventListener('click', (e) => {
    if (typeStr === 1) {
        if (var1Str.charAt(0) !== '-') {
            var1Str = '-' + var1Str
        } else if (var1Str.charAt(0) === '-') {
            var1Str = var1Str.slice(1)
        }
        screenUpdate = var1Str
        screen.textContent = screenUpdate
    } else if (typeStr === 2) {
        if (var2Str.charAt(0) !== '-') {
            var2Str = '-' + var2Str
        } else if (var2Str.charAt(0) === '-') {
            var2Str = var2Str.slice(1)
        }
        screenUpdate = var2Str
        screen.textContent = screenUpdate
    }
})

percent.addEventListener('click', (e) => {
    op = '%'
    var1 = Number(var1Str)
    calculate()
    screen.textContent = resultStr
})

divide.addEventListener('click', (e) => {
    operationBtns('/', divide)
})

mult.addEventListener('click', (e) => {
    operationBtns('*', mult)
})

minus.addEventListener('click', (e) => {
    operationBtns('-', minus)
})

plus.addEventListener('click', (e) => {
    operationBtns('+', plus)
})

equal.addEventListener('click', (e) => {
    var2 = Number(var2Str)
    calculate()
    if (resultStr > 999999999) {
        resultStr = resultStr.toExponential()
        resultLength = resultStr.length
        resultStr = cut(resultStr, 5)
    }
    screen.textContent = resultStr.toLocaleString()
    reset()
})

point.addEventListener('click', (e) => {
    if (typeStr === 1) {
        if (var1Str.includes('.') !== true) {
            var1Str += '.'
        } else if (var1Str.includes('.') === true) {
            return
        }

        screenUpdate += '.'
    } else if (typeStr === 2) {
        var2Str += '.'
        screenUpdate += '.'
    }
    screen.textContent = screenUpdate
})

screen.textContent = screenUpdate

// FUNCTION CALLS    =====================================================================================================

numBtns(zero, 0)
numBtns(one, 1)
numBtns(two, 2)
numBtns(three, 3)
numBtns(four, 4)
numBtns(five, 5)
numBtns(six, 6)
numBtns(seven, 7)
numBtns(eight, 8)
numBtns(nine, 9)

animation(zero, 'greyed')
animation(point, 'greyed')
animation(one, 'greyed')
animation(two, 'greyed')
animation(three, 'greyed')
animation(four, 'greyed')
animation(five, 'greyed')
animation(six, 'greyed')
animation(seven, 'greyed')
animation(eight, 'greyed')
animation(nine, 'greyed')
animation(ac, 'whited')
animation(negative, 'whited')
animation(percent, 'whited')
animation(equal, 'oranged')

removeOpColor()

// Op btns remove color when clicked
// 3 number operatations