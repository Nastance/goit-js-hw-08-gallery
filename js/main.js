import images from './data/gallery-items.js';

{/* <li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li> */}

const galleryContainerRef = document.querySelector('.js-gallery');
const modalContainerRef = document.querySelector('.js-lightbox');
const modalImageRef = document.querySelector('.lightbox__image');


const makeGalleryItem = item => {
      const galleryItem = document.createElement('li');
    galleryItem.classList.add('gallery__item');

    const galleryLink = document.createElement('a');
    galleryLink.classList.add('gallery__link');
    galleryLink.setAttribute('href', `${item.original}`);

    const galleryImage = document.createElement('img');
    galleryImage.classList.add('gallery__image');
    galleryImage.setAttribute('src', `${item.preview}`);
    galleryImage.dataset.source = item.original;
    galleryImage.setAttribute('alt', `${item.description}`);
  
    galleryLink.append(galleryImage);
    galleryItem.append(galleryLink);
  
    return galleryItem;
};
const galleryCards = images.map(makeGalleryItem);

galleryContainerRef.append(...galleryCards);

galleryContainerRef.addEventListener('click', onGalleryContainerClick);
modalContainerRef.addEventListener('click', closeModalContainer);

function onGalleryContainerClick(event) {
  event.preventDefault();
  
    if (!event.target.classList.contains('gallery__image')) {
        return;
    };
    
  modalContainerRef.classList.add('is-open');
  modalImageRef.setAttribute('src', event.target.getAttribute('data-source'));
  modalImageRef.setAttribute('alt', event.target.getAttribute('alt'));

  addEventListenerHandler();
};

function addEventListenerHandler() {
  document.addEventListener('keydown', onPressEscape);
  document.addEventListener('keydown', onChangImgHandler);
};

function removeEventListenerHandler() {
  document.removeEventListener('keydown', onPressEscape);
  document.removeEventListener('keydown', onChangImgHandler);
};

function removeClassIsOpen() {
  modalContainerRef.classList.remove('is-open');
  modalImageRef.src = "";
  modalImageRef.alt = "";
};

function closeModalContainer(e) {
  if (e.target.nodeName === "IMG") {
  return
  };
  if (e.target.dataset.source = "close-lightbox") {
    removeClassIsOpen();
  };
  if (e.target.classList.contains('lightbox__overlay')) {
    removeClassIsOpen();
  };
  
  removeEventListenerHandler();
};

function onPressEscape(evt) {
if (evt.code === "Escape") {
    removeClassIsOpen(evt);
  };
};

const imagesSrc = images.map(el => el.original);
// console.log("imagesSrc", imagesSrc);

function onChangImgHandler(ev) {
  let newIndex = imagesSrc.indexOf(modalImageRef.src);

  if (newIndex < 0) {
    return;
  };

  if (ev.code === 'ArrowLeft') {
    newIndex -= 1;
    if (newIndex === -1) {
      newIndex = imagesSrc.length - 1;
    };
  } else if (ev.code === 'ArrowRight') {
    newIndex += 1;
    if (newIndex === imagesSrc.length) {
      newIndex = 0;
    };
  };
  modalImageRef.src = imagesSrc[newIndex];
};