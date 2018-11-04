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

  updatePhoto(editedElement, editedID, editedText) {
    debugger
    // find specific photo - search by id in localStorage
    var findPhotoId = JSON.parse(localStorage.newPhotoArray)
    findPhotoId.find(function(editedID) {
      return editedID;
    })
    // changed unedited to edited version (title and caption)
    if (editedElement === 'title') {
      this.title = editedText;
    } else if (editedElement === 'caption') {
      this.body = editedText;
    } 
    newPhotoArray.push(this);
    localStorage.setItem('newPhotoArray', JSON.stringify(findPhotoId)); 
    // localStorage.setItem(editedID, JSON.stringify(findPhotoId));
    }
  }






