// SELECIONANDO ELEMENTOS
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("Aside header h2")

// CAPTURA INPUT PARA FORMATAR VALOR
amount.oninput = () => {
  // obtém valor e remove letras 
  let value = amount.value.replace(/\D/g, "")

  // transforma valor em centavos
  value = Number(value) / 100

  // atualiza o valor do input depois da remoção de letras
  amount.value = formatCurrencyBRL(value)

}

  // formata para o padrão BRL
function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })

  return value

}

form.onsubmit = (event) => {
  event.preventDefault()

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
    }
expenseAdd(newExpense)

}

// adiciona um novo item na lista
function expenseAdd(newExpense) {
  try {
    // cria o elemento de li puxando a classe do css
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    // cria o ícone da categoria
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // cria a info da despesa
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    // cria o nome da despesa
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    // cria a categoria da despesa
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // adiciona nome e categoria na div 
    expenseInfo.append(expenseName, expenseCategory)

    // cria o valor da despesa
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
    .toUpperCase()
    .replace("R$", "")}`

    // cria o icone de remover
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg")
    removeIcon.setAttribute("alt", "ícone de excluir")

    // adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    // adiciona o item na lista
    expenseList.append(expenseItem)

    // limpa os inputs
    formClear()

    // atualiza os totais
    updateTotals()

  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.")
    console.log(error)
  }
}

// atualiza os totais
function updateTotals() {
try {
  // recupera todos itens (li) da lista (ul)
  const items = expenseList.children
  // atualiza a quantidade de itens da lista
  expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

  // variável para incrementar o total
  let total = 0
  // percorre cada item da lista
  for (let item =0; item < items.length; item++) {
    const itemAmount = items[item].querySelector(".expense-amount")
  // remove caracteres não númericos e substitui virgula por ponto
  let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".")

  // converte valor para float
  value = parseFloat(value)

  // verifica se é número válido
  if(isNaN(value)){
    return alert( "Não foi possível calcular o total")
  }

  // incrementa valor total
  total += Number(value)

  }

  // cria span para adicionar R$ formatado
  const symbolBRL = document.createElement("small")
  symbolBRL.textContent = "R$"

  total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")
  expensesTotal.innerHTML = ""
  expensesTotal.append(symbolBRL, total)


} catch (error) {
  console.log(error)
  alert("Não foi possível atualizar os totais")
  
}
}

// Evento que captura o click nos itens da lista

expenseList.addEventListener("click", function(event){
  
  if(event.target.classList.contains("remove-icon")) {
    const item = event.target.closest(".expense")
    item.remove()
 }
 updateTotals()
})

// limpa os inputs
function formClear(){
  expense.value = ""
  category.value = ""
  amount.value = ""
  
// coloca o focus no input amount
  expense.focus()


}