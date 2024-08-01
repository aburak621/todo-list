import Priority from './priority';

class TodoItem {
  constructor(project, title, description = '', dueDate = '', priority = Priority.NONE, done = false, notes = []) {
    this.project = project;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = done;
    this.notes = notes;
  }
}

export default TodoItem;
