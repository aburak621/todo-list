import Priority from './priority';

class TodoItem {
  constructor(title, description = '', dueDate = '', priority = Priority.NONE, done = false, notes = []) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = done;
    this.notes = notes;
    this.project = null;
  }
}

export default TodoItem;
