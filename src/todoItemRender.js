import { formatRelative } from 'date-fns';
import Priority from './priority';

function todoItemRender(item) {
  const element = document.createElement('div');
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  const checkboxButton = document.createElement('button');
  checkboxButton.classList.add('todo__checkbox');
  checkboxButton.textContent = '✅';

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('todo__content');

  const headerDiv = document.createElement('div');
  headerDiv.classList.add('todo__header');

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('todo__title');
  titleDiv.textContent = item.title;

  const prioritySelect = document.createElement('select');
  prioritySelect.classList.add('todo__priority');
  for (const key in Priority) {
    if (Priority.hasOwnProperty(key)) {
      const priorityOption = document.createElement('option');
      priorityOption.textContent = Priority[key];
      if (item.priority === Priority[key]) {
        priorityOption.selected = true;
      }
      prioritySelect.appendChild(priorityOption);
    }
  }

  const dateDiv = document.createElement('div');
  dateDiv.classList.add('todo__date');
  dateDiv.textContent = formatRelative(item.dueDate, new Date());

  const removeButton = document.createElement('button');
  removeButton.classList.add('todo__remove');
  removeButton.textContent = 'x';

  const descriptionP = document.createElement('p');
  descriptionP.classList.add('todo__description');
  descriptionP.textContent = item.description;

  headerDiv.appendChild(titleDiv);
  headerDiv.appendChild(prioritySelect);
  headerDiv.appendChild(dateDiv);
  headerDiv.appendChild(removeButton);

  contentDiv.appendChild(headerDiv);
  contentDiv.appendChild(descriptionP);

  todoDiv.appendChild(checkboxButton);
  todoDiv.appendChild(contentDiv);

  element.appendChild(todoDiv);

  return element;
}

export default todoItemRender;
