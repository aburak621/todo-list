import { formatRelative, isValid } from 'date-fns';
import prioritySelect from './prioritySelect';

function todoItemRender(item, project) {
  const element = document.createElement('div');
  element.classList.add('todo');

  const checkboxButton = document.createElement('input');
  checkboxButton.type = 'checkbox';
  checkboxButton.checked = item.done;
  checkboxButton.classList.add('todo__checkbox');
  checkboxButton.addEventListener('click', () => {
    item.done = checkboxButton.checked;
    PubSub.publishSync('save');
  });

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('todo__content');

  const headerDiv = document.createElement('div');
  headerDiv.classList.add('todo__header');

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('todo__title');
  titleDiv.textContent = item.title;

  const dateDiv = document.createElement('div');
  dateDiv.classList.add('todo__date');
  dateDiv.textContent = isValid(item.dueDate) ? formatRelative(item.dueDate, new Date()) : '';

  const prioSelect = prioritySelect(item, (e) => {
    item.priority = e.target.value;
    PubSub.publishSync('save');
  });
  prioSelect.classList.add('todo__priority');

  const removeButton = document.createElement('button');
  removeButton.classList.add('todo__remove-button');
  removeButton.textContent = 'x';
  removeButton.addEventListener('click', () => {
    element.parentElement.remove();
    const index = project.items.indexOf(item);
    if (index !== -1) {
      project.items.splice(index, 1);
    }
    PubSub.publishSync('save');
  });

  const descriptionP = document.createElement('p');
  descriptionP.classList.add('todo__description');
  descriptionP.textContent = item.description;

  headerDiv.appendChild(titleDiv);
  headerDiv.appendChild(dateDiv);
  headerDiv.appendChild(prioSelect);
  headerDiv.appendChild(removeButton);

  contentDiv.appendChild(headerDiv);
  contentDiv.appendChild(descriptionP);

  element.appendChild(checkboxButton);
  element.appendChild(contentDiv);

  return element;
}

export default todoItemRender;
