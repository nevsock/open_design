//https://iwb.jp/easy-javascript-countdown-timer/
var inte = 2000;
var stopped = false;

function timer() {
    stopped = false;
    var DAYSTART =　Date.now();
    const end = document.getElementById('time').value;
    var today = new Date();
    var DAYEND = new Date(`${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()} ${end}`);
    var INTERVAL = 1000;
    var calc = new Date(+DAYEND - DAYSTART + INTERVAL);
    mainFunction();
    function countdownTimer() {
        var addZero = function(n) { return ('0' + n).slice(-2); }
        if (+new Date(calc) <= INTERVAL) {
            document.getElementById('result').textContent = '終了しました。';
        } else {
            calc = new Date(+new Date(calc) - INTERVAL);
            var date = calc.getUTCDate() - 1 ? calc.getUTCDate() - 1  : '';
            var hours = calc.getUTCHours() ? calc.getUTCHours()  : '';
            var minutes = addZero(calc.getUTCMinutes()) ;
            var seconds = addZero(calc.getUTCSeconds()) ;
            document.getElementById('result').innerHTML = date + '日' + hours + '時間' + minutes + '分' + seconds + '秒';
        }
        if (Number(hours) == 0 && Number(minutes) <= 30) {
            inte = 1000;
        }
        if(Number(hours) == 0 && Number(minutes) <= 10) {
            inte = 500;
        }
        if(Number(hours) == 0 && Number(minutes) <= 3) {
            inte = 200;
        }
    }
    var id = setInterval(function() { 
        countdownTimer(); 
        if(stopped == true){
            clearInterval(id);
        }
    }, INTERVAL);
}

function stop(){
    stopped = true;
}

async function mainFunction() {
    var gpioAccess = await navigator.requestGPIOAccess(); 
    var port = gpioAccess.ports.get(26);
    await port.export("out");
    var v = 0;
    while (true) {
      await sleep(inte);
      v ^= 1;
      port.write(v);
    }
}
  
function sleep(ms) {
    return new Promise(function(resolve) {
      setTimeout(resolve, ms);
    });
}

var ax = document.querySelector('#ax');
var ay = document.querySelector('#ay');
var az = document.querySelector('#az');

onload=function(){
  acceler();
}

async function acceler(){
  // WebI2C Initialized
  var i2cAccess = await navigator.requestI2CAccess()
  var port = i2cAccess.ports.get(1);
  var groveaccelerometer = new GROVEACCELEROMETER(port,0x53);
  await groveaccelerometer.init();
  
  while(true){
    var values = await groveaccelerometer.read();
    ax.innerHTML = values.x ? values.x : ax.innerHTML;
    ay.innerHTML = values.y ? values.y : ay.innerHTML;
    az.innerHTML = values.z ? values.z : az.innerHTML;
    await sleep(500);
  }
}