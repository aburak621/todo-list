import TodoItem from './todoItem';
import Project from './project';
import Priority from './priority';
import { addDays } from 'date-fns';
import projectRender from './projectRender';
import './style.css';

const content = document.querySelector('.content');
const projectList = document.querySelector('.sidebar__project-list');

const projects = [];
projects.push(new Project('My Project'));

projects[0].addTodoItem(new TodoItem(projects[0], 'First Todo', 'Heyo', addDays(new Date(), 3), Priority.LOW));
projects[0].addTodoItem(new TodoItem(projects[0], 'First Todo', 'Heyo', addDays(new Date(), 3), Priority.LOW));
content.appendChild(projectRender(projects[0]));
projectListRender();

function projectListRender() {
    projects.forEach(project => {
    const li = document.createElement('li');
    li.classList.add('sidebar__project');
    li.textContent = project.name;
    projectList.appendChild(li);
  });
}
