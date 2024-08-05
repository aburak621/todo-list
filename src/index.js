import TodoItem from './todoItem';
import Project from './project';
import ProjectManager from './projectManager';
import Priority from './priority';
import PubSub from 'pubsub-js';
import { addDays } from 'date-fns';
import projectRender from './projectRender';
import './style.css';


const content = document.querySelector('.content');
const projectList = document.querySelector('.sidebar__project-list');
const addItemButton = document.querySelector('.sidebar__add-task-button');


addItemButton.addEventListener('click', () => {
  projectManager.activeProject.addTodoItem(new TodoItem('Placeholder Todo', 'Placeholder Description', new Date(), Priority.HIGH));
  projectRender(projectManager.activeProject, content);
  saveData();
});
PubSub.subscribe('save', saveData);


const projectManager = new ProjectManager();
projectManager.addProject(new Project('My Project'), true);

projectManager.activeProject.addTodoItem(new TodoItem('First Todo', 'Heyo', addDays(new Date(), 3), Priority.LOW));
projectManager.activeProject.addTodoItem(new TodoItem('First Todo', 'Heyo', addDays(new Date(), 3), Priority.LOW));

projectManager.addProject(new Project('Heyoo'), false);

loadData();
projectRender(projectManager.activeProject, content);
projectListRender();


function projectListRender() {
  projectList.innerHTML = '';
  projectManager.projects.forEach(project => {
    const li = document.createElement('li');
    const button = document.createElement('button');

    button.classList.add('sidebar__project');
    button.textContent = project.name;
    button.addEventListener('click', () => {
      projectManager.changeActiveProject(project);
      projectRender(project, content);
    });

    li.appendChild(button);
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
