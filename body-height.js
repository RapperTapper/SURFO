// Body height and width are set to the window height and width respectively
window.addEventListener('load', setBodyDimensions);
window.addEventListener('resize', setBodyDimensions);

function setBodyDimensions() {
    document.body.style.height = `${window.innerHeight}px`;
    document.body.style.width = `${window.innerWidth}px`;
}