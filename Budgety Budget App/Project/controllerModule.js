var controllerModule = (function(uiM, dM) { //uiM referring to passed param (uiModule)

  var eventListeners = function() {
    var dom = uiM.getDOM();

    document.querySelector(dom.tickBtn).addEventListener('click', getItems);

    document.addEventListener('keypress', function(event){ //event for key press
      if (event.keyCode === 13){ //13 is keycode for Enter key.
          getItems();
      }
    });

    document.querySelector(dom.listArea).addEventListener('click', deleteEntry);

    document.querySelector(dom.inputType).addEventListener('change', uiM.changedType);


  }

  var updateBudget = function(){
    dM.caluclateBudget();

    // return budget
      var budget = dM.getBudget();

    //display budget on the UI
      console.log(budget);
      uiM.showBudget(budget);
  }

  var updatePercentages = function(){

      // calculate percentages
      dM.calculatePercentages();

      //read percentages from data module
      var percentageArray = dM.getPercentages();

      //update percentages on UI module
      console.log(percentageArray);
      uiM.showPercentages(percentageArray);

  }

    var getItems = function() {

    //gets object from uiModule (getEntry function)
    var input =  uiM.getEntry();

    //in description box isnt empty && value box isnt empty && value is > 0
    if (input.desc !== "" && !isNaN(input.val) && input.val > 0){
   // add expense or income object
    var item = dM.addItem(input.type, input.desc, input.val);
    //add item object to the list
    var itemObj = uiM.addListItem(item, input.type);

    uiM.clearFields();
    // updates budget
    updateBudget();
    updatePercentages();
    }


  }

  var deleteEntry = function(event){
    var clickedButtonID, type, clickedID;
    clickedButtonID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (clickedButtonID){
      splitID = clickedButtonID.split('-');
      type = splitID[0];
      clickedID = parseInt(splitID[1]);
    }

    //make function to delete item from data module
      dM.deleteItem(type, clickedID);
    //make function to remove item from UI module
      uiM.removeListItem(clickedButtonID);
      //update the budget total
      updateBudget();
      updatePercentages();

  }


  return {
        init : function() {
          console.log('Initalised');
          uiM.showBudget({
            budget : 0,
            incTotal : 0,
            expTotal : 0,
            percentbudget : 0,
          })
          eventListeners();
          uiM.showMonth();
        },

  }


})(uiModule, dataModule); //want to use a function in uiModule, so pass uiModule as param

controllerModule.init();
