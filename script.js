function easeIn() {
    document.body.classList.add('loaded');
}

const nameElement = document.getElementById('interactive-name');
  const letters = nameElement.textContent.split('');
  nameElement.innerHTML = letters
    .map(char => {
      if (char === ' ') return '&nbsp;';
      return `<span class="letter">${char}</span>`;
    })
    .join('');