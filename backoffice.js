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
  e.preventDefault();
  const inputFields = document.getElementsByTagName('input');
  console.log(inputFields);
  const newRobot = Array.from(inputFields).reduce((acc, cv) => {
    acc[cv.id] = cv.value;
    return acc;
  }, {});
}

async function sendData(obj) {
  const response = await fetch(
    'https://striveschool-api.herokuapp.com/api/product/',
    {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'content-type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUyMDNjNDg5YzI2ZjAwMTU3ZjljNDMiLCJpYXQiOjE2MTU5ODgzMzUsImV4cCI6MTYxNzE5NzkzNX0.ZkirlemsOm9gKIdP1GliGmMvD2oYPJDMHyPyrTjZkUU',
      },
    }
  );
}
