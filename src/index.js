import { getImages } from './pixabay-api';
const searchForm = document.querySelector('#search-form');
const input = document.querySelector('.form-input');
const imagesList = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
const lastPage = document.querySelector('.last-page');

const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
    captionsData: "alt",
        });

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

      lightbox.refresh()
      
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