import Project from './project';

/**
 * Constructs and returns a modal dialoge that can add a new project.
 *
 * @param {any} projectManager Manager the project will be added to.
 * @param {any} addCallback Callback that will be called when the project is added.
 * @returns {} The modal element constructed.
 */
function projectModal(projectManager, addCallback) {
  const element = document.createElement('dialog');
  element.classList.add('project-modal');
  element.addEventListener('click', (e) => {
    if (e.target == element) {
      element.remove();
      element.close();
    }
  });

  const form = document.createElement('form');

  const nameInput = document.createElement('input');
  nameInput.classList.add('project-modal__name');
  nameInput.required = true;

  const addButton = document.createElement('button');
  addButton.classList.add('project-modal__add-button');
  addButton.type = 'submit';
  addButton.textContent = 'Create Project';
  addButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (nameInput.value === '') {
      return;
    }

    const newProject = new Project(nameInput.value);
    projectManager.addProject(newProject, true);
    element.close();
    element.remove();
    PubSub.publish('save');
    if (addCallback) {
      addCallback();
    }
  });

  form.appendChild(nameInput);
  form.appendChild(addButton);

  element.appendChild(form);

  document.querySelector('body').appendChild(element);

  return element;
}

export default projectModal;
