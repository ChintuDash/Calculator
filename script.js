 let display=document.getElementById("display");

        function addtext(a){                     
            if(a === "*"){
                display.value += "×";
            }
            else{
                display.value += a;  
            }
            display.style.color="black";
        }    


        function result(){
            display.style.color = "green";
            let expression = display.value;

            // Replace symbols for actual calculation
            expression = expression.replace(/×/gi, '*').replace(/÷/gi, '/');

            // Handle % expressions like 100+10%
            expression = expression.replace(/(\d+(?:\.\d+)?)\s*([\+\-\*\/])\s*(\d+(?:\.\d+)?)%/g, function(match, base, operator, percentValue) {
                percentValue = parseFloat(percentValue);
                base = parseFloat(base);

                switch(operator){
                    case '+': return base + (base * percentValue / 100);
                    case '-': return base - (base * percentValue / 100);
                    case '*': return base * (percentValue / 100);
                    case '/': return base / (percentValue / 100);
                }
            });

            // If single % at end like 50%, convert to 50/100
            expression = expression.replace(/(\d+(?:\.\d+)?)%/, (match, val) => parseFloat(val) / 100);

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
    display.value += '%';
    display.style.color = "black";
}


  



        // Preload voices on page load
window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
};

// Warm up the speech engine with dummy speech
window.addEventListener('load', () => {
    const dummy = new SpeechSynthesisUtterance(" ");
    window.speechSynthesis.speak(dummy);
});

// Your speak function
function speaktext(text) {
    window.speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 1;
    msg.pitch = 1;
    msg.volume = 1; // Must be between 0 and 1

    window.speechSynthesis.speak(msg);
}


function addAndSpeak(value) {
    addtext(value);
    const speakMap = {
        '+': 'plus',
        '-': 'minus',
        '*': 'multiply',
        '÷': 'divide',
        '(': 'open parentheses',
        ')': 'close parentheses',
        '%': 'percentage',
        '.': 'point'
    };

    speaktext(speakMap[value] || value);
}

function clearAndspeak(){
    cls();
    speaktext("clear");
}
function delAndspeak(){
    del();
    speaktext("Backspace");
}

