const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');
const participantes = document.getElementsByClassName('person');

// Vector para almacenar los usuarios
let userList = [];

// Función que obtiene de la API un nombre aleatorio,
// genera una cantidad de dinero aleatoria cuyo máximo es 1.000.000
// y añade al usuario con ambos datos
async function getRandomUser() {
  let res = await fetch('https://randomuser.me/api');
  let data = await res.json();
  let user = data.results[0];

  // TODO: Crea un objeto usuario (newUser) que tenga como atributos: name y money
  let userName = `${user.name.first} ${user.name.last}`;
  let dinero = Math.floor(Math.random()*1000000) + 1;

  let newUser = {
    name: userName,
    money: dinero
  };

  addData(newUser);
}

// TODO: Función que añade un nuevo usuario (objeto) al listado de usuarios (array)
function addData(obj) {
    userList.push(obj);
   // console.log(userList);
    updateDOM()
}

// TODO: Función que dobla el dinero de todos los usuarios existentes
function doubleMoney() {
  // TIP: Puedes usar map()
  userList = userList.map(objeto => ({
    name: objeto.name,
    money: objeto.money*2
  }));
  updateDOM()
};

// TODO: Función que ordena a los usuarios por la cantidad de dinero que tienen
function sortByRichest() {
  // TIP: Puedes usar sort()
  let orden = userList.sort((a,b) => b.money-a.money);
  updateDOM()
}

// TODO: Función que muestra únicamente a los usuarios millonarios (tienen más de 1.000.000)
function showMillionaires() {
  // TIP: Puedes usar filter()
  userList = userList.filter(objeto => objeto.money >= 1000000)
  updateDOM()
}

// TODO: Función que calcula y muestra el dinero total de todos los usuarios
function calculateWealth() {
  // TIP: Puedes usar reduce ()
  let valorInicial = 0;
  let wealth = userList.reduce((accumulator, currentUser) => accumulator + currentUser.money, valorInicial);
  let wealthElement = document.createElement("div");
  let wealthFormated = formatMoney(wealth);
  wealthElement.innerHTML = `<h3>Dinero total: <strong>${wealthFormated}</strong></h3>`;

  main.appendChild(wealthElement);
}

// TODO: Función que actualiza el DOM
function updateDOM() {
  // TIP: Puedes usar forEach () para actualizar el DOM con cada usuario y su dinero
  main.innerHTML = '<h2><strong>Persona</hestrong> Dinero</h2>'

  userList.forEach(user => {
    let userElement = document.createElement("div");
    userElement.classList.toggle("person");
    let moneyFomated = formatMoney(user.money);
    userElement.innerHTML = `<strong>${user.name}</strong> ${moneyFomated}`;
    main.appendChild(userElement);
  })
}

// Función que formatea un número a dinero
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '€';
}

// Obtenemos un usuario al iniciar la app
getRandomUser();

// TODO: Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
showMillionairesBtn.addEventListener("click", showMillionaires);
sortBtn.addEventListener("click", sortByRichest);
calculateWealthBtn.addEventListener("click", calculateWealth);