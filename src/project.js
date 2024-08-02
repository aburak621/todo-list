class Project {
  constructor(name) {
    this.name = name;
    this.items = [];
  }

  addTodoItem(item) {
    this.items.push(item);
  };
}

export default Project;
