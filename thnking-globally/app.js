//basic event handler setup
const headerElement = document.getElementById('myHeading');
const myButton = document.getElementById('myButton');
const textInput = document.getElementById('myTextInput');

console.log(headerElement);
myButton.addEventListener('click', () => {
  headerElement.style.color = textInput.value;
});
