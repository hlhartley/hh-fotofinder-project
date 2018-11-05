var idCounter = 1;

class Photo {
  constructor(title, caption) {
    this.id = idCounter;
    this.title = title;
    this.caption = caption;
    // this.file = file;
    this.favorite = false;
  }

  newPhotoArray() {
    if (localStorage.newPhotoArray) {
      return JSON.parse(localStorage.newPhotoArray);
    } else {
      return [];
    }
  }

  saveToStorage() {
    idCounter++;
    let newPhotoArray = this.newPhotoArray();
    newPhotoArray.push(this);
    localStorage.setItem('newPhotoArray', JSON.stringify(newPhotoArray));
  }

  deleteFromStorage(cardToDeleteId) {
    let photos = this.newPhotoArray();
    let keepPhotos = photos.filter(function(photo) {
      return photo.id != cardToDeleteId;
    })
     localStorage.setItem('newPhotoArray', JSON.stringify(keepPhotos));
  }

  updatePhoto(editedElement, editedID, editedText) {
    let photos = this.newPhotoArray();
    let targetPhoto = photos.find(function(targetPhoto) {
      return targetPhoto.id == editedID;
    })
    if (editedElement === 'title') {
      targetPhoto.title = editedText;
    } else if (editedElement === 'caption') {
      targetPhoto.caption = editedText;
    } 
    localStorage.setItem('newPhotoArray', JSON.stringify(photos)); 
  }
  
  saveFavoritePhotos() {
    let photos = this.newPhotoArray();
    var favoritedPhotoId = event.target.dataset.photoid;
    let favoritePhoto = photos.find(function(photo) {
      return photo.id == favoritedPhotoId;
    })
    if (favoritePhoto) {
      favoritePhoto.favorite = true;
    }
    localStorage.setItem('newPhotoArray', JSON.stringify(photos));
  }
}
