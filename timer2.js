//https://iwb.jp/easy-javascript-countdown-timer/
function timer() {
    var stopped = false;

    // var DAYSTART = new Date('2019/01/09 00:00:00'); //設定可能
    var DAYSTART =　Date.now();
    const end = document.getElementById('time').value;
    var today = new Date();
    var DAYEND = new Date(`${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()} ${end}`);
    var INTERVAL = 1000;
    var calc = new Date(+DAYEND - DAYSTART + INTERVAL);

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
    }
    setInterval(function() { 
        countdownTimer(); 
        if(stopped == true){
            clearInterval(id);
        }
    }, INTERVAL);
}

function stop(){
    stopped = true;
}