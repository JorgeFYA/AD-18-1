const itemsContainer = document.querySelector('#list-items');
const deleteListBtn = document.querySelector('#delete');
const renderListBtn = document.querySelector('#render');

function addItem(item) {
  const colourCard = document.createElement('section');
  colourCard.className = 'card w-75';
  itemsContainer.append(colourCard);

  const colourCardBody = document.createElement('article');
  colourCardBody.className = 'card-body';
  colourCard.append(colourCardBody);

  const colourCardTitle = document.createElement('h5');
  colourCardTitle.className = 'card-title';
  colourCardTitle.innerText = item.name;
  colourCardBody.append(colourCardTitle);

  const colourCardText = document.createElement('p');
  colourCardText.className = 'card-text';
  colourCardText.innerText = item.pantone_value;
  colourCardBody.append(colourCardText);

  const colourCardColour = document.createElement('figure');
  colourCardColour.style = 'background-color: ' + item.color + ';';
  colourCardColour.innerText = item.color;
  colourCardBody.append(colourCardColour);

  const colourCardBreak = document.createElement('br');
  itemsContainer.append(colourCardBreak);
}

async function fetchColorsList() {
  const url = 'https://reqres.in/api/unknown';
  try {
    const res = await fetch(url, {
      headers: { 'x-api-key': 'reqres-free-v1' },
    });

    if (!res.ok) {
      console.log('Error al obtener los colores desde la API');
    }

    const data = await res.json();
    localStorage.setItem('colors', JSON.stringify(data['data']));

    return data['data'];
  } catch (error) {
    console.log(error);
  }
}

// Función para renderizar los colores
function renderColors(colors) {
  colors.forEach((item) => {
    addItem(item);
  });
}

async function loadColorsFromStorage() {
  try {
    // si existe la llave 'colors' en localStorage se guardan en colorsArr
    const colorsArr = JSON.parse(localStorage.getItem('colors'));
    if (colorsArr === null) {
      //si no exiten dentro de local storage
      const colors = await fetchColorsList();
      renderColors(colors);
    } else {
      // si existen en local storage
      renderColors(colorsArr);
    }
  } catch (error) {
    console.log(error);
  }
}

//renderColors();

loadColorsFromStorage();

deleteListBtn.addEventListener('click', () => {
  if (itemsContainer.children.length !== 0) {
    itemsContainer.innerHTML = '';
    console.log('elementos borrados de la vista');
  }
});

renderListBtn.addEventListener('click', () => {
  if (itemsContainer.children.length === 0) {
    loadColorsFromStorage();
  }
});
