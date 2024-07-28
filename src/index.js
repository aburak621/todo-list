import TodoItem from './todoItem';
import Project from './project';
import { addDays } from 'date-fns';
import Priority from './priority';

const project = new Project();

project.addTodoItem(new TodoItem('First Todo', 'Heyo', addDays(new Date(), 3), Priority.LOW));
console.table(project.items[0]);
