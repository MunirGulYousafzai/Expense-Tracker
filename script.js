window.addEventListener("DOMContentLoaded", function(){
  showBalanceOnLoad();
  showExpenseOnLoad();
  displayExpense();
})

// stores expense and balance etc in local storage
let expense = JSON.parse(localStorage.getItem("expense")) || [];
let balance = JSON.parse(localStorage.getItem("balance")) || 0;
let currentTheme = JSON.parse(localStorage.getItem("currentTheme")) || "light";
let totalExpense = JSON.parse(localStorage.getItem("totalExpense")) || 0;
let arrayItem = JSON.parse(localStorage.getItem("arrayItem")) || 0;

// global DOM element references (ensure these are available to all functions)
const inputBalance = document.getElementById("inputBalance");
const addBalanceBtn = document.getElementById("balanceBtn");
const addExpenseBtn = document.getElementById("expenseBtn");
const expenseList = document.getElementById("expenseList");
const showBalancePlace = document.getElementById("showBalancePlace");
const showExpensePlace = document.getElementById("showExpensePlace")

// // --- FUNCTION DEFINITIONS ---

function showBalanceOnLoad() {
    showBalancePlace.textContent = balance;
    inputBalance.value = "";
}
function showExpenseOnLoad() {
    showExpensePlace.textContent = totalExpense;
}

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




// display all item in expense array 
function displayExpense() {
    expenseList.innerHTML = ""; // Clear existing content

    expense.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("expenseItem", "w-full", "my-2", "py-2", "rounded-2xl", "bg-gray-100", "flex", "items-center", "flex-wrap", "text-[14px]", "sm:text[16px]");

        const span1 = document.createElement("span");
        span1.classList.add("description", "block", "sm:inline", "w-20", "text-indigo-700", "md:w-30");
        span1.textContent = item.description;

        const span2 = document.createElement("span");
        span2.classList.add("block", "sm:inline", "w-fit", "text-red-500", "font-semibold", "md:w-20");
        span2.textContent = "-$" + item.amount.toFixed(2);

        const span3 = document.createElement("span");
        span3.classList.add("block", "sm:inline", "w-fit", "bg-yellow-100", "text-yellow-700", "px-2", "rounded-2xl", "md:w-30");
        span3.textContent = item.category;

        const span4 = document.createElement("span");
        span4.classList.add("block", "sm:inline", "w-fit", "text-gray-500", "md:w-30");
        span4.textContent = item.date;

        const span5 = document.createElement("span");
        span5.classList.add("block", "sm:inline", "w-fit", "text-gray-400", "md:w-20");
        span5.textContent = item.time;

        const span6 = document.createElement("span");
        span6.classList.add("edit-delete-button", "w-fit", "ml-auto", "flex", "sm:inline", "md:block", "justify-end");

        const editButton = document.createElement("button");
        editButton.innerHTML = '<img src="./images/icons8-edit-64.png" alt="edit">';
        editButton.classList.add("edit-btn", "cursor-pointer", "transition", "md:mr-6", "sm:mr-5", "mr-3");

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

    showBalanceOnLoad(); // Update balance display after rendering
    showExpenseOnLoad(); // Update expense display after rendering
}

addExpenseBtn.addEventListener("click", function(event){
  event.preventDefault();
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

  // add all these variable to array
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






});
