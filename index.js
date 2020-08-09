
let calculatorStack = [];
let valueStack = []
let operatorStack = []
let currNum="";
let lastOne;
let evalDone=false;

const addStack = (item)=>{
	if(evalDone){
		clearAll()
		updateDisplay();
		evalDone=false;
	}
	if (isOperator(item))
	{
		flushNumBuffer();
		addtoPrefixStack(item)
	}
	else {
		currNum+=item.toString()
		lastOne = "currnum"
	}
  calculatorStack.push(item);
	updateDisplay();
}

const isOperator = (item) => {
	return (item === "+" || item === "-"
		|| item === "*" || item === "/")
}

const addtoPrefixStack = (item)=>{
	if(typeof(item) === "number") 
	{
		lastOne = "value";
		valueStack.push(item);
		if (valueStack.length > 1 && (operatorStack[operatorStack.length-1] === "/" || 
		operatorStack[operatorStack.length-1] === "*") ){
			flushNumBuffer();
			evalOne();
		}
	}
	//string
	else{
		lastOne = "operator"
		if (item === "+" || item === "-") {
			operatorStack.push(item)

		}
		if (item === "/" || item === "*") {
			operatorStack.push(item)
		}
	}
}

const flushNumBuffer = ()=>
{
	if(currNum!=="") {
		lastOne = "value"
		let tempNum = currNum;
		currNum="";
		addtoPrefixStack(parseFloat(tempNum));
	}
}
let lastValue1=[];
let lastValue2=[];
let lastOp = [];
const evalOne = () => {
	let num2 = valueStack.pop();
	lastValue2.push(num2);
	let num1 = valueStack.pop();
	lastValue1.push(num1);
	if (isNaN(num2)  || isNaN(num1)|| valueStack.length > 100)
	{
		alert("Error, invalid input!")
		return false;
	}
	let operator = operatorStack.pop();
	lastOp.push(operator);
	let newVal;
	newVal = operate(num1,num2,operator)
	valueStack.push(newVal)
	return true;
}


const updateDisplay = () =>{
	let displayText = "";
	calculatorStack.forEach((item)=>{
		displayText+= item;
	})
	document.getElementById("displaybar").innerText = displayText;
	console.log(`Values ${valueStack}`);
	console.log(`Currnum ${currNum}`);
	console.log(`Operators ${operatorStack}`);
	console.log(`Last One ${lastOne}`)
}

const clearDisplay = ()=> {
	calculatorStack = [];
	updateDisplay();
}

const clearAll = ()=>{
	clearDisplay();
	valueStack = [];
	operatorStack = [];
	currNum="";
	console.clear();
}

const backOne = () => {
	let checktok = lastOne.pop() 
	if(checktok === 'currnum') {
		currNum = currNum.slice(0,currNum.length-1);
	}
	else if(checktok === 'value') {
			valueStack.pop()
	}
	else if(checktok === 'operator') {
		operatorStack.pop();
	}
	calculatorStack.pop()
	let newtok = calculatorStack[calculatorStack.length-1]
	if(typeof(newtok) === "number"){lastOne = "value"}
	else if(isOperator(tok)){lastOne = "operator"}
	updateDisplay();
}

const evalStack =  ()=>{
	flushNumBuffer();
	let goodEval = true
	while(operatorStack.length > 0 && goodEval){
		goodEval = evalOne()
		if(!goodEval){
			clearAll();
		}
	}

	clearDisplay();
	calculatorStack = valueStack;
	updateDisplay();
	evalDone=true;
}
