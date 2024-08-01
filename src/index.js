import TodoItem from './todoItem';
import Project from './project';
import Priority from './priority';
import { addDays } from 'date-fns';
import todoItemRender from './todoItemRender';
import './style.css';

const body = document.querySelector('body');

const project = new Project();

project.addTodoItem(new TodoItem(project, 'First Todo', 'Heyo', addDays(new Date(), 3), Priority.LOW));
project.addTodoItem(new TodoItem(project, 'First Todo', 'Heyo', addDays(new Date(), 3), Priority.LOW));
project.items.forEach((item) => {
  body.appendChild(todoItemRender(item));
});
