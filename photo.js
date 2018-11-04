var idCounter = 1;
// localStorage.setItem('newPhotoArray', JSON.stringify([]));

class Photo {
  constructor(title, caption) {
    this.id = idCounter;
    this.title = title;
    this.caption = caption;
    // this.file = file;
    // this.favorite = false;
  }

  saveToStorage() {
    idCounter++;
    let newPhotoArray;

    // let newPhotoArray = JSON.parse(localStorage.newPhotoArray || '[]')

    if (localStorage.newPhotoArray) {
      newPhotoArray = JSON.parse(localStorage.newPhotoArray);
    } else {
      newPhotoArray = [];
    }
    newPhotoArray.push(this);
    localStorage.setItem('newPhotoArray', JSON.stringify(newPhotoArray));
  }

  deleteFromStorage() {
    // parse from localStorage
    // find card id from array
    // remove from array 
    // put back into local storage
  }

  updatePhoto(editedElement, editedID, editedText) {
    // find specific photo - search by id in localStorage
    let photos = JSON.parse(localStorage.newPhotoArray)
    let targetPhoto = photos.find(function(targetPhoto) {
      return targetPhoto.id == editedID;
    })
    // changed unedited to edited version (title and caption)
    if (editedElement === 'title') {
      targetPhoto.title = editedText;
    } else if (editedElement === 'caption') {
      targetPhoto.caption = editedText;
    } 
    localStorage.setItem('newPhotoArray', JSON.stringify(photos)); 
  }
}






