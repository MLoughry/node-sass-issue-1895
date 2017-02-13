let styles = require('./styles.scss');
let globalStyles = require('./globalStyles.global.scss');

let testDiv = document.createElement('div');
testDiv.innerText = "Test text";
testDiv.classList.add(styles.container);

document.body.appendChild(testDiv);