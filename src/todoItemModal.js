import prioritySelect from './prioritySelect';
import TodoItem from './todoItem';
import { isValid } from 'date-fns';

function todoItemModal(projectManager, addCallback) {
  const element = document.createElement('dialog');
  element.classList.add('todo-item-modal');

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
  addButton.classList.add('todo-item-add-button');
  addButton.textContent = 'Add Todo';
  addButton.addEventListener('click', () => {
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

  element.appendChild(titleInput);
  element.appendChild(descriptionInput);
  element.appendChild(dueDateInput);
  element.appendChild(priority);
  element.appendChild(addButton);

  document.querySelector('body').appendChild(element);

  return element;
}

export default todoItemModal;
