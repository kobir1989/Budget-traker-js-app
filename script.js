const formBudget = document.getElementById('formBudget');
const labelBudget = document.getElementById('labelBudget');
const btnBudged = document.getElementById('btnBudged');
const formExp = document.getElementById('formExp');
const labelExp = document.getElementById('labelExp');
const btnExpense = document.getElementById('btnExp');
const budgetTotal = document.getElementById('budgetTotal');
const expTotal = document.getElementById('expTotal');
const balanceTotal = document.getElementById('balanceTotal');
const expList = document.getElementById('expList');
const budgetValue = document.getElementById('budgetValue');
const expAmountValue = document.getElementById('expAmount');
const expTitleValue = document.getElementById('expTitle');

//get budget input value and save to localstorage
let budgetData = [];
let expenseData = [];
function saveBudgetData() {
  let budgetInput = budgetValue.value;

  let budgetObj = {
    budget: Math.abs(budgetInput),
    id: Math.floor(Math.random() * 100000),
  };
  if (localStorage.getItem('budgetData') === null) {
    budgetData.push(budgetObj);
    localStorage.setItem('budgetData', JSON.stringify(budgetData));
  } else {
    const budgetData = JSON.parse(localStorage.getItem('budgetData'));
    budgetData.push(budgetObj);
    localStorage.setItem('budgetData', JSON.stringify(budgetData));
  }
  budgetValue.value = '';
  updateBudgetEl();
}

function saveExpenseData() {
  let expenseTitle = expTitleValue.value;
  let expenseAmount = +expAmountValue.value;
  let expenseDataObj = {
    title: expenseTitle,
    amount: Math.abs(expenseAmount.toFixed(2)),
    id: Math.floor(Math.random() * 100000),
  };
  if (localStorage.getItem('expenseData') === null) {
    expenseData.push(expenseDataObj);
    localStorage.setItem('expenseData', JSON.stringify(expenseData));
  } else {
    const expenseData = JSON.parse(localStorage.getItem('expenseData'));
    expenseData.push(expenseDataObj);
    localStorage.setItem('expenseData', JSON.stringify(expenseData));
  }
  expTitleValue.value = '';
  expAmountValue.value = '';
  updateExpense();
  calcExpense();
}

function updateBudgetEl() {
  const budget = JSON.parse(localStorage.getItem('budgetData'));
  console.log(budget);
  if (budget !== null) {
    const totalBudget = budget
      .map((budget) => +budget.budget)
      .reduce((ele, curr) => ele + curr);
    budgetTotal.innerText = `$${totalBudget.toFixed(2)}`;
    console.log(totalBudget);
  }
}
updateBudgetEl();

function updateExpense() {
  const expense = JSON.parse(localStorage.getItem('expenseData'));
  if (expense !== null) {
    return (expList.innerHTML = expense.map((item) => {
      return `<div id="${item.id}"
                class="mb-6 border-l-[4px] border-red flex items-center justify-between bg-[#F9F9F9] h-[4rem] p-4"
              >
                <h2 class="text-[1.2rem] text-medium text-red">${item.title}</h2>
                <h2 class="text-[1.2rem] text-medium text-red">$${item.amount}</h2>
                <div class="flex gap-6">
                  <button class="text-[#005A8D]" onclick="editExpenseList('${item.id}')">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button class="text-red" onclick="deleteExpenseList('${item.id}')">
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>`;
    }));
  }
}
updateExpense();

//Delete Expense data
function deleteExpenseList(id) {
  const expense = JSON.parse(localStorage.getItem('expenseData'));
  for (let i = 0; i < expense.length; i++) {
    if (expense[i].id == id) {
      expense.splice(i, 1);
      console.log(expense[i]);
    }
  }
  localStorage.setItem('expenseData', JSON.stringify(expense));
  calcExpense();
  updateExpense();
}

//edit Expense data
function editExpenseList(id) {
  const expense = JSON.parse(localStorage.getItem('expenseData'));
  for (let i = 0; i < expense.length; i++) {
    if (expense[i].id == id) {
      expTitleValue.value = expense[i].title;
      expAmountValue.value = expense[i].amount;
      expense.splice(i, 1);
      console.log(expense[i]);
    }
  }
  localStorage.setItem('expenseData', JSON.stringify(expense));
  calcExpense();
  updateExpense();
}

//calc Expense
function calcExpense() {
  const expense = JSON.parse(localStorage.getItem('expenseData'));
  const budgetData = JSON.parse(localStorage.getItem('budgetData'));
  if (expense.length !== 0 && budgetData.length !== 0) {
    const exp = expense
      .map((ex) => ex.amount)
      .reduce((ele, curr) => ele + curr);
    expTotal.innerText = `$${exp.toFixed(2)}`;
    const balance = budgetData
      .map((b) => +b.budget)
      .reduce((ele, curr) => ele + curr);
    const totalBalance = balance - exp;
    balanceTotal.innerText = `$${totalBalance.toFixed(2)}`;
    console.log(expenseData.length);
  } else {
    return;
  }
}

//add expense button
btnExpense.addEventListener('click', (e) => {
  e.preventDefault();
  if (expTitleValue.value === '' || expAmountValue.value == 0) {
    console.log(expAmountValue.value);
    labelExp.innerText = 'Please fill all the inputfield';
    labelExp.style.color = '#FA7070';
    return;
  } else {
    labelExp.innerText = 'Add Your Daily Expenses';
    labelExp.style.color = '#092a35';
  }
  saveExpenseData();
  calcExpense();
  updateExpense();
});

//add budget button
btnBudged.addEventListener('click', (e) => {
  e.preventDefault();
  if (budgetValue.value === '') {
    labelBudget.innerText = 'Please Add Your Budget';
    labelBudget.style.color = '#FA7070';
    return;
  } else {
    labelBudget.innerText = 'Add Your Monthly Budget';
    labelBudget.style.color = '#092a35';
  }
  saveBudgetData();
  calcExpense();
});
