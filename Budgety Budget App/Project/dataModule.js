/*
TO-DO LIST
*add event handler
*get input values
*add new items to UI (income / expense list)
*calculate budget
*update UI
*Add new items to data structure



structing ode with modules (seperated in to modules make code clean)

UI MODULE
*Get input values
*Add new items to UI
*Update UI

DATA MODULE (incomes and expenses)
*Add new items to data structure
*Calculate budget

CONTROLLER MODULE
*Add event handler

*/

// Adding UI, Data and Controller modules:

var dataModule = (function() {

  var Incomes = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var Expenses = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  }

  Expenses.prototype.calcPercentage = function(totalIncome){

    if (totalIncome > 0){
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }

  }

  Expenses.prototype.getPercentage = function(){
    return this.percentage;
  }

    var calculateTotal = function(type){
    sum = 0;
    data.allItems[type].forEach(function(current) {
        sum += current.value;
    });
      data.totals[type] = sum;
    }

  var data = {
     allItems: {
       exp : [],
       inc : [],
     },
    totals: {
      exp : 0,
      inc : 0,
    },
    budget : 0,
    percentage : -1 //-1 means non existent at the time as it would be if there is no inc or exp at the start
  }

  return {

    testFunction : function(){
    console.log(data.allItems);
    },

       addItem : function(type, des, value){
         var newItem, id;

         if (data.allItems[type].length > 0){
            //find last entry of array for 'inc' or 'exp' then add 1, which will be the new entry when adding new object
         id = data.allItems[type][data.allItems[type].length - 1].id + 1;
       } else { id = 0;}

         if(type === 'exp'){
         newItem = new Expenses(id, des, value);

       } else if (type === 'inc'){
         newItem = new Incomes(id, des, value);

       }

       data.allItems[type].push(newItem);
       return newItem;
      },
      caluclateBudget : function(){

        //calculate total inc and exp
        calculateTotal('exp');
        calculateTotal('inc');
        //calculate budget : income - exp
        data.budget = data.totals.inc - data.totals.exp;

        //calculate percentage of income spent
        if (data.totals.inc > 0){
          data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);


        } else {data.totals.exp = -1}
      },

      calculatePercentages : function(){

          data.allItems.exp.forEach(function (current){
            current.calcPercentage(data.totals.inc);
          });

      },

      getPercentages : function(){

        var allPerc = data.allItems.exp.map(function (current){
          return current.getPercentage();
        });
        return allPerc;
      },

      getBudget : function(){
        return {
          budget : data.budget,
          percentbudget : data.percentage,
          incTotal : data.totals.inc,
          expTotal : data.totals.exp,
        }
      },

      deleteItem : function(type , id){
        //use .map to return a new array of ID's from inc or exp
        //get index of specified id from the new array.
        //use that index to delete index from the OG array.
        var arrID, index

        arrID = data.allItems[type].map(function(current){
          return current.id;
        });

        index = arrID.indexOf(id);

        if (index !== -1){
          data.allItems[type].splice(index, 1);
        }
      }

    }

})();
