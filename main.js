'use strict';

// Завдання 1. Підрахунок кількості заданої літери у рядку.
function countLetters(row, letter) {
  let count = 0;
  for (let i = 0; i < row.length; i++) {
    if (row.charAt(i).toLowerCase() === letter.toLowerCase()) {
      count++;
    }
  }
  return count;
}

// Повертає рядок, у якому більше шуканих літер (за замовчуванням "a").
function getRow(firstRow, secondRow, letter = 'a') {
  const firstCount = countLetters(firstRow, letter);
  const secondCount = countLetters(secondRow, letter);

  if (firstCount > secondCount) return firstRow;
  if (secondCount > firstCount) return secondRow;
  return 'Кількість літер однакова в обох рядках.';
}

// Завдання 2. Форматування українського телефонного номера.
function formattedPhone(phone) {
  const value = phone.trim();
  let localNumber;

  if (/^\+380\d{9}$/.test(value)) {
    localNumber = value.slice(3);     // +380671234567 -> 0671234567
  } else if (/^380\d{9}$/.test(value)) {
    localNumber = value.slice(2);     // 380671234567 -> 0671234567
  } else if (/^\+80\d{9}$/.test(value)) {
    localNumber = value.slice(2);     // +80971234567 -> 0971234567
  } else if (/^80\d{9}$/.test(value)) {
    localNumber = value.slice(1);     // 80971234567 -> 0971234567
  } else if (/^0\d{9}$/.test(value)) {
    localNumber = value;              // 0671234567
  } else {
    return 'Невірний формат номера телефону.';
  }

  return `+38 (${localNumber.slice(0, 3)}) ${localNumber.slice(3, 6)}-${localNumber.slice(6, 8)}-${localNumber.slice(8, 10)}`;
}

// Приклади з практичної роботи. Результати можна перевірити у консолі браузера.
const firstRow = 'Slow and steady wins the race';
const secondRow = 'You can say that again';
console.log(getRow(firstRow, secondRow));
console.log(formattedPhone('+80664567890'));

// Виведення результатів на сторінку.
function showResult(element, message, isError = false) {
  element.classList.toggle('error', isError);
  element.querySelector('p').textContent = message;
}

document.getElementById('strings-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const a = document.getElementById('first-row').value;
  const b = document.getElementById('second-row').value;
  const letter = document.getElementById('letter').value;
  const output = document.getElementById('strings-result');
  if (!letter || !a || !b) {
    showResult(output, 'Заповніть обидва рядки та введіть одну літеру.', true);
    return;
  }
  const aCount = countLetters(a, letter);
  const bCount = countLetters(b, letter);
  showResult(output, `Літера «${letter}»: у першому рядку — ${aCount}, у другому — ${bCount}. Результат: ${getRow(a, b, letter)}`);
});

document.getElementById('phone-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const formatted = formattedPhone(document.getElementById('phone').value);
  showResult(document.getElementById('phone-result'), formatted, formatted.startsWith('Невірний'));
});

// Додаткові інтерактивні варіанти через prompt() та alert().
document.getElementById('strings-prompt').addEventListener('click', () => {
  const a = prompt('Введіть перший рядок:', firstRow);
  if (a === null) return;
  const b = prompt('Введіть другий рядок:', secondRow);
  if (b === null) return;
  const letter = prompt('Яку літеру потрібно знайти?', 'a');
  if (letter === null) return;
  if (letter.length !== 1 || !a || !b) {
    alert('Введіть два рядки та рівно одну літеру.');
    return;
  }
  alert(`Результат: ${getRow(a, b, letter)}`);
});

document.getElementById('phone-prompt').addEventListener('click', () => {
  const number = prompt('Введіть номер телефону:', '0671234567');
  if (number !== null) alert(formattedPhone(number));
});
