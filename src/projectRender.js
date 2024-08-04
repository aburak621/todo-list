import todoItemRender from './todoItemRender';

function projectRender(project, targetElement = null) {
  const element = document.createElement('div');
  element.classList.add('project');

  const projectList = document.createElement('ul');

  project.items.forEach(item => {
    const li = document.createElement('li');
    li.appendChild(todoItemRender(item));
    projectList.appendChild(li);
  });

  element.appendChild(projectList);

  if (targetElement) {
    targetElement.innerHTML = '';
    targetElement.appendChild(element);
    return;
  }

  return element;
}

export default projectRender;
