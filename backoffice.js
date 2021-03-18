/* {
                "_id": "5d318e1a8541744830bef139", //SERVER GENERATED
                "name": "app test 1",  //REQUIRED
                "description": "somthing longer", //REQUIRED
                "brand": "nokia", //REQUIRED
                "imageUrl": "https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80", //REQUIRED
                "price": 100, //REQUIRED
                "userId": "admin", //SERVER GENERATED
                "createdAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
                "updatedAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
                "__v": 0 //SERVER GENERATED
            } 
            day 2
            Today you have to implement:

            - In the backoffice page
                a) Add a button and the functionality to EDIT a single product ( PUT  endpoint/{id})
                b) Add a button and the functionality to DELETE a single product ( DELETE endpoint/{id})
                c) Add validation to the product creation/edit form
                d) Display an error message if something goes wrong

            - In the front page
                a) Add a loader while waiting for the product to load
                b) Add a link on each item to go to a detail page

            - Create a new detail page where you are going to display the item information
            
            */
const form = document.getElementById('mainForm');
const submitBtn = document.getElementById('submitBtn');
let robotID;
let editMode = false;
const selectMenu = document.getElementById('inputGroupSelect04');
const putBtn = document.getElementById('putBtn');
const deleteBtn = document.getElementById('deleteBtn');

form.addEventListener('submit', collectData);
const inputFields = document.getElementsByTagName('input');
const textArea = document.getElementById('description');

// https://robohash.org/
async function collectData(e) {
  try {
    e.preventDefault();
    if (editMode) {
      showAlert(
        `youre in edit mode: you should first submit modifications to current item or delete it, before adding a new one`,
        'danger'
      );
      clearForm();
      editMode = !editMode;
      return;
    }

    const newRobot = Array.from(inputFields).reduce((acc, cv) => {
      acc[cv.id] = cv.value;
      return acc;
    }, {});

    newRobot.description = textArea.value;

    const response = await sendData(newRobot);
    console.log(response);
    Array.from(inputFields).forEach((input) => (input.value = ''));
    textArea.value = '';
    // showAlert('Roboto added', 'success');
    loadProductsOnSelectMenu();
  } catch (error) {
    showAlert('Ups some error occured', 'danger');
    console.log(error);
  }
}

async function sendData(obj) {
  try {
    const response = await fetch(
      'https://striveschool-api.herokuapp.com/api/product/',
      {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUyMDNjNDg5YzI2ZjAwMTU3ZjljNDMiLCJpYXQiOjE2MTU5ODgzMzUsImV4cCI6MTYxNzE5NzkzNX0.ZkirlemsOm9gKIdP1GliGmMvD2oYPJDMHyPyrTjZkUU',
        },
      }
    );
    if (response.ok) {
      showAlert('Robot added', 'success');
      return response;
    } else {
      console.log('there mayhave been errors in your request', response);
      showAlert(response.status, 'danger');
    }
  } catch (error) {
    console.log(error);
  }
}

function showAlert(message, status) {
  const alert = `
  <div class="alert alert-${status}" role="alert animate__animated animate__faster animate__fadeInUp">
    ${message}
  </div>
  `;
  form.insertAdjacentHTML('beforeend', alert);
  setTimeout(() => {
    const alert = document.querySelector('.alert');
    alert.classList.remove('animate__fadeInUp');
    alert.classList.add('animate__animate__fadeOutDown');
    setTimeout(() => {
      alert.remove();
    }, 600);
  }, 5000);
}

// day 2

window.onload = loadProductsOnSelectMenu();

async function loadProductsOnSelectMenu() {
  try {
    const response = await fetch(
      'https://striveschool-api.herokuapp.com/api/product/',
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUyMDNjNDg5YzI2ZjAwMTU3ZjljNDMiLCJpYXQiOjE2MTU5ODgzMzUsImV4cCI6MTYxNzE5NzkzNX0.ZkirlemsOm9gKIdP1GliGmMvD2oYPJDMHyPyrTjZkUU',
        },
      }
    );
    const data = await response.json();

    console.log(data);
    renderOptions(data);
  } catch (error) {
    console.log(error);
  }
}

function renderOptions(data) {
  selectMenu.innerHTML = data.reduce(
    (acc, cv) => acc + OptionComponent(cv),
    ''
  );
}

function OptionComponent({ name, brand, _id: id }) {
  return `
  <option value="${id}"><span>${name}</span>, <span>${brand}</span>, <span>${id}</span></option>
  `;
}

selectEditBtn.addEventListener('click', getSingleProduct);

async function getSingleProduct() {
  if (selectMenu.value === 'Choose an item to edit') return;
  try {
    const id = selectMenu.value;
    console.log(id);
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/product/${id}`,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUyMDNjNDg5YzI2ZjAwMTU3ZjljNDMiLCJpYXQiOjE2MTU5ODgzMzUsImV4cCI6MTYxNzE5NzkzNX0.ZkirlemsOm9gKIdP1GliGmMvD2oYPJDMHyPyrTjZkUU',
        },
      }
    );
    const data = await response.json();
    console.log(data);
    editMode = !editMode;
    robotID = id;
    toggleBtns();
    renderProductInForm(data);
  } catch (error) {
    console.log(error);
  }
}

function renderProductInForm({ name, description, brand, imageUrl, price }) {
  Array.from(inputFields).forEach((field) => {
    switch (field.id) {
      case 'name':
        field.value = name;
        break;
      case 'brand':
        field.value = brand;
        break;
      case 'imageUrl':
        field.value = imageUrl;
        break;
      case 'price':
        field.value = price;
        break;
    }
  });
  textArea.value = description;
}

deleteBtn.addEventListener('click', deleteProduct);
putBtn.addEventListener('click', editProduct);

async function editProduct() {
  console.log(robotID);
  //gatering new info
  const modifiedRobot = Array.from(inputFields).reduce((acc, cv) => {
    acc[cv.id] = cv.value;
    return acc;
  }, {});
  modifiedRobot.description = textArea.value;

  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/product/${robotID}`,
      {
        method: 'PUT',
        headers: new Headers({
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUyMDNjNDg5YzI2ZjAwMTU3ZjljNDMiLCJpYXQiOjE2MTU5ODgzMzUsImV4cCI6MTYxNzE5NzkzNX0.ZkirlemsOm9gKIdP1GliGmMvD2oYPJDMHyPyrTjZkUU',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(modifiedRobot),
      }
    );

    if (response.ok) {
      console.log(response);
      clearForm();
      showAlert('Item modified correctly', 'success');
      loadProductsOnSelectMenu();
      toggleBtns();
      editMode = !editMode;
    } else {
      showAlert('Whooops, something went wrong', 'danger');
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteProduct() {
  console.log(robotID);
  try {
  } catch (error) {
    console.log(error);
  }
}

function clearForm() {
  Array.from(inputFields).forEach((field) => (field.value = ''));
  textArea.value = '';
}
function toggleBtns() {
  submitBtn.classList.toggle('d-none');
  putBtn.classList.toggle('d-none');
  deleteBtn.classList.toggle('d-none');
}
