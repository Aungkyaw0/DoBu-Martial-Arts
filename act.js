// Shring margins for large view screen and remove shrinking form small screen
function applyDesktopStyles() {
    const desktopStyles = document.getElementById('desktop-styles');
  if (window.innerWidth >= 992) {
    if (!desktopStyles) {
      const styleElement = document.createElement('style');
      styleElement.id = 'desktop-styles';
      styleElement.textContent = `
                body{
        margin-left: 70px;
        margin-right: 70px;
        }
      `;
      document.head.appendChild(styleElement);
    }
  } else {
    if (desktopStyles) {
      desktopStyles.remove();
    }
  }
}





