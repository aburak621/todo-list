import Project from './project';

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

  fromParsedJSON(jsonManager) {
    this.activeProject = null;
    this.projects = [];
    jsonManager.projects.forEach(project => {
      const newProject = new Project(project.name);
      newProject.fromParsedJSON(project);
      this.projects.push(newProject);

      if (jsonManager.activeProject.name == newProject.name) {
        this.activeProject = newProject;
      }
    });
  }
}

export default ProjectManager;
