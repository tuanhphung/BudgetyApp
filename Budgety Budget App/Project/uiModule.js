var uiModule = (function(){

  var domObjs = {
    inputType : '.add__type',
    inputDesc : '.add__description',
    inputVal :  '.add__value',
    incContainer : '.income__list',
    expContainer : '.expenses__list',
    tickBtn : '.add__btn',
    budVal : '.budget__value',
    totalInc : '.budget__income--value',
    totalExp : '.budget__expenses--value',
    budget : '.budget__value',
    budgetPerc : '.budget__expenses--percentage',
    listArea : '.container',
    percentageEl : '.item__percentage',
    monthLabel : '.budget__title--month',
  }

  var formatNumber = function(num , type){
    var numSplit, int, dec;
    /*
    + or - before number
    2 decimal points
    comma seperating the thousand

    ex 2645.4674 -> + 2,645.47
    2000 -> 2,000.00
    */

      num = Math.abs(num); //make number absolute ; no minus
      num = num.toFixed(2);// make number 2 decimal places

      numSplit = num.split('.'); // split number from the integer and decimals
      int = numSplit[0];
      dec = numSplit[1];

      if (int.length > 3){
        int = int.substr(0,int.length - 3) + ',' + int.substr(int.length - 3 , 3);
      }

      return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

  }

  var nodeListForEach = function (list, callback){
    for (i=0; i < list.length; i++){
      callback(list[i], i);
    }
  }


  return {

      getEntry : function(){
            return {                                              //return as object as we need to return more than 1 variable
              type : document.querySelector(domObjs.inputType).value , //will either be inc or exp
              desc : document.querySelector(domObjs.inputDesc).value,
              val : parseFloat(document.querySelector(domObjs.inputVal).value),
            }
      },

      getDOM : function() {
          return domObjs;
      },

      //adding items to the UI list
      addListItem : function(obj, type){
        var html, newhtml, element;
        //create html string from html file.
  if (type === 'inc') {
      element = domObjs.incContainer;
     html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

  } else if (type === 'exp'){
    element = domObjs.expContainer;
    html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete">  <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
  }

  //replace placeholders with relevant data
  newhtml = html.replace('%id%', obj.id);
  newhtml = newhtml.replace('%desc%', obj.description);
  newhtml = newhtml.replace('%value%', formatNumber(obj.value, type));

  //insert html DOM for exp or inc
  document.querySelector(element).insertAdjacentHTML('beforeend', newhtml);
      },
      //clear fields after adding a list
      clearFields : function() {
          var fields, fieldArray;

          //selects multiple elements of description and value text box and returns as a 'list' type variable
          fields = document.querySelectorAll(domObjs.inputDesc + ',' + domObjs.inputVal);
         //want the list to be read as an array, not a list. Slice is used to make shallow copy from list to array
          fieldArray = Array.prototype.slice.call(fields);
         // using foreach to loop through each array value. current respresents the current value of the array during the forEach loop.
          fieldArray.forEach(function(current){
            current.value = "";
          })
          //fieldArray[0] is inputDesc , as mentioned above. Focus defaults to that box
          fieldArray[0].focus();
      },
      showBudget : function(obj){
        var type;
        obj.budget > 0 ? type = 'inc' : type = 'exp';

          document.querySelector(domObjs.totalInc).textContent = formatNumber(obj.incTotal, 'inc');
          document.querySelector(domObjs.totalExp).textContent = formatNumber(obj.expTotal, 'exp');
          document.querySelector(domObjs.budget).textContent = formatNumber(obj.budget, type);
          document.querySelector(domObjs.budgetPerc).textContent = obj.percentbudget + '%';

      },

      showPercentages : function(percentages){

        //get list of parcentage labels
        var percList = document.querySelectorAll(domObjs.percentageEl);

        //because selecotorAll returns a nodeList; cant use a for each functouin.
        //making a first class function to make a 'for each' function on a nodeList


        nodeListForEach(percList, function(current, index){
          current.textContent = percentages[index] + '%';
        })

      },

      showMonth : function(){
        var now, year, month, months;
        now = new Date();
        year = now.getFullYear();
        month = now.getMonth();

        months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        document.querySelector(domObjs.monthLabel).textContent = months[month] + ' ' + year;
      },

      removeListItem : function(selectedID){

        var listItem = document.getElementById(selectedID);
        listItem.parentNode.removeChild(listItem); //you can only delete child elements instead of an HTML element directly.
      },

      changedType : function(){

        var fields = document.querySelectorAll(domObjs.inputType + ',' + domObjs.inputDesc + ',' + domObjs.inputVal);


            nodeListForEach(fields, function(current){
              //make outline red on toggle.
              current.classList.toggle('red-focus');
            });

            document.querySelector(domObjs.tickBtn).classList.toggle('red');
        },


      }


  })();
