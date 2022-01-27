// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minWeightInptut = document.querySelector('.minweight__input');// поле для минимально веса
const maxWeightInput = document.querySelector('.maxweight__input');//поля для максимально веса
let condition = 0;


// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);



/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек

function removeAllChildren (parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  };
};

// Даннаю функцию требуется разбить на подфункции!
function fruitCard(fruit) {
  var newLi = document.createElement('li');
  newLi.className = 'fruit__item fruit_default';
  var newDiv = document.createElement('div');
  newDiv.className = 'fruit__info';
  newLi.appendChild(newDiv);
  document.querySelector('.fruits__list').appendChild(newLi);
  const arr =[];
  Object.entries(fruit).forEach(([key, value]) => {
   arr.push(`${key}:${value}`);
  }); 
  for ( var i = 0; i < arr.length; i++) {
    const newContent = document.createElement('div');
    var textContent = document.createTextNode(arr[i]);
    newContent.appendChild(textContent);
    newDiv.appendChild(newContent);
  };
  var newChild = document.createElement('div');
  var firstContent = document.createTextNode(`index: ${arr.length}`);
  newChild.appendChild(firstContent);
  newDiv.insertBefore(newChild, newDiv.firstChild);
};

const display = () => {
    for ( var i = 0; i < fruits.length; i++) {
      fruitCard(fruits[i]);
    };
};

display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (array) => {
  return Math.floor(Math.random()*array.length);
};

// перемешивание массива
const shuffleFruits = () => {
  var result = [];
  var n = fruits.length;
  for ( var i = 0; i < n; i++ ) {
    var randomInt = getRandomInt(fruits.length);
    var item = fruits.splice(randomInt,1);
    result.push(item);
  };
  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  removeAllChildren(fruitsList);
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let cuttedArr = fruits.filter(function(fruit) {
    return fruit.weight < maxWeightInput.value && fruit.weight > minWeightInptut.value;
  });
  fruits = cuttedArr;
};

filterButton.addEventListener('click', () => {
  removeAllChildren(fruitsList);
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (fruit1, fruit2) => {
  const priorityColor = ['желтый','розово-красный','светло-коричневый','зеленый','фиолетовый',];
  const priority1 = priorityColor.indexOf(fruit1.color);
  const priority2 = priorityColor.indexOf(fruit2.color);
  return priority1 > priority2;
};

const sortAPI = {
  bubbleSort(fruits,comparationColor) {
    const n = fruits.length;
    for ( var i = 0; i < fruits.length - 1; i++ ) {
      for ( var j = 0; j < n-1-i; j++ ) {
        if(comparationColor(fruits[j], fruits[j+1])) {
          var temp = fruits[j+1];
          fruits[j+1] =fruits[j];
          fruits[j] = temp;
        };
      };
    };

  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  removeAllChildren (fruitsList);
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

function additionalCard(array) {
  let newCard = {};
  newCard['kind'] = `${kindInput.value}`;
  newCard['color'] = `${colorInput.value}`;
  newCard['weight'] = `${weightInput.value}`;
  if (kindInput.value === '' || colorInput.value === '' || weightInput.value === '') {
    return false;
    } else {
    array.push(newCard);
  };
};
 
addActionButton.addEventListener('click', () => {
  additionalCard(fruits) === false ? alert("Заполните все поля!"): 
    fruitCard(fruits[fruits.length-1]);
});
