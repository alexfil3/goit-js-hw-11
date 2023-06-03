import { getImages } from './pixabay-api';
// const { getImages } = require('./pixabay-api');
const searchForm = document.querySelector('#search-form');
const input = document.querySelector('.form-input');
const imagesList = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
const lastPage = document.querySelector('.last-page');

searchForm.addEventListener('submit', onFormSubmit);
let page = 1;
let previousKeyWord = '';

function onFormSubmit(e) {
  e.preventDefault() 

    const keyWord = input.value;

    if (keyWord !== previousKeyWord) {
      imagesList.innerHTML = '';
      loadMore.style.display = "none";
      page = 1;
    }

    getImages(keyWord, page).then(response => { 
      const object = response.data.hits;
      
      if (response.data.total !== 0) {
         setTimeout(function() {
      loadMore.style.display = "block";
      lastPage.style.display = "none";
}, 1000)
      }

        const data = object.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
            `<div class="photo-card">
               <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" class="image" /></a>
               <div class="info">
                  <p class="info-item">
                    <b>Likes</b>
                    ${likes}
                  </p>
                  <p class="info-item">
                    <b>Views</b>
                    ${views}
                  </p>
                  <p class="info-item">
                    <b>Comments</b>
                    ${comments}
                  </p>
                  <p class="info-item">
                    <b>Downloads</b>
                    ${downloads}
                  </p>
               </div>
             </div>`).join('');
    imagesList.insertAdjacentHTML('beforeend', data);
        previousKeyWord = keyWord;

        new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
    captionsData: "alt",
        });
      
      if (page > 1) {
const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
      }
      
      let current_page = page;
    const per_page = 40;
      const total_items = response.data.total;

    const last_page = Math.round(total_items / per_page);

      setTimeout(function () {
         if (current_page >= last_page) {
        lastPage.style.display = "block";
        loadMore.style.display = "none";
      }
      }, 1000)
     
    }).catch(err => console.log(err))
}

loadMore.addEventListener('click', onClick);

function onClick(e) {
  page += 1
  
  lastPage.style.display = "none"

  onFormSubmit(e)
}













// // Make a request for a user with a given ID
// axios.get('https://api.thecatapi.com/v1/breeds')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });

// Optionally the request above could also be done as
// axios.get('/user', {
//     params: {
//       ID: 12345
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });  

// // Want to use async/await? Add the `async` keyword to your outer function/method.
// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }