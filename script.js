function HashStorageFunc() {
    let self = this,
        recipe = {};


    self.addValue = function addValue(key, value) {
        recipe[key] = value;

    };
    self.getValue = function getValue(key) {
        return recipe[key];

    };

    self.deleteValue = function deleteValue(key) {
        if (!(key in recipe)) {
            return false;
        }
        delete recipe[key];
        return true;
    };

    self.getKeys = function getKeys() {
        return Object.keys(recipe);
    };

}

let drinkStorage = new HashStorageFunc();
let addButton = document.getElementById('add');
addButton.addEventListener('click', addDrink);
    function addDrink() {
    let name = prompt('Ведите название напитка');
    if (!name) {
        return;
    }
    let isAlco = prompt('Напиток алкогольный?');
    if (!isAlco) {
        return;
    }
    
    // let isAlcoInfo = (isAlco == true) ? 'Алкогольный' : 'Безалкогольный';

    let recipeInfo = prompt('Введите рецепт приготовления напитка');
    if (recipeInfo === null) {
        if (confirm('Хотите отменить добавление напитка?')) {
            return;
        }
        recipeInfo = prompt('Введите рецепт приготовления напитка');
    }
    if (recipeInfo === '') {
        recipeInfo = 'не указан';
    }

    drinkStorage.addValue(name, {
        alcoholic: isAlco,
        recipe: recipeInfo
    });
    alert('Напиток упешно добавлен в хранилище!');
}

let aboutButton = document.getElementById('about');
aboutButton.addEventListener('click', getDrink);
function getDrink() {
    let name = prompt('Введите название напитка');
    if (!name) {
        return;
    }
    let info = drinkStorage.getValue(name);
    if (!info) {
        return alert('Напиток не найден! \nДопущена ошибка в названии');

    }
    alert('напиток ' + name + '\n' + 'алкогольный: ' + info.alcoholic + '\n' + 'рецепт приготовления: ' + info.recipe)
}

let deleteButton = document.getElementById('delete');
deleteButton.addEventListener('click', deleteDrink);
function deleteDrink() {
    let name = prompt('Введите название напитка, который хотите удалить');
    if (!name) {
        return;
    }
    drinkStorage.deleteValue(name) ?
        alert('Напиток удален из хранилища!') :
        alert('Напиток не найден!');
}
let allButton = document.getElementById('all');
allButton.addEventListener('click', getKeysDrink);
function getKeysDrink() {
    let drinks = drinkStorage.getKeys();
    if (drinks.length === 0) {
        return alert('Вы не добавили ни одного напитка!');
    }
    alert('Напитки в хранилище: ' + drinks.join(', '));
}