const screen = document.querySelector('.screen'); 
const keys = document.querySelector('.btn-wrapper')
let num1 = ''; 
let num2 = ''; 
let operator = ''; 
screen.textContent = '0'; 
displayCounter = 0 ; 
let equalClickedCounter = 0; 
let resetCounter = 0; 
let operatorClickCounter = 0; 
let currentSize = window.getComputedStyle(screen)
let negative = document.getElementById('negative'); 
let decimal = document.getElementById('decimal'); 
let screenSize = currentSize.getPropertyValue('font-size')
let operatorNodeList = document.querySelectorAll('.operate')
const btnNodelist = document.querySelectorAll('button'); 
const btnArray = Array.from(btnNodelist); 


btnArray.forEach(btn => {
  btn.addEventListener('click', identifyWhichFunction)
})

function identifyWhichFunction(e){
let currentKey = e.target.dataset; 
  if (currentKey.hasOwnProperty('action')){
    switch(currentKey.action){
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':  
      operatorClickCounter++
      decimal.removeAttribute('disabled'); 
      chainOperators(); 
      storeOperator(e); 
      resetFontSize();     
      break;
    case 'equals': 
      equalClickedCounter++
      checkIfOperatorHasClassName()
      operate(num1, operator, num2)
      checkDisplayLength()
      break; 
    case 'all-clear':
      allClear()
      break; 
    case 'clear': 
      clearCurrentInput(num1, operator, num2); 
      break; 
    case 'backspace':
      console.log('hello')
      removeLastSelection(); 
      break; 
    case 'decimal': 
      handleDecimal(); 
      break; 
    case 'percent': 
    console.log('check')
      handlePercent(); 
      break; 
    case 'plus-minus': 
      insertMinus(); 
      break; 
    }
  
  } else {
    //if not an action key then a number key
    setVariables(e)
  }
  
  }
  
  function storeOperator(e){
  console.log(operatorNodeList)
   operatorNodeList.forEach(btn => {
     console.log(btn)
      if (btn.classList.contains('selected')){
        console.log(operator)
        btn.classList.remove('selected')
      }
     })
     e.target.classList.add('selected')
    operator = e.target.id
    console.log(operator)
  }


function DynamicallyMinimizeFont(){

  let currentScreen = window.getComputedStyle(screen)

  let currentFontSize = currentScreen.getPropertyValue('font-size')

  let removePx = currentFontSize.substring(-2, 2)

  if (currentFontSize <= '80px' && currentFontSize > '55px'){
    let newSize = `${removePx - 6}px`
    screen.style.fontSize = newSize

  }
  else if (currentFontSize <= '55px' && currentFontSize > '42px'){
    newSize = `${removePx - 2.5}px`

    screen.style.fontSize = newSize
  }  
  else if (currentFontSize <= '42px' && currentFontSize > '35px'){

    newSize = `${removePx - 2.0}px`
    screen.style.fontSize = newSize
  }
  else if (currentFontSize <= '35px'){

    newSize = `${removePx - .8}px`
    screen.style.fontSize = newSize

  }
  if (currentFontSize <= '27px'){

    screen.classList.add('hideOverflow')
    newSize = `${27}px`
    screen.style.fontSize = newSize

  }

}


function setVariables(e){
const targetBtn = e.target.dataset; 
let display = screen.textContent

  if (display == '0'){
    num1 = targetBtn.number 
    screen.textContent = num1
    console.log('start')
    
  } else if (operator == ''){
    num1 += targetBtn.number
    displayCounter++
    screen.textContent = num1; 

    if (displayCounter >= 11){
      console.log(displayCounter)
      DynamicallyMinimizeFont()
    }
    
  } else if (equalClickedCounter == 0){ 
    negative.removeAttribute('disabled');
    screen.textContent = num2
    screen.textContent += targetBtn.number; 
    displayCounter++; 
    num2 = screen.textContent 

    if (displayCounter >= 11){ 

      DynamicallyMinimizeFont()

    }

  } else {

    num2 += targetBtn.number; 
    screen.textContent = num2
    displayCounter++
    if (displayCounter > 11){ 
   
      DynamicallyMinimizeFont()
      
    }
    
    
  }

}




function operate(){

  switch(operator){
    case '+':
      num1 = add(num1,num2)
      prepareForChaining()
      break; 
    case '-': 
      num1 = subtract(num1, num2);
      prepareForChaining() 
      break; 
    case 'x': 
      num1 = multiply(num1, num2); 
      prepareForChaining()
      break; 
    case '/': 
      num1 = divide(num1, num2); 
      prepareForChaining()
      break; 
  }
}

function allClear(){
  num1 = ''; 
  num2 = ''
  operator = ''; 
  displayCounter = 0 ; 
  screen.textContent = '0'
  screen.style.fontSize = `${68}px`
  btnArray.forEach(btn => {
      btn.classList.remove('selected')
  })
  decimal.removeAttribute('disabled') 
  
}

function clearCurrentInput(){
  console.log(num2)
  displayCounter = 0; 
  decimal.removeAttribute('disabled') 
  console.log(decimal.disabled)
  if(num1 != '' && operator != '' && num2 != ''){
    num2 = ''
    screen.textContent = num2; 
  } else if (num1 != '' && operator != ''){
    operator = ''; 
    checkIfOperatorHasClassName()
    screen.textContent = operator
  } else if(num1 != '' && operator == ''){
    num1 = ''; 
    screen.textContent = num1; 
  }
  
  else {
    return; 
  }
}

function checkIfOperatorHasClassName(){
  btnArray.forEach(btn => {
    if(btn.classList.contains('selected')){
      btn.classList.remove('selected')
    } else{
      return; 
    }
  })
}

function handlePercent(){
  if (num1 != '' && operator == '' && num2 == ''){

    let percentage = ((parseFloat(num1) / 100))
    num1 = String(percentage)
    screen.textContent = num1; 

    if(num1.length >= 8){

      let numberOne = Number(num1)
      let fixedPercent = numberOne.toFixed(10)
 
      num1 = fixedPercent; 
      screen.textContent = String(num1); 
      console.log(num1)
    }
    DynamicallyMinimizeFont();
  } 

}

function handleDecimal(){
  if(num1 != '' && operator == ''){
    num1 += '.'
    if (num1.includes('.')){
     decimal.disabled = 'true';
    }
    screen.textContent = num1; 
   
  } else if (num1 != '' && operator != '') {
    
    num2 += '.'
    if (num2.includes('.')){
     decimal.disabled = 'true';
    }
    screen.textContent = num2; 
    
  } else {return}; 
}

function removeLastSelection(){
  if(num1 != '' && operator == ''){
    console.log(typeof num1)
    let numArr = num1.split(''); 
    let popped = numArr.pop()
    let poppedBack = numArr.join('')
    num1 = poppedBack
    screen.textContent = num1; 
   
  } else if (num1 != '' && operator != '') {
    console.log(typeof num2)
    let numArr = num2.split(''); 
    let popped = numArr.pop()
    let poppedBack = numArr.join('')
    num2 = poppedBack
    screen.textContent = num2; 

  } else {return}; 
}






function insertMinus(){
  if(num1 != '' && num2 == ''){
    if (num1.includes('-')){
      console.log(negative)
      negative.disabled = 'true';
     }
    let numberArr = num1.split(''); 
    numberArr.unshift('-')
    num1 = numberArr.join('')
 
    screen.textContent = num1; 

  } else if (num1 != '' && num2 != '') {
    let numberArr = num2.split(''); 
    numberArr.unshift('-')
    num2 = numberArr.join('')
    screen.textContent = num2
    if (num2.includes('-')){
     console.log(negative)
     negative.disabled = 'true';
    }


  
  }
  else {return}; 
}
  

function add(numOne, numTwo){
  let sum = parseFloat(+numOne + +numTwo)
  let stringSum = String(sum)

  if(stringSum.length >= 10){
    screen.textContent = sum.toFixed(2);
    return String(sum); 
  } else {
    screen.textContent = stringSum 
    return stringSum; 
  }
  
}

function subtract(numOne, numTwo){
  let difference = parseFloat(+numOne - +numTwo)
  let stringDifference = String(difference)

  if(stringDifference.length >= 10){
    screen.textContent = difference.toFixed(2); 
    return String(difference)
  } else {
    screen.textContent = stringDifference
    return stringDifference; 
  }
}

function multiply(numOne, numTwo){
  let product = parseFloat(+numOne * +numTwo); 
  let stringProduct = String(product)
  if(stringProduct.length >= 10){
    screen.textContent = product.toFixed(2); 
    return String(product); 
  } else {
    screen.textContent = stringProduct; 
    return stringProduct; 
  }
}

function divide(numOne, numTwo){
  console.log( numTwo)
  if (numTwo == '0'){
    screen.textContent = "SRSLY BRO..."
    return; 
  }
 let quotient = parseFloat(+numOne / +numTwo); 
 let stringQuotient = String(quotient)
 if(stringQuotient.length >= 10){
  screen.textContent = quotient.toFixed(2); 
  return String(quotient); 
 } else {
  screen.textContent = quotient; 
  return stringQuotient; 
 }
 
}

function prepareForChaining(){
  operator = ''; 
  num2 = ''
}

function resetFontSize(){

  if (num1 != '' && operator != ''){
    console.log(screen.style.fontSize)
    console.log('I am resetting the font-size on the next click')
   btnArray.forEach(btn => {
    console.log('listener added')
    btn.addEventListener('click', resetForMyReset)
    
   })
   
  } else{
    return 
  }
}


function resetForMyReset(){
  screen.style.fontSize = null; 
  resetCounter++
  displayCounter = 0; 
  if (resetCounter != 0){
    btnArray.forEach(btn => {
      console.log('listener removed')
      btn.removeEventListener('click', resetForMyReset)
     })
   }
}

function chainOperators(){
  if (operatorClickCounter > 0){
    if (num1 != '' && operator != '' && num2 != ''){
      operate(); 
    }
  } else {
    return; 
  }
}

function checkDisplayLength(){
  let num = screen.textContent
  if (num.length >= 11){
    console.log('hello')
    screen.classList.add('hideOverflow')
  }
}