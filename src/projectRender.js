import Priority from './priority';
import todoItemRender from './todoItemRender';

function projectRender(project) {
  const element = document.createElement('div');
  element.classList.add('project');

  const projectList = document.createElement('ul');

  project.items.forEach(item => {
    const li = document.createElement('li');
    li.appendChild(todoItemRender(item));
    projectList.appendChild(li);
  });

  element.appendChild(projectList);

  return element;
}

export default projectRender;
