'use strict';

console.log('Hi there! 🔥');
const shit = '💩',
  fire = '🔥',
  rocket = '🚀',
  poudzo = '👍🏻';

/*             You are building the new Amazon.
            This time you are also responsible for the back office.

            THIS is you CRUD endpoint
            https://striveschool-api.herokuapp.com/api/product/

            The product model is 

            {
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

            #---------------------------------------------------------------#
            EVERY REST API CALL SHOULD BE AUTHENTICATED. 
            Every request to the API should use Token Based Authentication to secure access to the contents.
            You can get your token by registering on: strive.school/studentlogin

            Authorization: Bearer ###########

            Where ######### is the access_token returned by the endpoint.

            #---------------------------------------------------------------#

            Today you have to implement:

            - A backoffice page, where you can insert the product by specifying the parameters
            - A front page, where the user can see the available products

            ------ N.B. ------

            Tokens duration is set to 14 days. Whenever you'll need to obtain a new one you can send the following request:
            
            POST https://striveschool-api.herokuapp.com/api/account/login
            {
                "username": "testusername@yourmail.com",
                "password":"pass"
            }   
 */

/* 
fetch("https://striveschool-api.herokuapp.com/api/product/", {
headers: {
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUyMDNjNDg5YzI2ZjAwMTU3ZjljNDMiLCJpYXQiOjE2MTU5ODgzMzUsImV4cCI6MTYxNzE5NzkzNX0.ZkirlemsOm9gKIdP1GliGmMvD2oYPJDMHyPyrTjZkUU"
}
})
*/

const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUyMDNjNDg5YzI2ZjAwMTU3ZjljNDMiLCJpYXQiOjE2MTU5ODc2NTMsImV4cCI6MTYxNzE5NzI1M30.LgLmP34Ytsk8aLQOjvOavdKiTiCaXHjtuGKzjqp1Geg';
const endpoint = 'https://striveschool-api.herokuapp.com/api/product/';
const carouselInner = document.querySelector(
  '#carouselExampleControls .carousel-inner'
);
const rowCardsSection = document.getElementById('rowCardsSection');

const loadProducts = async () => {
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
  randerData(data);
};
window.addEventListener('DOMContentLoaded', loadProducts);

function randerData(data) {
  carouselInner.innerHTML = data.reduce(
    (acc, cv, idx) => acc + CarouselItemComponent(cv, idx),
    ''
  );
  rowCardsSection.innerHTML = data.reduce(
    (acc, cv) => acc + CardRowComponent(cv),
    ''
  );
  const deleteBtns = document.querySelectorAll('.delete-btn');
  deleteBtns.forEach((btn) => btn.addEventListener('click', deleteMofo));
}
// https://robohash.org/

function CarouselItemComponent(
  { brand, description, imageUrl, name, price, _id: id },
  idx
) {
  return `
      <div class="carousel-item ${idx === 1 ? 'active' : ''} ">
        <div class="card bg-transparent text-center border-0">
          <img src="${imageUrl}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h3>${brand}</h3>
            <p class="card-text">${description}</p>
            <a href="#" class="btn btn-primary data-id="${id}">${price}$</a>
          </div>
        </div>
      </div>
  `;
}

function CardRowComponent({
  brand,
  description,
  imageUrl,
  name,
  price,
  _id: id,
}) {
  return `
      <div class="col mb-3 col-3">
        <div class="card text-center border-0 h-100">
          <img src="${imageUrl}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h3>${brand}</h3>
            <p class="card-text">${description}</p>
            <div class="btn-group">
               <a href="#" class="btn btn-primary mr-2" data-id="${id}">${price}$</a>
               <button class="btn btn-danger delete-btn" data-id="${id}">delete</button>
            
            </div>
            
          </div>
        </div>
      </div>
  `;
}

function deleteMofo(e) {
  const dataAttribute = e.target.dataset;
  console.log(dataAttribute);
  const { id } = dataAttribute;
  console.log(id);
  fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUyMDNjNDg5YzI2ZjAwMTU3ZjljNDMiLCJpYXQiOjE2MTU5ODgzMzUsImV4cCI6MTYxNzE5NzkzNX0.ZkirlemsOm9gKIdP1GliGmMvD2oYPJDMHyPyrTjZkUU',
      'Content-Type': 'application/json',
    },
  }).then((resp) => {
    if (resp.ok) {
      console.log(resp);
      loadProducts();
    }
  });
}
