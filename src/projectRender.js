import Project from './project';
import todoItemRender from './todoItemRender';

function projectRender(project, targetElement = null) {
  const element = document.createElement('div');
  element.classList.add('project');

  const projectList = document.createElement('ul');

  if (project instanceof Project) {
    project.items.forEach(item => {
      const li = document.createElement('li');
      li.appendChild(todoItemRender(item, project));
      projectList.appendChild(li);
    });
  }

  element.appendChild(projectList);

  if (targetElement) {
    targetElement.innerHTML = '';
    targetElement.appendChild(element);
    return;
  }

  return element;
}

export default projectRender;
