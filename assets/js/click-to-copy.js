document.addEventListener('DOMContentLoaded', function() {
  let codeListings = document.querySelectorAll('.highlight pre');

  for (let index = 0; index < codeListings.length; index++) {
    const codeSample = codeListings[index].querySelector('code');
    if (!codeSample) continue;

    const copyButton = document.createElement('button');
    copyButton.type = 'button';
    copyButton.title = 'Copy to clipboard';
    copyButton.className = 'td-click-to-copy';
    
    copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z"/><path d="M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z"/></svg>';
    
    copyButton.onclick = function() {
      copyCode(codeSample, copyButton);
    };

    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'click-to-copy';
    buttonDiv.appendChild(copyButton);
    
    codeListings[index].insertBefore(buttonDiv, codeSample);
  }
});

function copyCode(codeSample, button) {
  const isConsoleBlock = codeSample.matches(
    "code[data-lang='console'], code.language-console"
  );
  let text;

  if (isConsoleBlock) {
    const clone = codeSample.cloneNode(true);
    pruneUnselectableElements(codeSample, clone);
    text = clone.textContent;
    text = text.replace(/^ /gm, '');
  } else {
    text = codeSample.textContent;
  }
  text = text ? text.trim() : '';
  
  navigator.clipboard.writeText(text + '\n').then(function() {
    button.title = 'Copied!';
    setTimeout(function() {
      button.title = 'Copy to clipboard';
    }, 2000);
  });
}

function pruneUnselectableElements(sourceNode, cloneNode) {
  const sourceChildren = sourceNode.children;
  const cloneChildren = cloneNode.children;

  for (let i = sourceChildren.length - 1; i >= 0; i--) {
    const sourceChild = sourceChildren[i];
    const cloneChild = cloneChildren[i];
    const style = window.getComputedStyle(sourceChild);
    const unselectable =
      style.userSelect === 'none' || style.webkitUserSelect === 'none';

    if (unselectable) {
      cloneChild.remove();
      continue;
    }

    pruneUnselectableElements(sourceChild, cloneChild);
  }
}
