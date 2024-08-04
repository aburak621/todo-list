class Project {
  constructor(name) {
    this.name = name;
    this.items = [];
  }

  addTodoItem(item) {
    this.items.push(item);
    item.project = this;
  };
}

export default Project;
