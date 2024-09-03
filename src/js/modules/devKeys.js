export default function devKeys(errPopup) {
  document.addEventListener('keydown', (event) => {
    if (
      event.code == 'KeyL' &&
      event.shiftKey &&
      (event.ctrlKey || event.metaKey)
    ) {
      localStorage.clear();
      errPopup.querySelector('.message').innerHTML = 'Local Storage Cleared';
      errPopup.showModal();
    }

    if (
      event.code == 'KeyK' &&
      event.shiftKey &&
      (event.ctrlKey || event.metaKey)
    ) {
      errPopup.querySelector('.message').innerHTML = 'Test error';
      errPopup.showModal();
    }
  });
}
