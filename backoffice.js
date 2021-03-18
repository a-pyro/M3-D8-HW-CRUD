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
            } */
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
