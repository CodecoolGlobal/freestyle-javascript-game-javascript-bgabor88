var modalsIntro = [];

  modalsIntro.push({title: 'Welcome to the tutorial!', text: 'In this tutorial, you will learn the basics of Game of Pairs.' });

  modalsIntro.push({title: 'Flipping a card', text: 'Click on the first card to reveal it´s content.' });

Swal.queue(modalsIntro);

function firstClick () {
  Swal.fire('Any fool can use a computer')
}

cards = document.querySelectorAll('.memory-card-easy');
cards.forEach(card => card.addEventListener('click', firstClick));