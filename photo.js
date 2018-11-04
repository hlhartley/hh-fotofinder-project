var idCounter = 1;
var newPhotoArray = [];
localStorage.setItem('newPhotoArray', JSON.stringify(newPhotoArray));

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
    newPhotoArray = JSON.parse(localStorage.newPhotoArray);
    newPhotoArray.push(this);
    localStorage.setItem('newPhotoArray', JSON.stringify(newPhotoArray));
  }

  deleteFromStorage() {

  }

  updatePhoto() {

  }
}






