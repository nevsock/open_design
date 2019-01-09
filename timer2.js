//https://iwb.jp/easy-javascript-countdown-timer/
var inte = 2000;
var stopped = false;
function timer() {
    // var DAYSTART = new Date('2019/01/09 00:00:00'); //設定可能
    stopped = false;
    var DAYSTART =　Date.now();
    const end = document.getElementById('time').value;
    var today = new Date();
    var DAYEND = new Date(`${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()} ${end}`);
    var INTERVAL = 1000;
    var calc = new Date(+DAYEND - DAYSTART + INTERVAL);
    const c = calc;
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
            inte = calc / c * 2000;
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