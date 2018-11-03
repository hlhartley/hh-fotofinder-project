function noGlobVars(string) {
  return document.querySelector(string);
};

var hello = noGlobVars('.guy');
var  hello = document.querySelector('.guy');

function hi () {
var navBar = noGlobVars('.nav-bar');
navBar.remove()
}

var searchInput = document.querySelector('.search-bar-input');
var titleInput = document.querySelector('.title-input');
var captionInput = document.querySelector('.caption-input');
var chooseFileBtn = document.querySelector('.choose-file-btn');
var viewFavBtn = document.querySelector('.view-favorites-btn');
var addToAlbumBtn = document.querySelector('.add-to-album-btn');