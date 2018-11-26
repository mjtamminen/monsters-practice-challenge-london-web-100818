let formEl = document.querySelector("#form")
let nameEl = document.querySelector("#name")
let ageEl = document.querySelector("#age")
let descriptionEl = document.querySelector("#description")
let listEl = document.querySelector("#monster-container")
let url = "http://localhost:3000/monsters"


//Add monster
function addMonster(monster) {
  const newMonster = document.createElement("div")
  newMonster.className = "list-item"
  newMonster.innerHTML = `
    <h3>${monster.name}</h3>
    <b>Age: ${monster.age}</b>
    <p>Bio: ${monster.description}</p>
    <button id="delete-${monster.id}" type="button">Delete monster</button>
  `
  listEl.appendChild(newMonster)
  const deleteEl = document.getElementById(`delete-${monster.id}`)
  deleteEl.addEventListener("click", event => {
    newMonster.remove()
    deleteMonsterFromServer(monster.id)
  })
}

//Form listener
formEl.addEventListener("submit", event => {
  event.preventDefault()
  const monster = {
    name: nameEl.value,
    age: ageEl.value,
    description: descriptionEl.value
  }
  createMonster(monster)
    .then(monster => addMonster(monster))
    .catch(() => alert("Unable to reach server."))
  formEl.reset()
})

// Delete monster from server
const deleteMonsterFromServer = (id) =>
  fetch(`http://localhost:3000/monsters/${id}`, {
    method: "DELETE"
  }).then(response => console.log(response))
    .catch(error => alert(error))

//Post new monster onto server
const createMonster = (monster) =>
  fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(monster)
  })
  .then(response => response.json())

//Get all monsters from server
function getMonsters() {
  fetch(url)
  .then(response => response.json())
  .then(addMonsters)
}

//Show all monsters retrieved from server
function addMonsters(monsters) {
  monsters.forEach(monster => addMonster(monster))
}

getMonsters()
