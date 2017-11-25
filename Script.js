var calc = {
  stack: [0, 'add'],
  num: '',
  add: function(a,b){
    return a+b;
  },
  sub: function(a,b){
   return a-b;
  },
  mult: function(a,b){
    return a*b;
  },
  div: function(a,b){
    return a/b;
  },
  setStack: function(){
    var numLength = this.num.length;
    var lastStackVal = this.stack[this.stack.length-1];

    if(this.num.indexOf('.') > -1){
      this.num += '0';
    } // addresses lone decimal case

    if(numLength > 0 && typeof lastStackVal !== 'number'){
      this.stack.push(parseFloat(this.num));
    }

    if(numLength > 0 && typeof lastStackVal === 'number'){
      this.stack = [0, 'add'];
      this.stack.push(parseFloat(this.num));
    } // addresses issues of starting new equation without clearing

    if(numLength === 0 && typeof lastStackVal === 'string') {
      this.stack.pop();
    }// addresses double ops/hanging ops

    this.num = '';
  },
  clear: function(){
    this.stack = [0, 'add'];
    this.num = '';
  },
  opsSolve: function(ops){
      var opIndex,
      answer;

      while(this.stack.indexOf(ops) > -1){
       opIndex = this.stack.indexOf(ops);
       answer = this[ops](this.stack[opIndex-1],this.stack[opIndex+1]);
      this.stack.splice(opIndex-1, 3, answer);
      }
      
    },
  solve: function(){

    this.setStack();
    this.opsSolve('div');
    this.opsSolve('mult');
    this.opsSolve('add');
    this.opsSolve('sub');
    return this.stack;

  }//end solve function

};//end calc obj




$(document).ready(function(){

//Button press switch-case
$('.btn').on('click', function(){
  var btnVal = $(this).data('value');
  var btnType = $(this).data('btntype');
  
  console.log(calc.stack);

  switch(btnType){
    case 'dec':
      if(calc.num.indexOf('.') < 0){
      calc.num += btnVal;
      $('#screen-num').text(calc.num);
    }
      break;
    case 'num':
      calc.num += btnVal;
      $('#screen-num').text(calc.num);
    break;
    case 'ops':
      calc.setStack();
      calc.stack.push(btnVal);
      break;
    case 'solve':
      calc.solve();
      $('#screen-num').text(calc.stack[0]);
      break;
    case 'clear':
      calc.clear();
      $('#screen-num').text('0');

  }//end switch

 });//end .btn click handler

});//end jquery
