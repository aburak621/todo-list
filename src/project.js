import TodoItem from './todoItem';

class Project {
  constructor(name) {
    this.name = name;
    this.items = [];
  }

  addTodoItem(item) {
    this.items.push(item);
  };

  fromParsedJSON(jsonProject) {
    this.name = jsonProject.name;
    this.items = [];
    jsonProject.items.forEach(item => {
      this.items.push(new TodoItem(item.title, item.description, new Date(item.dueDate), item.priority, item.done, item.notes));
    });
  }
}

export default Project;
