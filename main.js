var favoritesCounter = 0;
var reader = new FileReader();

// Event Listeners
document.querySelector('.title-input').addEventListener('keyup', disableAddToAlbumBtn);
document.querySelector('.caption-input').addEventListener('keyup', disableAddToAlbumBtn);
document.querySelector('.add-to-album-btn').addEventListener('click', addToAlbum);
document.querySelector('.search-bar-input').addEventListener('keyup', filterSearch);
document.querySelector('.view-favorites-btn').addEventListener('click', viewFavoritesButton);

// On page refresh
// displayAllPhotos();
displayTenPhotos();
displayMessage();
// displayTenPhotos();
disableAddToAlbumBtn();
// showMoreLessCards();
displayNumberOfFavorites();
window.onload = appendPhotos;

// Functions

function addToAlbum(){
  const fileInput = document.querySelector('.file');
  if (fileInput.files[0]) {
    reader.readAsDataURL(fileInput.files[0]); 
    reader.onload = addPhoto;
  };
  // showMoreLessCards();
};


function addPhoto(e) {
  e.preventDefault();
  const titleInput = document.querySelector('.title-input');
  const captionInput = document.querySelector('.caption-input');
  const photo = new Photo(titleInput.value, captionInput.value, e.target.result);   
  createCardTemplate(photo.id, photo.title, photo.caption, e.target.result);
  photo.saveToStorage();
  clearInputs();
  displayMessage();
}

function appendPhotos() {
  let imagesArr = JSON.parse(localStorage.getItem('photos')) || [];
  imagesArr.forEach(photo => photoGallery.innerHTML += `<img src=${photo.file} />`)
};

function createCardTemplate(id, title, caption, photoresult) {
  const cardsContainer = document.querySelector('.cards-container');
  let card = `<div id=${id} class="card">
      <h2 onkeydown="pressEnterKey('title')" onfocusout="saveUserInput('title')" data-titleID="${id}" class="card-title-output" contenteditable="true">${title}</h2>
      <div class="file-display-area">
        <img src="${photoresult}" class="card-img">
      </div>
      <p onkeydown="pressEnterKey('caption')" onfocusout="saveUserInput('caption')" data-captionID="${id}" class="card-caption-output" contenteditable="true">${caption}
      </p>
      <p class="trash-fav-button-container">
        <img onclick="deleteCard()" class="delete-btn" src="">
        <img onclick="favoriteHeartButton()" data-photoID="${id}" class="favorite-btn" src="">
      </p>
    </div>
  `;
  cardsContainer.innerHTML = card + cardsContainer.innerHTML; 
};

// function displayGroupOfPhotos(subsetOfPhotos) {
//   subsetOfPhotos.forEach(function(photo) {
//     createCardTemplate(photo.id, photo.title, photo.caption, photo.file);
//   })
// }

function displayAllPhotos() {
  Photo.prototype.newPhotoArray().forEach(function(photo) {
    createCardTemplate(photo.id, photo.title, photo.caption, photo.file);
  })
}

function displayFilteredPhotos(photos) {
  photos.forEach(function(photo) {
    createCardTemplate(photo.id, photo.title, photo.caption, photo.file);
  }) 
}

function displayFavoritedPhotos() {
  Photo.prototype.newPhotoArray().forEach(function(photo) {
    if (photo.favorite === true) {
      createCardTemplate(photo.id, photo.title, photo.caption, photo.file);
    }
  })
}

function filterSearch() {
  const searchBarInput = document.querySelector('.search-bar-input');
  const filterInput = searchBarInput.value.toLowerCase();
  const filteredPhotos = Photo.prototype.newPhotoArray().filter(function(photo) {
    return photo.title.toLowerCase().includes(filterInput) || photo.caption.toLowerCase().includes(filterInput);
  })
  clearCardContainer();
  displayFilteredPhotos(filteredPhotos);
}

function clearInputs() {
  const titleInput = document.querySelector('.title-input');
  const captionInput = document.querySelector('.caption-input');
  titleInput.value = '';
  captionInput.value = '';
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
   
  if (titleInput.value === '' || captionInput.value === '') {
    addToAlbumBtn.disabled = true;
  } else {
    addToAlbumBtn.disabled = false;
  }
}

function pressEnterKey() {
  const key = event.keyCode;
  if (key === 13) { 
    event.preventDefault();
    saveUserInput();
  }
}

function saveUserInput(element) {
  if (element === 'title') {
    let editedElement = 'title';
    let editedID = event.target.dataset.titleid;
    let editedText = event.target.innerText;
  }
  else if (element === 'caption') {
    let editedElement = 'caption';
    let editedID = event.target.dataset.captionid;
    let editedText = event.target.innerText;
  }
  Photo.prototype.updatePhoto(editedElement, editedID, editedText);
}

function clearCardContainer() {
  let cardsContainer = document.querySelector('.cards-container');
  cardsContainer.innerHTML = '';
}

function favoriteHeartButton() {
  let foundPhoto = Photo.prototype.saveFavoritePhotos();
  if (foundPhoto.favorite) {
    favoritesCounter++;
    event.target.src = "images/favorite-active.svg";
  } else {
    favoritesCounter--;
    event.target.src = "images/favorite.svg";
  }
  displayNumberOfFavorites();
}

function displayNumberOfFavorites() {
  let numberOfFavs = document.querySelector('.view-favorites-btn');
  numberOfFavs.innerText = `View ${favoritesCounter} Favorites`;
}

function viewFavoritesButton() {
  clearCardContainer();
  showAllButton();
}

function showAllButton() {
  let viewFavBtn = document.querySelector('.view-favorites-btn')
  if (viewFavBtn.innerText === "View All Photos") {
    displayAllPhotos();
    viewFavBtn.innerText = `View ${favoritesCounter} Favorites`;
  } else {
    displayFavoritedPhotos();
    viewFavBtn.innerText = "View All Photos";
  }
}

document.querySelector('.show-more-btn').addEventListener('click', showMoreButton);
document.querySelector('.show-less-btn').addEventListener('click', showLessButton);

function showMoreButton() {
  const showMoreBtn = document.querySelector('.show-more-btn');
  const showLessBtn = document.querySelector('.show-less-btn');
  showMoreBtn.classList.toggle('more-less-toggle');
  showLessBtn.classList.toggle('more-less-toggle');
  clearCardContainer();
  displayAllPhotos();
}

function showLessButton() {
  const showMoreBtn = document.querySelector('.show-more-btn');
  const showLessBtn = document.querySelector('.show-less-btn');
  showMoreBtn.classList.toggle('more-less-toggle');
  showLessBtn.classList.toggle('more-less-toggle');
  clearCardContainer();
  displayTenPhotos();
}



function displayMessage() {
  let cardsContainer = document.querySelector('.cards-container');
  let uploadPhotoMessage = document.querySelector('.upload-photo-message');

  if (Photo.prototype.newPhotoArray().length) {
    uploadPhotoMessage.innerText = '';
  } else {
    uploadPhotoMessage.innerHTML = `<i class="fas fa-cloud-upload-alt"></i>Please upload your first photo`;
  }
  // if (cardsContainer.innerText) {
  //   uploadPhotoMessage.innerText = '';
  // } else {
  //   uploadPhotoMessage.innerHTML = `<i class="fas fa-cloud-upload-alt"></i>Please upload your first photo`;
  // }
}

function displayTenPhotos() {
  let photoArray = Photo.prototype.newPhotoArray().slice(0, 10);
  photoArray.forEach(function(photo) {
    createCardTemplate(photo.id, photo.title, photo.caption, photo.file);
  })
}
