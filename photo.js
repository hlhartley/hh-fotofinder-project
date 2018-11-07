class Photo {
  constructor(title, caption, file) {
    this.id = Math.floor(Date.now() / 1000);
    this.title = title;
    this.caption = caption;
    this.file = file;
    this.favorite = false;
  }

  newPhotoArray() {
    return JSON.parse(localStorage.getItem('newPhotoArray')) || [];
  }

  favoritePhotos() {
    return this.newPhotoArray().filter(photo => photo.favorite);
  }

  saveToStorage() {
    let newPhotoArray = this.newPhotoArray();

    newPhotoArray.push(this);
    localStorage.setItem('newPhotoArray', JSON.stringify(newPhotoArray));
  }

  deleteFromStorage(cardToDeleteId) {
    let photos = this.newPhotoArray();
    let keepPhotos = photos.filter(photo => photo.id != cardToDeleteId);

    localStorage.setItem('newPhotoArray', JSON.stringify(keepPhotos));
  }

  updatePhoto(editedElement, editedID, editedText) {
    let photos = this.newPhotoArray();
    let targetPhoto = photos.find(photo => photo.id == editedID);
    if (editedElement === 'title') {
      targetPhoto.title = editedText;
    } else if (editedElement === 'caption') {
      targetPhoto.caption = editedText;
    } 
    localStorage.setItem('newPhotoArray', JSON.stringify(photos)); 
  }

  saveFavoritePhotos() {
    let photos = this.newPhotoArray();
    const photoId = event.target.dataset.photoid;
    let foundPhoto = photos.find(photo => photo.id == photoId);
  
    if (foundPhoto) {
      foundPhoto.favorite = !foundPhoto.favorite;
    } 
    localStorage.setItem('newPhotoArray', JSON.stringify(photos));
    return foundPhoto;
  }
}

