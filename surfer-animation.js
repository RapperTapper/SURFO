
function startShaking() {
    const imageElement = document.getElementById('surfer-moving');
    imageElement.classList.add('shake');
}

function stopShaking() {
    const imageElement = document.getElementById('surfer-moving');
    imageElement.classList.remove('shake');
}

// Start shaking when the page loads
window.onload = startShaking;
