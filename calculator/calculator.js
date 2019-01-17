


(function (){
  "use strict";

  var expression = {total:0, operation:"none", next:0, decimal:false};

  function init() {

    var numbers = document.getElementsByClassName("number");
    for (var i = 0; i < numbers.length; i++)
    {
      var elem = numbers[i];
      elem.addEventListener("click", function(e) {
        displayClick(e.target);
      });
    }

    var operations = ["add", "subtract", "multiply", "divide"];
    for (var i = 0; i < operations.length; i++) {
      var element = document.getElementById(operations[i]);
      element.addEventListener("click", function(e) {
        displayClick(e.target);
      });
    }

    document.getElementById("decimal").addEventListener("click", function() { decimal(decimal); });
    document.getElementById("clear").addEventListener("click", function () { clear(clear); });

  }

  function displayClick(el) {
    var idval = el.id;
    var className = el.className;
    // what's the displayed value rn?
    var displayedResult = document.getElementById("result");
    // get that total as a number
    var displayedVal = parseFloat(displayedResult.innerHTML);

    // if there is an operation AND this is an operation
    if (expression.operation != "none" && className == "operator") {
      // don't divide by 0 mid expression
      if (! (expression.operation == "divide" && expression.next == 0)) {
        expression.total = executeExpression(); //update the running total
        displayedResult.innerHTML = expression.total; //display it

      } else if (expression.operation == "divide" && expression.next == 0 && idval == "add") {
        expression.total = 0;
        displayedResult.innerHTML = "ERROR";
      }
    }

    if(className == "operator") {
      setOperation(el);
      expression.next = 0; // set next number to zero
    } else { //number
      number(el, displayedResult);
    }
  }

  // handle number key presses
  function number(el, displayedResult) {
    // what number was pressed?
    var btnClicked = parseFloat(el.innerHTML, 10);
    console.log("you clicked " + btnClicked)
    if (expression.operation == "none") { //if there is no operation yet
      console.log("no operation yet")
      // decimal
      if (expression.decimal) {
        removeZero("total", btnClicked);
      } else {
        //append the clicked value to the existing value
        expression.total = parseFloat("" + expression.total + btnClicked);
      }
      displayedResult.innerHTML = expression.total;
    } else if (expression.operation != "none"){ //if there was an operation
      // decimal
      if (expression.decimal) {
        removeZero("next", btnClicked);
      } else {
        //append the clicked value to the existing value
        expression.next = parseFloat("" + expression.next + btnClicked);
      }
      displayedResult.innerHTML = expression.next;
    }
  }

  //remove the extra zero
  function removeZero(placement, btnClicked) {
    if (btnClicked != 0) {
      if (placement == "next") {
        var removeZero = expression.next.toString(10);
        removeZero = removeZero.substring(0, removeZero.length - 1);
        expression.next = parseFloat(removeZero + btnClicked);
      } else if (placement == "total") {
        var removeZero = expression.total.toString(10);
        removeZero = removeZero.substring(0, removeZero.length - 1);
        expression.total = parseFloat(removeZero + btnClicked);
      }
    }
    expression.decimal = false;
  }

  //deal with decimal point
  function decimal() {
    expression.decimal = true;
    var displayedResult = document.getElementById("result");
    var displayedVal = parseFloat(displayedResult.innerHTML);
    // if there's an operation, change next
    if (expression.operation != "none") {
      expression.next = expression.next.toFixed(1);
      // check to see if next is 0 so you know if to restart
      if (expression.next == 0) {
        displayedVal = 0;
      }
    } else { // if there's no operation, change total
    expression.total = expression.total.toFixed(1);
  }
  displayedResult.innerHTML = displayedVal + '.';
}

// set operation to be executed
function setOperation(id) {
  expression.operation = id.getAttribute("data-operator");
  expression.decimal = false;
  //reset colors
  resetColors()
  // change color
  document.getElementById(expression.operation).style.background = "#AF2006";
}

//reset colors so that only the active operation is highlighted
function resetColors() {
  var operations = ["add", "subtract", "multiply", "divide"];
  for (var i = 0; i < operations.length; i++) {
    var element = document.getElementById(operations[i]);
    element.style.background = "#EF5C00";
  }
}

// execute expression
function executeExpression() {
  if (expression.operation == "add") { //ADD
    return expression.total + expression.next;
  } else if (expression.operation == "subtract") { // SUBTRACT
    return expression.total - expression.next;
  } else if (expression.operation == "multiply") { // MULTIPLY
    return expression.total * expression.next;
  } else if (expression.operation == "divide") { //DIVIDE
    return expression.total / expression.next;
  } else if (expression.operation == "equals") { //EQUALS
    return expression.total;
  }
}

// clear screen and total
function clear(id) {
  var btnClicked = id.innerHTML;
  expression = {total:0, operation:"none", next:0, decimal:false};
  var displayedResult = document.getElementById("result");
  displayedResult.innerHTML = 0;
  resetColors();
}

window.addEventListener("DOMContentLoaded", init, false);

})();
