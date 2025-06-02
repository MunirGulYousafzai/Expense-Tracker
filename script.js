
window.addEventListener("resize", displayExpense);
window.addEventListener("DOMContentLoaded", function(){

  showBalanceOnLoad();
  showExpenseOnLoad();
  displayExpense();
})


// ****************************************************************************



// stores expense and balance etc in local storage
let expense = JSON.parse(localStorage.getItem("expense")) || [];
let balance = JSON.parse(localStorage.getItem("balance")) || 0;
let currentTheme = JSON.parse(localStorage.getItem("currentTheme")) || "light";
let totalExpense = JSON.parse(localStorage.getItem("totalExpense")) || 0;
let arrayItem = JSON.parse(localStorage.getItem("arrayItem")) || 0;




// ****************************************************************************



// global DOM element references (ensure these are available to all functions)
const inputBalance = document.getElementById("inputBalance");
const addBalanceBtn = document.getElementById("balanceBtn");
const addExpenseBtn = document.getElementById("expenseBtn");
const expenseList = document.getElementById("expenseList");
const showBalancePlace = document.getElementById("showBalancePlace");
const showExpensePlace = document.getElementById("showExpensePlace")
const listShowExpensePlace = document.getElementById("listShowExpensePlace");
let isEditing = false;
let editIndex = null;



// ****************************************************************************



// // --- FUNCTION DEFINITIONS ---

function showBalanceOnLoad() {
    showBalancePlace.textContent = balance.toFixed(2);
    inputBalance.value = "";
}
function showExpenseOnLoad() {
    showExpensePlace.textContent = totalExpense.toFixed(2);
    // listShowExpensePlace.textContent = totalExpense;
}



// ****************************************************************************



// function which will save the balance,  object in expense array, and total expense
function saveExpenseItem() {
    localStorage.setItem("expense", JSON.stringify(expense));
}
function saveBalance() {
    localStorage.setItem("balance", JSON.stringify(balance));
}
function saveTotalExpense() {
    localStorage.setItem("totalExpense", JSON.stringify(totalExpense));
}



// ****************************************************************************


// this function will calculate nea balance when i add new balance
function calcNewBalance() {
    let amountToAdd = parseFloat(inputBalance.value);
    if(isNaN(amountToAdd) || amountToAdd <= 0){
      alert("please enter a valid balance");
      inputBalance.value = "";
      return
    }
    balance = amountToAdd + balance;
    saveBalance();
    showBalanceOnLoad(); // Update display after saving
    inputBalance.value = ""; // Clear input field after adding
}


// event listener on click  addBalance button

addBalanceBtn.addEventListener("click", function(event){
  event.preventDefault();
  
  calcNewBalance();

  
});




// ****************************************************************************


// edit function

function handleEdit(index) {
  const item = expense[index];
  
  document.getElementById("description").value = item.description;
  document.getElementById("amount").value = item.amount;
  document.getElementById("category").value = item.category;
  document.getElementById("date").value = item.date;
  document.getElementById("time").value = item.time;

  isEditing = true;
  editIndex = index;

  // Optional: change button text to indicate update mode
  addExpenseBtn.textContent = "Update Expense";
  document.getElementById("expenseTitle").textContent = "Update Expense";
  document.getElementById("expenseTitle").classList.add ("text-red-500", "sm:text-3xl", "text-2xl" ,"text-center", "w-full" ,"pb-3" ,"font-medium");
  document.getElementById("expense-content").scrollIntoView({ behavior: "smooth" });
}



// ****************************************************************************



// delete function

function handleDelete(index){
  

  let deleteAmount = expense[index].amount;
  totalExpense = totalExpense - deleteAmount;
  saveTotalExpense();
  
  balance = balance + deleteAmount;
  saveBalance();

  expense.splice(index, 1);
  saveExpenseItem();

  showBalanceOnLoad();
  showExpenseOnLoad();
  
  displayExpense();
  
}




// ****************************************************************************






// display all item in expense array 
function displayExpense() {
  expenseList.innerHTML = ""; // Clear existing content




///////////////////////////////////////////////////////////////////////////////




    expense.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("expenseItem", "w-full", "my-2", "py-2", "rounded-2xl", "bg-gray-100", "dark:bg-gray-700","flex", "items-center", "flex-wrap", "text-[14px]", "sm:text[16px]");
        
        const span1 = document.createElement("span");
        span1.classList.add("description", "block", "sm:inline", "w-1/4", "text-indigo-700","dark:text-blue-400", "dark:sm:font-medium", "md:w-32");
        if(window.innerWidth <= 600 ){
          if((item.description).length > 12){
            span1.textContent = (item.description).slice(0,10) + "...";
          }
          else{
            span1.textContent = item.description;
          }
        }
        else if(window.innerWidth > 600){
          if((item.description).length > 20){
            span1.textContent = (item.description).slice(0,18) + "...";
          }
          else{
            span1.textContent = item.description;
          }
        }

        const span2 = document.createElement("span");
        span2.classList.add("block", "sm:inline", "w-1/4", "text-red-500", "font-semibold","dark:sm:font-medium", "md:w-28");
        span2.textContent = "-$" + item.amount.toFixed(2);

        const span3 = document.createElement("span");
        span3.classList.add("block", "sm:inline", "w-1/4", "dark:text-yellow-100","text-yellow-800", "px-2","dark:sm:font-medium", "rounded-2xl", "md:w-28");
        span3.textContent = item.category;

        const span4 = document.createElement("span");
        span4.classList.add("block", "sm:inline", "w-1/4", "text-gray-500", "md:w-28","dark:sm:font-medium","dark:text-gray-400");
        span4.textContent = item.date;

        const span5 = document.createElement("span");
        span5.classList.add("block", "sm:inline", "w-1/4", "text-gray-400", "md:w-20");
        span5.textContent = item.time;

        const span6 = document.createElement("span");
        span6.classList.add("edit-delete-button", "w-1/4", "ml-auto", "flex", "sm:inline", "md:block", "justify-end", "md:w-fit");

        const editButton = document.createElement("button");
        editButton.innerHTML = '<img src="./images/icons8-edit-64.png" alt="edit">';
        editButton.classList.add("edit-btn", "cursor-pointer", "transition", "md:mr-6", "sm:mr-5", "mr-3");
        editButton.addEventListener("click", function(event){
          event.preventDefault();
          handleEdit(index);
        });


        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<img src="./images/icons8-delete-60.png" alt="delete">';
        deleteButton.classList.add("delete-btn", "cursor-pointer", "transition");

        deleteButton.addEventListener("click", function(event){
          event.preventDefault();
          handleDelete(index);

        });

        span6.appendChild(editButton);
        span6.appendChild(deleteButton);

        li.appendChild(span1);
        li.appendChild(span2);
        li.appendChild(span3);
        li.appendChild(span4);
        li.appendChild(span5);
        li.appendChild(span6);

        expenseList.appendChild(li);
    });




    /////////////////////////////////////////////////////////////////////////////////

    
    showBalanceOnLoad(); // Update balance display after rendering
    showExpenseOnLoad(); // Update expense display after rendering

        // Add total expense at bottom-right of the expense list


    /////////////////////////////////////////////////////////////////////////////





    if(window.innerWidth < 600){
    const summaryWrapper = document.createElement("div");
    summaryWrapper.className = "w-full flex  mt-4 justify-center";

    const totalExpenseBox = document.createElement("div");
    totalExpenseBox.className = "totalExpenseBox flex justify-between sm:gap-5 bg-white dark:bg-gray-700  sm:px-1 px-2 py-1 rounded-xl shadow text-right sm:w-1/3 w-3/4";

    const totalLabel = document.createElement("p");
    totalLabel.className = " w-full sm:text-[18px] text-[14px] p-1  dark:text-red-500 text-red-600 font-medium flex align-middle";
    totalLabel.textContent = "Total Expense";

    const totalValue = document.createElement("p");
    totalValue.className = "totalValue p-1  w-full sm:text-[16px]  text-[14px] text-gray-600 dark:text-white font-semibold text-center";
    totalValue.textContent = `-$${totalExpense.toFixed(2)}`;

    totalExpenseBox.appendChild(totalLabel);
    totalExpenseBox.appendChild(totalValue);
    summaryWrapper.appendChild(totalExpenseBox);
    expenseList.appendChild(summaryWrapper);
    return;
    }



////////////////////////////////////////////////////////////////////////////////////////////////



    if(expense.length > 0){
    const summaryWrapper = document.createElement("div");
    summaryWrapper.className = "w-full flex  mt-4 justify-center";

    const totalExpenseBox = document.createElement("div");
    totalExpenseBox.className = "totalExpenseBox flex justify-between gap-5 bg-white dark:bg-gray-700  sm:px-3 sm:px-1 py-1 rounded-xl shadow text-right sm:w-1/3 w-full";

    const totalLabel = document.createElement("p");
    totalLabel.className = " w-full sm:text-[18px] text-[14px] p-1  dark:text-red-500 text-red-600 font-medium flex align-middle";
    totalLabel.textContent = "Total Expense";

    const totalValue = document.createElement("p");
    totalValue.className = "totalValue p-1  w-full sm:text-[16px]  text-[14px] text-gray-600 dark:text-white font-semibold text-center";
    totalValue.textContent = `-$${totalExpense.toFixed(2)}`;

    totalExpenseBox.appendChild(totalLabel);
    totalExpenseBox.appendChild(totalValue);
    summaryWrapper.appendChild(totalExpenseBox);
    expenseList.appendChild(summaryWrapper);
    }

}




// ****************************************************************************



addExpenseBtn.addEventListener("click", function(event){
  event.preventDefault();




///////////////////////////////////////////////////////////////////////////////////




  if(isEditing){
       
      // declare and initlize the variable that stores the expense input values
      const i_description = document.getElementById("description").value.trim();
      const i_amount = parseFloat(document.getElementById("amount").value);
      const i_category = document.getElementById("category").value;
      const i_date = document.getElementById("date").value;
      const i_time = document.getElementById("time").value;
      
      
      // validation checks on all expense input
      if (!i_description || isNaN(i_amount) || i_amount <= 0 || !i_category || !i_date || !i_time) {
        alert("Please fill in all expense fields correctly (Description, Amount > 0, Category, Date, Time).");
        // i_description = document.getElementById("description").value.trim();
        // i_amount = parseFloat(document.getElementById("amount").value);
        // i_category = document.getElementById("category").value;
        // i_date = document.getElementById("date").value;
        // i_time = document.getElementById("time").value;
        return;
      }
      
          const oldAmount = expense[editIndex].amount;
          balance = balance + oldAmount;
          saveBalance();
          
          if(parseFloat(document.getElementById("amount").value) > balance){
          alert("You don't have enough balance");
          balance = balance - oldAmount;
          saveBalance();
          document.getElementById("amount").value = "";
          return;
          }

          expense[editIndex] = {
            description: i_description,
            amount: i_amount,
            category: i_category,
            date: i_date,
            time: i_time,
          };

          saveExpenseItem();

          totalExpense = totalExpense - oldAmount + i_amount;
          saveTotalExpense();

          balance = balance  - i_amount;
          saveBalance();


          document.getElementById("description").value = "";
          document.getElementById("amount").value = "";
          document.getElementById("category").value = "food";
          document.getElementById("date").value = "";
          document.getElementById("time").value = "";


          isEditing = false;
          editIndex = null;
          addExpenseBtn.textContent = "Add Expense";
          document.getElementById("expenseTitle").textContent = "Add Expense";
          document.getElementById("expenseTitle").className = "text-teal-600 sm:text-3xl text-2xl text-center w-full pb-3 font-medium text-teal-600 dark:text-teal-500";
          displayExpense();
 


    }



/////////////////////////////////////////////////////////////////////////////////////////




  // add all these variable to array
  else{
      if(parseFloat(document.getElementById("amount").value) > balance){
        alert("You don't have enough balance");
        return;
        }
        // declare and initlize the variable that stores the expense input values
        const i_description = document.getElementById("description").value.trim();
        const i_amount = parseFloat(document.getElementById("amount").value);
        const i_category = document.getElementById("category").value;
        const i_date = document.getElementById("date").value;
        const i_time = document.getElementById("time").value;


        // validation checks on all expense input
        if (!i_description || isNaN(i_amount) || i_amount <= 0 || !i_category || !i_date || !i_time) {
            alert("Please fill in all expense fields correctly (Description, Amount > 0, Category, Date, Time).");
            document.getElementById("description").value = "";
            document.getElementById("amount").value = "";
            document.getElementById("category").value = "food";
            document.getElementById("date").value = "";
            document.getElementById("time").value = "";
              return;
          }

        expense.push(
          {
            description : i_description,
            amount : i_amount,
            category: i_category,
            date: i_date,
            time: i_time,
          }
        )

        saveExpenseItem();

        totalExpense = totalExpense + i_amount;
        saveTotalExpense();

        balance = balance - i_amount;
        saveBalance();

            document.getElementById("description").value = "";
            document.getElementById("amount").value = "";
            document.getElementById("category").value = "food";
            document.getElementById("date").value = "";
            document.getElementById("time").value = "";

        displayExpense();
    }
});





// ****************************************************************************




window.addEventListener("DOMContentLoaded", function(){
  const toggleBtn = document.querySelector(".ui-switch input");
  // Apply the theme when the page loads
    if (currentTheme === "dark") {
    document.documentElement.classList.add("dark");
    // the position of toggle button is loaded and the previous one will be assigned
    if(toggleBtn){
        toggleBtn.checked = true;
    }
    }

    toggleBtn.addEventListener("change", function(event){
      event.preventDefault();

      document.documentElement.classList.toggle("dark");
      // Update theme in localStorage
    const isDark = document.documentElement.classList.contains("dark");
    // this is ternary operator which works like if else statement
    // first we check the condition in this case it is idDark ? 
    // if isDark is true it will return "dark" otherwise it will return "light"
    localStorage.setItem("currentTheme", JSON.stringify(isDark ? "dark" : "light"));
    })
})