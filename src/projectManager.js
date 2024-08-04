class ProjectManager {
  constructor() {
    this.projects = [];
    this.activeProject;
  }

  addProject(project, activate = false) {
    this.projects.push(project);

    if (activate) {
      this.changeActiveProject(project);
    }
  }

  removeProject(project) {
    this.projects.splice(this.projects.indexOf(project), 1);
  }

  removeActiveProject() {
    this.projects.splice(this.projects.indexOf(this.activeProject), 1);
  }

  changeActiveProject(project) {
    this.activeProject = project;
  }
}

export default ProjectManager;
