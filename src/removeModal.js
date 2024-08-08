/**
 * Constructs a modal dialoge with a confirm button that when pressed, executes the callback function provided.
 *
 * @param {any} text Text to be displayed on the modal.
 * @param {any} confirmCallback Callback to be called when the confirm button is pressed.
 * @returns {} The modal element constructed.
 */
function confirmModal(text, confirmCallback, confirmButtonText = 'Confirm') {
  const element = document.createElement('dialog');
  element.classList.add('confirm-modal');
  element.addEventListener('click', (e) => {
    if (e.target == element) {
      element.remove();
      element.close();
    }
  });

  const confirmText = document.createElement('p');
  confirmText.classList.add('confirm-modal__text');
  confirmText.textContent = text;

  const buttons = document.createElement('div');
  buttons.classList.add('confirm-modal__buttons');

  const confirmButton = document.createElement('button');
  confirmButton.classList.add('confirm-modal__confirm-button');
  confirmButton.textContent = confirmButtonText;
  confirmButton.addEventListener('click', () => {
    element.close();
    element.remove();
    if (confirmCallback) {
      confirmCallback();
    }
    PubSub.publish('save');
  });

  const cancelButton = document.createElement('button');
  cancelButton.classList.add('confirm-modal__cancel-button');
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', () => {
    element.close();
    element.remove();
  });

  buttons.appendChild(confirmButton);
  buttons.appendChild(cancelButton);
  element.appendChild(confirmText);
  element.appendChild(buttons);

  document.querySelector('body').appendChild(element);

  return element;
}

export default confirmModal;
