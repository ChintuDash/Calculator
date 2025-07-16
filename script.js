 let display=document.getElementById("display");

        function addtext(a){                     
            if(a === "*"){
                display.value =display.value+= "×";
            }
            else{
                display.value=display.value+=a;  
            }
            display.style.color="black";
        }

        function result(){
            display.style.color="green";
              let expression = display.value;
           
            expression = expression.replace(/×/gi, '*').replace(/÷/gi, '/');

            try {
                display.value = eval(expression);
            } catch (e) {
                display.value = 'Error';
            }
            speaktext(`result ${display.value}`);
        }
        function cls(){
            display.value='';
        }
        function del(){
            display.value=display.value.slice(0,-1);
            display.style.color="black";
        }


        function per() {
  let exp = display.value;

  // Check if there is an operator
  let match = exp.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)$/);
  if (match) {
    let base = parseFloat(match[1]);
    let operator = match[2];
    let percentValue = parseFloat(match[3]);

    let result = 0;
    switch (operator) {
      case '+':
        result = base + (base * percentValue / 100);
        break;
      case '-':
        result = base - (base * percentValue / 100);
        break;
      case '*':
        result = base * (percentValue / 100);
        break;
      case '/':
        result = base / (percentValue / 100);
        break;
    }
    display.value = result;
  } else {
    // Just convert single number to percent
    let value = parseFloat(display.value);
    if (!isNaN(value)) {
      display.value = value / 100;
    }
  }
}

        function speaktext(text){
            const msg = new SpeechSynthesisUtterance(text);            
            window.speechSynthesis.speak(msg);            
        }
