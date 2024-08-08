import prioritySelect from './prioritySelect';
import TodoItem from './todoItem';
import { isValid } from 'date-fns';

/**
 * Constructs and returns a modal dialoge that can add a todo item to the active project.
 *
 * @param {any} projectManager Manager the actigve project resides on.
 * @param {any} addCallback Callback that will be called when the todo item is added.
 * @returns {} The modal element constructed.
 */
function todoItemModal(projectManager, addCallback) {
  const element = document.createElement('dialog');
  element.classList.add('todo-item-modal');
  element.addEventListener('click', (e) => {
    if (e.target == element) {
      element.remove();
      element.close();
    }
  });

  const form = document.createElement('form');

  const titleInput = document.createElement('input');
  titleInput.classList.add('todo-item-modal__title');

  const descriptionInput = document.createElement('textarea');
  descriptionInput.classList.add('todo-item-modal__description');

  const dueDateInput = document.createElement('input');
  dueDateInput.type = 'date';
  dueDateInput.classList.add('todo-item-modal__dueDate');

  const priority = prioritySelect();
  priority.classList.add('todo-item-modal__priority');

  const addButton = document.createElement('button');
  addButton.classList.add('todo-item-modal__add-button');
  addButton.type = 'submit';
  addButton.textContent = 'Add Todo';
  addButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (titleInput.value === '') {
      return;
    }

    const date = new Date(dueDateInput.value);
    const newItem = new TodoItem(titleInput.value, descriptionInput.value, isValid(date) ? date : '', priority.value);
    projectManager.activeProject.addTodoItem(newItem);
    element.close();
    element.remove();
    PubSub.publish('save');
    if (addCallback) {
      addCallback();
    }
  });

  form.appendChild(titleInput);
  form.appendChild(descriptionInput);
  form.appendChild(dueDateInput);
  form.appendChild(priority);
  form.appendChild(addButton);

  element.appendChild(form);

  document.querySelector('body').appendChild(element);

  return element;
}

export default todoItemModal;
