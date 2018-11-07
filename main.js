var reader = new FileReader();

document.querySelector('.title-input').addEventListener('keyup', disableAddToAlbumBtn);
document.querySelector('.caption-input').addEventListener('keyup', disableAddToAlbumBtn);
document.querySelector('.add-to-album-btn').addEventListener('click', addToAlbum);
document.querySelector('.search-bar-input').addEventListener('keyup', filterSearch);
document.querySelector('.view-favorites-btn').addEventListener('click', viewFavoritesButton);
document.querySelector('.show-more-btn').addEventListener('click', showMoreButton);
document.querySelector('.show-less-btn').addEventListener('click', showLessButton);

displayTenPhotos();
displayMessage();
disableAddToAlbumBtn();
displayNumberOfFavorites();
window.onload = appendPhotos;

function addToAlbum(){
  const fileInput = document.querySelector('.file');

  if (fileInput.files[0]) {
    reader.readAsDataURL(fileInput.files[0]); 
    reader.onload = addPhoto;
  };
};

function addPhoto(e) {
  e.preventDefault();
  const titleInput = document.querySelector('.title-input');
  const captionInput = document.querySelector('.caption-input');
  const photo = new Photo(titleInput.value, captionInput.value, e.target.result);   
  createCardTemplate(photo.id, photo.title, photo.caption, e.target.result, photo.favorite);
  photo.saveToStorage();
  clearInputs();
  displayMessage();
}

function appendPhotos() {
  let imagesArr = JSON.parse(localStorage.getItem('photos')) || [];
  imagesArr.forEach(photo => photoGallery.innerHTML += `<img src=${photo.file} />`)
};

function createCardTemplate(id, title, caption, photoresult, favorite) {
  const cardsContainer = document.querySelector('.cards-container');
  const activeFavBtn = "images/favorite-active.svg";
  const inactiveFavBtn = "images/favorite.svg";

  let card = `<div id=${id} class="card">
      <h2 onkeydown="pressEnterKey('title')" onfocusout="saveUserInput('title')" data-titleID="${id}" class="card-title-output" contenteditable="true">${title}</h2>
      <div class="file-display-area">
        <img src="${photoresult}" class="card-img">
      </div>
      <p onkeydown="pressEnterKey('caption')" onfocusout="saveUserInput('caption')" data-captionID="${id}" class="card-caption-output" contenteditable="true">${caption}
      </p>
      <p class="trash-fav-button-container">
        <img onclick="deleteCard()" class="delete-btn" src="">
        <img onclick="favoriteHeartButton()" data-photoID="${id}" class="favorite-btn" src="${favorite ? activeFavBtn : inactiveFavBtn}">
      </p>
    </div>
  `;
  cardsContainer.innerHTML = card + cardsContainer.innerHTML; 
};

function displayAllPhotos() {
  Photo.prototype.newPhotoArray().forEach(photo => createCardTemplate(photo.id, photo.title, photo.caption, photo.file, photo.favorite));
}

function displayFilteredPhotos(photos) {
  photos.forEach(photo => createCardTemplate(photo.id, photo.title, photo.caption, photo.file, photo.favorite));
}

function displayFavoritedPhotos() {
  Photo.prototype.favoritePhotos().forEach(photo => createCardTemplate(photo.id, photo.title, photo.caption, photo.file, photo.favorite));
}

function displayTenPhotos() {
  let photoArray = Photo.prototype.newPhotoArray().slice(0, 10);
  photoArray.forEach(photo => createCardTemplate(photo.id, photo.title, photo.caption, photo.file, photo.favorite));
}

function displayMessage() {
  let cardsContainer = document.querySelector('.cards-container');
  let uploadPhotoMessage = document.querySelector('.upload-photo-message');

  if (Photo.prototype.newPhotoArray().length) {
    uploadPhotoMessage.innerText = '';
  } else {
    uploadPhotoMessage.innerHTML = `<i class="fas fa-cloud-upload-alt"></i>Please upload your first photo`;
  }
}

function filterSearch() {
  const searchBarInput = document.querySelector('.search-bar-input');
  const filterInput = searchBarInput.value.toLowerCase();
  const filteredPhotos = Photo.prototype.newPhotoArray().filter(photo => {
    return photo.title.toLowerCase().includes(filterInput) || photo.caption.toLowerCase().includes(filterInput);
  })
  clearCardContainer();
  displayFilteredPhotos(filteredPhotos);
}

function clearInputs() {
  document.querySelector('.title-input').value = '';
  document.querySelector('.caption-input').value = '';
}

function deleteCard() {
  if (event.target.classList.contains('delete-btn')) {
    event.target.closest('div').remove();
    var cardToDeleteId = event.target.closest('div').id;
  }
  Photo.prototype.deleteFromStorage(cardToDeleteId);
  clearCardContainer();
  displayAllPhotos();
  displayMessage();
}

function disableAddToAlbumBtn() {
  let titleInput = document.querySelector('.title-input');
  let captionInput = document.querySelector('.caption-input');
  let addToAlbumBtn = document.querySelector('.add-to-album-btn');
   
  titleInput.value === '' || captionInput.value === '' ? addToAlbumBtn.disabled = true : addToAlbumBtn.disabled = false;
}


function pressEnterKey() {
  const key = event.keyCode;

  if (key === 13) { 
    event.preventDefault();
    saveUserInput();
  }
}

function saveUserInput(element) {
  var editedText = event.target.innerText;
  if (element === 'title') {
    var editedElement = 'title';
    var editedID = event.target.dataset.titleid;
  }
  else if (element === 'caption') {
    var editedElement = 'caption';
    var editedID = event.target.dataset.captionid;
  }
  Photo.prototype.updatePhoto(editedElement, editedID, editedText);
}

function clearCardContainer() {
  document.querySelector('.cards-container').innerHTML = '';
}

function favoriteHeartButton() {
  let foundPhoto = Photo.prototype.saveFavoritePhotos();

  if (foundPhoto.favorite) {
    event.target.src = "images/favorite-active.svg";
  } else {
    event.target.src = "images/favorite.svg";
  }
  displayNumberOfFavorites();
}

function displayNumberOfFavorites() {
  const numberFavorites = Photo.prototype.favoritePhotos().length;
  document.querySelector('.view-favorites-btn').innerText = `View ${numberFavorites} Favorites`;
}

function viewFavoritesButton() {
  clearCardContainer();
  showAllButton();
}

function showAllButton() {
  const numberFavorites = Photo.prototype.favoritePhotos().length;
  let viewFavBtn = document.querySelector('.view-favorites-btn')

  if (viewFavBtn.innerText === "View All Photos") {
    displayAllPhotos();
    viewFavBtn.innerText = `View ${numberFavorites} Favorites`;
  } else {
    displayFavoritedPhotos();
    viewFavBtn.innerText = "View All Photos";
  }
}

function showMoreButton() {
  document.querySelector('.show-more-btn').classList.toggle('more-less-toggle');
  document.querySelector('.show-less-btn').classList.toggle('more-less-toggle');
  clearCardContainer();
  displayAllPhotos();
}

function showLessButton() {
  document.querySelector('.show-more-btn').classList.toggle('more-less-toggle');
  document.querySelector('.show-less-btn').classList.toggle('more-less-toggle');
  clearCardContainer();
  displayTenPhotos();
}

