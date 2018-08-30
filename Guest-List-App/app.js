// TODO: connect app to browser local storage so that every time you refresh the page
// the user doesn't lose all of their invited guest names
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrar');
  const input = form.querySelector('input');

  const mainDiv = document.querySelector('.main');
  const ul = document.getElementById('invitedList');

  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckBox = document.createElement('input');

  filterCheckBox.type = 'checkbox';
  filterLabel.textContent = "Hide those who haven't responded";
  div.appendChild(filterLabel);
  div.appendChild(filterCheckBox);

  mainDiv.insertBefore(div, ul);

  filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    if(isChecked){
      for(let i = 0; i < lis.length; i += 1){
        let li = lis[i];
        if(li.className === 'responded') {
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      }
    } else {
      for(let i = 0; i < lis.length; i += 1){
        let li = lis[i];
        li.style.display = '';
      }
    }
  });


  function createLI(text){
    function createElement(elementName, property, propertyVal ) {
      const element = document.createElement(elementName);
      element[property] = propertyVal;
      return element;
    };
    function appendToLI(elementName, property, propertyVal){
      const element = createElement(elementName, property, propertyVal);
      li.appendChild(element);
      return element;
    }

    const li = document.createElement('li');

    appendToLI('span', 'textContent', text);
    appendToLI('label', 'textContent', 'Confirmed')
      .appendChild(createElement('input','type','checkbox'));
    appendToLI('button', 'textContent', 'edit');
    appendToLI('button', 'textContent', 'remove');


    return li;
  }


  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    if(text === '') {
      alert('Please fill in a name');
    } else {
      input.value = '';
      const li = createLI(text);
      ul.appendChild(li);
    }
  });

  ul.addEventListener('change', (e) => {
    const checkbox = e.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;

    if(checked){
      listItem.className = 'responded';
    } else {
      listItem.className = '';
    }
  });

  ul.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      const action = button.textContent
      const nameActions = {
          remove: () => {
              ul.removeChild(li)
            },
          edit: () =>{
              const spanElement = button.previousSibling.previousSibling;
              const editTextField = document.createElement('input');
              editTextField.type = 'text';
              const currentValue = spanElement.textContent
              button.textContent = 'save';
              li.removeChild(spanElement);
              editTextField.value = currentValue;
              li.insertBefore(editTextField, li.childNodes[0]);
            },
          save: () => {
            const newSpan = document.createElement('span');
            const updatedValue = li.childNodes[0].value;
            newSpan.textContent = updatedValue;
            li.removeChild(li.childNodes[0]);
            li.insertBefore(newSpan, li.childNodes[0]);
            button.textContent = 'edit';
          }
      };

      // select and run action in button's name
      nameActions[action]();
    }
  });

});
