//https://iwb.jp/easy-javascript-countdown-timer/

var stopped = false;

// var DAYSTART = new Date('2019/01/09 00:00:00'); //設定可能
var DAYSTART =　Date.now()
var DAYEND   = new Date('2019/01/09 12:05:00');
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
  if (Number(hours) == 1 && Number(minutes) == 0 && Number(seconds) == 0){
    document.getElementById('countdown').innerHTML = "___まであと一時間";
  }
  else if(Number(hours) == 0 && Number(minutes) == 30 && Number(seconds) == 0){
    document.getElementById('countdown').innerHTML = "___まで残り30分";
  }
  else if(Number(hours) == 0 && Number(minutes) == 10 && Number(seconds) == 0){
    document.getElementById('countdown').innerHTML = "___まで残り10分";
  }
}

window.onload = function print(){
  var id = setInterval(
    function() { 
      countdownTimer(); 
      if(stopped == true){
        clearInterval(id);
      }
    }, INTERVAL);
}

function stop(){
  stopped = true;
}