function noGlobVars(string) {
  return document.querySelector(string);
};




var hello = noGlobVars('.guy');
var  hello = document.querySelector('.guy');



function hi () {
var navBar = noGlobVars('.nav-bar');
navBar.remove()
}