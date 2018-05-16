//basic event handler setup
//elements:
const headerElement = document.getElementById('myHeading');
const bodyElement = document.getElementsByTagName('body')[0];
//inputs:
const headerInput = document.getElementById('headerInput');
const backgroundInput = document.getElementById('backgroundInput');
//buttons:
const backgroundButton = document.getElementById('backgroundButton');
const headlineButton = document.getElementById('headlineButton');
const randomHeadlineButton = document.getElementById('randomHeadlineColor');
const randomBackgroundButton = document.getElementById('randomBackgroundColor');
const randomizeBothButton = document.getElementById('randomizeBoth');


//event handlers :
const randomRGB = () => {
  return `rgb(${Math.floor(Math.random()* 255)},${Math.floor(Math.random()* 255)},${Math.floor(Math.random()* 255)})`
}
headlineButton.addEventListener('click', () => {
  headerElement.style.color = headerInput.value;
});

backgroundButton.addEventListener('click', () => {
  bodyElement.style.backgroundColor = backgroundInput.value;
});

randomHeadlineButton.addEventListener('click', () => {
  headerElement.style.color = randomRGB();
})
randomBackgroundButton.addEventListener('click', () => {
  bodyElement.style.backgroundColor = randomRGB();
})

randomizeBothButton.addEventListener('click', () => {
  bodyElement.style.backgroundColor = randomRGB();
  headerElement.style.color = randomRGB();
})
