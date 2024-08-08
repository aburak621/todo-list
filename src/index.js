import TodoItem from './todoItem';
import Project from './project';
import ProjectManager from './projectManager';
import Priority from './priority';
import PubSub from 'pubsub-js';
import { addDays } from 'date-fns';
import projectRender from './projectRender';
import './style.css';
import todoItemModal from './todoItemModal';
import projectModal from './projectModal';
import confirmModal from './confirmModal';

// DOM Elements
const content = document.querySelector('.content');
const projectList = document.querySelector('.sidebar__project-list');
const addItemButton = document.querySelector('.sidebar__add-task-button');
const addProjectButton = document.querySelector('.sidebar__add-project-button');

// Events
PubSub.subscribe('save', saveData);
addItemButton.addEventListener('click', () => {
  if (!projectManager.activeProject) {
    return;
  }
  const modal = todoItemModal(projectManager, () => {
    projectRender(projectManager.activeProject, content);
  });
  modal.showModal();
});
addProjectButton.addEventListener('click', () => {
  const modal = projectModal(projectManager, () => {
    projectRender(projectManager.activeProject, content);
    projectListRender();
  });
  modal.showModal();
});

// Main
const projectManager = new ProjectManager();
projectManager.addProject(new Project('My Project'), true);

projectManager.activeProject.addTodoItem(
  new TodoItem('First Todo', 'Heyo', addDays(new Date(), 3), Priority.LOW),
);
projectManager.activeProject.addTodoItem(
  new TodoItem('First Todo', 'Heyo', addDays(new Date(), 3), Priority.LOW),
);

projectManager.addProject(new Project('Heyoo'), false);

loadData();
projectRender(projectManager.activeProject, content);
projectListRender();

// Functions
function projectListRender() {
  projectList.innerHTML = '';
  projectManager.projects.forEach((project) => {
    const li = document.createElement('li');

    const button = document.createElement('button');
    button.classList.add('sidebar__project');
    button.textContent = project.name;
    button.addEventListener('click', () => {
      projectManager.changeActiveProject(project);
      projectRender(project, content);
      PubSub.publish('save');
    });

    const removeButton = document.createElement('button');
    removeButton.classList.add('sidebar__remove-project-button');
    removeButton.textContent = 'x';
    removeButton.style.visibility = 'hidden';
    removeButton.addEventListener('click', () => {
      const removeModal = confirmModal(
        `Are you sure you want to remove the project: ${project.name}`,
        () => {
          projectManager.removeProject(project);
          projectRender(projectManager.activeProject, content);
          projectListRender();
        },
        'Remove',
      );
      removeModal.showModal();
    });

    li.addEventListener('mouseover', () => {
      removeButton.style.visibility = 'visible';
    });
    li.addEventListener('mouseleave', () => {
      removeButton.style.visibility = 'hidden';
    });

    li.appendChild(button);
    li.appendChild(removeButton);
    projectList.appendChild(li);
  });
  PubSub.publish('save');
}

function saveData() {
  localStorage.setItem('projectManager', JSON.stringify(projectManager));
}

function loadData() {
  const savedData = localStorage.getItem('projectManager');
  if (savedData) {
    projectManager.fromParsedJSON(JSON.parse(savedData));
  }
}
