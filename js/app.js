// console.log('Hello from app.js'); to make sure hte javascript is connected
document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('registrar');
  const input = form.querySelector('input');

  const mainDiv = document.querySelector('.main');
  const ul = document.getElementById('invitedList');

  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckBox = document.createElement('input');

  filterLabel.textContent = "Hide those who haven't responded";
  filterCheckBox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckBox);
  mainDiv.insertBefore(div, invitedList);
  filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    if (isChecked) {
      for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        if (li.className === 'responded') {
          // to avoid the problem when other classes are present you might want to do this instead !li.classList.contains('responded');
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      }
    } else {
      for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        li.style.display = '';
      }
    }
  });

  // — this prevents any name conflict with the outer scope, and also prevents any future changes to other functions in the outer scope from affecting the behaviour of this function.
  function createLI(text) { //private function
    function createElement(elementName, property, value) {
      const element = document.createElement(elementName);
      element[property] = value; //the brackets dynamically access the property of element using the string contained in property.
      return element;
    }

    function appendToLI(elementName, property, value) {
      const element = createElement(elementName, property, value);
      li.appendChild(element);
      return element;
    }

    const li = document.createElement('li');
    appendToLI('span', 'textContent', text);
    appendToLI('label', 'textContent', 'Confirmed')
      .appendChild(createElement('input', 'type', 'checkbox'));
    appendToLI('button', 'textContent', 'edit');
    appendToLI('button', 'textContent', 'remove');
    return li;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(input.value);
    const text = input.value;
    input.value = "";
    if (text === "") {
      const form = e.target;
      form.className = 'alert';
    } else {
      const li = createLI(text);
      ul.appendChild(li);
    }
  });

  ul.addEventListener('change', (e) => {
    // console.log(e.target.checked);
    const checkbox = e.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;

    if (checked) {
      listItem.className = 'responded';
    } else {
      listItem.className = '';
    }
  });

  ul.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON") {
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      const action = button.textContent;
      const nameActions = {
        remove: () => {
          ul.removeChild(li);
        },
        edit: () => {
          const span = li.firstElementChild;
          const input = document.createElement('input');
          input.type = 'text';
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          button.textContent = 'save';
        },
        save: () => {
          const input = li.firstElementChild;
          const span = document.createElement('span');
          span.textContent = input.value;
          li.insertBefore(span, input);
          li.removeChild(input);
          button.textContent = 'edit';
        }
      };
      // select and run action in button’s name
      nameActions[action]();
      // the string action will be use to access the function directly from the object then the function will be executed becasue the name of the buttons match the name of the names action properties.
       //this is the same as this:
      // if (button.textContent === 'remove') {
      //   nameActions.remove();
      // } else if (button.textContent === 'edit') {
      //   nameActions.edit();
      // } else if (button.textContent === 'save') {
      //   nameActions.save();
    }
  });
});

// NOTES:
// - Javascript functions known as first-class citizens = Functions can be passed into other functions, assigned to variables, even be stored in arrays and objects.
// - The process of rewirting code while leaving the original behavior exactly the same is called: Refactoring.
// - when refactoring a program, a good place to start is to: identify and remove duplicate code.
// - the DOMContentLoaded event is trigger when all of the DOM has been parsed and loaded into the browser
