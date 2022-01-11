const buttons = document.getElementsByTagName('button');
let operationNumber = {number1: [], symbol: [], number2: []};
let nope = ["+", "-", "÷", ".", "x", "="];
let operationDisplay = document.getElementsByTagName('p');
let operationDone = false;
let theResult;
let resultDisplay = operationDisplay[1];

function operation(){

    //* eventlisteners for number and symbol buttons----------------------------------------------------
    for (condition = 0; condition < buttons.length; condition++){ 
        let button = buttons[condition];
        if (button.textContent == "=" || button.textContent == "CLEAR" || button.textContent == "DELETE" || button.textContent == "." ){
            continue;
        }
        
        button.addEventListener('click', () =>{
        
            if (nope.indexOf(button.textContent) in nope && button.textContent != "=" && operationDone == false && operationNumber.number1.length > 0){
                
                if (operationNumber.symbol.length === 0){
                    
                    operationNumber.symbol = button.textContent;
                    console.log('mario');
               
                //* multiple operations (WORKS as intended, except for a minor bug i can't seem to fix. I bet you can't find it though :v)----------------------------------------------------------------------------------------------------
                
                }else if (operationNumber.symbol.length > 0){
                                       
                    result();
                    operationNumber.number2 = [];
                    operationNumber.symbol = button.textContent;
                    operationNumber.number1 = [theResult];
                               
                }
                //*-------------------------------------------------------------------------------------------------
            }

            if (!(nope.indexOf(button.textContent) in nope) && operationNumber.symbol.length == 0 && operationDone == false){
                
                operationNumber.number1.push(button.textContent);
   
            }

            if (operationNumber.symbol.length == 1 && !(nope.indexOf(button.textContent) in nope) && operationDone == false){
                
                operationNumber.number2.push(button.textContent);

            }
          
            if (operationDone == false){
                operationDisplay[0].textContent = `${operationNumber.number1.join("")} ${operationNumber.symbol} ${operationNumber.number2.join("")}`;
            }
                  
        });

    } 

    //*special buttons------------------------------------------------------------
    buttons[16].addEventListener('click', () => {   // equal button.
        
        if (operationNumber.number2.length > 0){
           
            result();
            operationDisplay[1].textContent = theResult;
            operationDisplay[0].textContent = `${operationNumber.number1.join("")} ${operationNumber.symbol}
            ${operationNumber.number2.join("") + " ="}`;
            operationDone = true;
        }
        
    });
      
    buttons[0].addEventListener('click', () => {   //clear button

        operationDisplay[0].textContent = "";
        operationDisplay[1].textContent = "";
        operationNumber = {number1: [], symbol: [], number2: []};
        operationDone = false;
        theResult = undefined;

    });

    buttons[1].addEventListener('click', () => { //delete button

        if (operationNumber.symbol.length < 1 && operationDone == false){

            operationNumber.number1 = operationNumber.number1.slice(0, -1);
            operationDisplay[0].textContent = `${operationNumber.number1.join("")} ${operationNumber.symbol} ${operationNumber.number2.join("")}`;
        }else if (operationNumber.symbol.length == 1 && operationDone == false){

            operationNumber.number2 = operationNumber.number2.slice(0, -1);
            operationDisplay[0].textContent = `${operationNumber.number1.join("")} ${operationNumber.symbol} ${operationNumber.number2.join("")}`;
        }


    })

    buttons[14].addEventListener('click', () => {    //dot button

        if (operationNumber.symbol.length == 0 && !(operationNumber.number1.indexOf('.') in operationNumber.number1)){
            
            operationNumber.number1.push('.');
            operationDisplay[0].textContent = `${operationNumber.number1.join("")} ${operationNumber.symbol} ${operationNumber.number2.join("")}`;

        }else if (operationNumber.symbol.length == 1 && !(operationNumber.number2.indexOf('.') in operationNumber.number2) && operationDone == false){

            operationNumber.number2.push('.');
            operationDisplay[0].textContent = `${operationNumber.number1.join("")} ${operationNumber.symbol} ${operationNumber.number2.join("")}`;
        }

    });

    
        
}

//* operation evaluation-----------------------------------------

function result(){
    
    if (operationNumber.symbol == "+"){
        
        theResult = (parseFloat(operationNumber.number1.join(""), 10) * 10 + parseFloat(operationNumber.number2.join(""), 10) * 10)  / 10;
    
    }else if(operationNumber.symbol == "-") {

        theResult = (parseFloat(operationNumber.number1.join(""), 10) * 10 - parseFloat(operationNumber.number2.join(""), 10) * 10)  / 10;

    }else if(operationNumber.symbol == "x") {

        theResult = parseFloat(operationNumber.number1.join(""), 10) * parseFloat(operationNumber.number2.join(""), 10);

    }else if(operationNumber.symbol == "÷") {

        theResult = parseFloat(operationNumber.number1.join(""), 10) / parseFloat(operationNumber.number2.join(""), 10);

    }

}




