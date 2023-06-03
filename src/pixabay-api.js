import Notiflix from 'notiflix';
const axios = require('axios').default;
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export async function getImages(keyWord, page) {
  const URL = 'https://pixabay.com/api/';
  const apiKey = '36952134-d669c6dacbc585856e58da105';

  try {
    const response = await axios.get(`${URL}?key=${apiKey}&q=${keyWord}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);

    const amountOfImages = response.data.total;
    if (page === 1 && amountOfImages !== 0) {
      Notiflix.Notify.success(`Hooray! We found ${amountOfImages} images.`);
    }
    if (amountOfImages === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return
    }

    return response;
  } catch (error) {
    Notiflix.Notify.failure('Sorry, there was an error fetching the images. Please try again.');

    throw error;
  }
}