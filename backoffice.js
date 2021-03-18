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
form.addEventListener('submit', collectData);

async function collectData(e) {
  try {
    e.preventDefault();
    const inputFields = document.getElementsByTagName('input');

    const newRobot = Array.from(inputFields).reduce((acc, cv) => {
      acc[cv.id] = cv.value;
      return acc;
    }, {});
    const response = await sendData(newRobot);
    console.log(response);
    Array.from(inputFields).forEach((input) => (input.value = ''));

    showAlert('Roboto added', 'success');
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
      return response;
    } else {
      console.log('there mayhave been errors in your request', response);
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
const selectMenu = document.getElementById('inputGroupSelect04');
const selectEditBtn = document.getElementById('selectEditBtn');

window.onload = loadProducts();

async function loadProducts() {
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
    data.forEach((robot) => renderOptions(robot));
  } catch (error) {
    console.log(error);
  }
}

function renderOptions({ name, brand, _id: id }) {
  selectMenu.innerHTML += `<option value="${id}"><span>${name}</span>, <span>${brand}</span>, <span>${id}</span></option>`;
}
