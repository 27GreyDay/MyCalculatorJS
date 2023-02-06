const numbers = document.querySelectorAll(".number")
const result = document.querySelector(".result span")
const signs = document.querySelectorAll(".sign")
const equals = document.querySelector(".equals")
const allClear = document.querySelector(".all_clear")
const clear = document.querySelector(".clear")
const negative = document.querySelector(".negative")
const percent = document.querySelector(".percent")

let firstValue = ""
let isFirstValue = false
let secondValue = ""
let isSecondValue = false
let sign = ""
let resultValue = 0

if(localStorage.getItem('theme') == 'true') {
    document.body.setAttribute('dark', '')
}

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', () => {
        let atr = numbers[i].innerHTML
        if (isFirstValue == false && firstValue.length <= 7) {
            getFirstValue(atr)
        }
        if (isSecondValue == false && secondValue.length <= 7) {
            getSecondValue(atr)
        }
    })
}
function getFirstValue(el) {
    result.innerHTML = ""
    firstValue += el
    result.innerHTML = firstValue
}
function getSecondValue(el) {
    if (firstValue != "" && sign != "") {
        secondValue += el
        result.innerHTML = secondValue
    }
}

function getSign() {
    for (let i = 0; i < signs.length; i++) {
        signs[i].addEventListener('click', () => {
            sign = signs[i].innerHTML
            isFirstValue = true
        })
    }
}
getSign();

equals.addEventListener('click', () => {
    result.innerHTML = ""
    secondValue = +secondValue
    firstValue = +firstValue
    if (sign == "+") {
        resultValue = firstValue + secondValue
    } else if (sign == "-") {
        resultValue = firstValue - secondValue
    } else if (sign == "÷") {
        resultValue = firstValue / secondValue
    } else if (sign == "✖") {
        resultValue = firstValue * secondValue
    } 
    result.innerHTML = resultValue
    firstValue = resultValue
    secondValue = ""
    checkResultLength()
})

function checkResultLength() {
    resultValue = JSON.stringify(resultValue)
    if (resultValue.length >= 8) {
        resultValue = JSON.parse(resultValue)
        result.innerHTML = +resultValue.toFixed(5)
    }
}

negative.addEventListener('click', () => {
    result.innerHTML = ""
    if (firstValue != "") {
        resultValue = -firstValue 
        firstValue = resultValue
    }
    if (isFirstValue != "" && secondValue != "" && sign != "") {
        resultValue = -resultValue
    }
    result.innerHTML = resultValue
})

percent.addEventListener('click', () => {
    result.innerHTML = ""
    if (firstValue != "") {
        resultValue = firstValue / 100
        firstValue = resultValue
    }
    if (isFirstValue != "" && secondValue != "" && sign != "") {
        resultValue = resultValue / 100
    }
    result.innerHTML = resultValue
})

allClear.addEventListener('click', () => {
    result.innerHTML = 0
    firstValue = ""
    isFirstValue = false
    secondValue = ""
    isSecondValue = false
    sign = ""
    resultValue = 0
})
// Тема
function dark() {
    localStorage.setItem('theme', true)
    document.body.setAttribute('dark', '')
}
function shining() {
    localStorage.setItem('theme', false)
    document.body.removeAttribute('dark')
}