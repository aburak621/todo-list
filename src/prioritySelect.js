import Priority from './priority';

function prioritySelect(item = null, onChangeCallback = null) {
  const prioritySelect = document.createElement('select');
  for (const key in Priority) {
    if (Priority.hasOwnProperty(key)) {
      const priorityOption = document.createElement('option');
      priorityOption.textContent = Priority[key];
      if (item && item.priority === Priority[key]) {
        priorityOption.selected = true;
      }
      prioritySelect.appendChild(priorityOption);
    }
  }
  if (onChangeCallback) {
    prioritySelect.addEventListener('change', onChangeCallback);
  }

  return prioritySelect;
}

export default prioritySelect;
