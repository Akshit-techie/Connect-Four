var p1 = prompt("Enter the name of Blue Player")
var p1color = 'rgb(86, 151, 255)'
var p2 = prompt("Enter the name of Red Player")
var p2color = 'rgb(237, 45, 73)'
var game_on = true
var table = $('table tr');

function changeColor(rownum,colnum,color){
  return table.eq(rownum).find('td').eq(colnum).find('button').css('background-color',color);
}
function returnColor(rownum,colnum){
  return table.eq(rownum).find('td').eq(colnum).find('button').css('background-color');
}
function checkBottom(colnum){
  var colorStat = returnColor(5,colnum);
  for (var i = 5; i >= 0; i--) {
    colorStat = returnColor(i,colnum);
    if(colorStat === 'rgb(128, 128, 128)'){
      return i;
    }
  }
}
function checkWin(one,two,three,four){
  return (one === two && one === three && one === four && one !== undefined && one !== 'rgb(128, 128, 128)');
}
function horizontalWin(){
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 4; j++){
      var win = checkWin(returnColor(i,j),returnColor(i,j+1),returnColor(i,j+2),returnColor(i,j+3));
      if(win === true){
        console.log("Horizontal "+i+" "+j);
        return true;
      }else{
        continue;
      }
    }
  }
}
function verticalWin(){
  for (var j = 0; j < 7; j++) {
    for (var i = 0; i < 3; i++){
      var win = checkWin(returnColor(i,j),returnColor(i+1,j),returnColor(i+2,j),returnColor(i+3,j));
      if(win === true){
        console.log("Vertical "+i+" "+j);
        return true;
      }else{
        continue;
      }
    }
  }
}
function diagonalWin() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (checkWin(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        console.log('diag');
        return true;
      }else if (checkWin(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        console.log('diag');
        return true;
      }else {
        continue;
      }
    }
  }
}
function gameEnd(winningPlayer) {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 7; row++) {
      $('h3').fadeOut('fast');
      $('h1').text(winningPlayer+" has won! Click Restart to play again!").css("fontSize", "50px")
    }
  }
}
var curName = p1;
var cur = 1;
var curColor = p1color;
$('.status').text("It is your turn "+curName);
$('.board button').on('click',function(){
  if(game_on){
    var col = $(this).closest('td').index();
    var bottom = checkBottom(col);
    changeColor(bottom,col,curColor);
    if(horizontalWin() || verticalWin() || diagonalWin()){
      console.log("Won");
      game_on = false;
      gameEnd(curName);
    }
    cur = cur * -1;
    if(cur === 1){
      curName = p1;
      curColor = p1color;
      $('.status').text("It is your turn "+curName);
    }else{
      curName = p2;
      curColor = p2color;
      $('.status').text("It is your turn "+curName);
    }
  }
})

$("#refresh").on("click",function(){
  window.location.reload();
})
