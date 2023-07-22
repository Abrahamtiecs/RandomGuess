

let randomNumber = Math.floor(Math.random() * 100)+1;

let guessCount = 1;
let resetButton;

function creerDivAvecBoutons() {
    const divBoutons = document.createElement('div');
    const boutonsTitres = ['Facile', 'Intermédiaire', 'Mortel', 'Vétéran'];

    
    boutonsTitres.forEach((titre) => {
      const bouton = document.createElement('button');
      bouton.textContent = titre;
      bouton.addEventListener('click', () => {
        
        let pseudoInput = document.getElementById('pseudo')
        let pseudo = pseudoInput.value;
        creerNouvelleDivAvecTitre(titre, pseudo);
      });
       // Appliquer la couleur en fonction du titre
      divBoutons.appendChild(bouton);
    });
  
    const conteneur = document.getElementById('conteneur');
    conteneur.appendChild(divBoutons);
    const boutonCreerDiv = document.getElementById('validButton');
    boutonCreerDiv.style.display = 'none'; // Cacher le bouton une fois que la div est créée
  }

function creerNouvelleDivAvecTitre(titre, pseudo) {
    const nouvelleDiv = document.createElement('div');
    nouvelleDiv.textContent = `Vous avez sélectionné : ${titre}`;
    nouvelleDiv.setAttribute('class', 'nouvelleDivStyle');
    const conteneur = document.getElementById('conteneur');
    conteneur.innerHTML = ''; // Supprimer le contenu précédent du conteneur
    conteneur.appendChild(nouvelleDiv);
    let maxGuesses ;
    if (titre === "Facile"){
        maxGuesses = 10
    } else if(titre === 'Intermédiaire'){
        maxGuesses = 7
    } else if(titre === 'Mortel'){
        maxGuesses = 5
    } else if(titre === 'vétéran'){
        maxGuesses = 3
    }
    // Création d'un nouvel élément input
    const choice = document.createElement('input');
    choice.setAttribute('type', 'text');
    choice.setAttribute('class','entry');
    choice.setAttribute('name', 'Choix');
    choice.setAttribute('placeholder', 'Entrez votre nombre ici');
    choice.setAttribute('id','guessField')
    conteneur.appendChild(choice);
    choice.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') { 
        const texteSaisi = choice.value.trim();
        let nombreChoisie = Number(texteSaisi);
        
        if (!isNaN(nombreChoisie)) {
            test(maxGuesses, nombreChoisie, pseudo, choice)
        } else {
          console.log('Veuillez saisir un nombre entier valide.');
        }
      }
    });

    choice.focus()

}
const finalbox = document.getElementById('finalbox')
const guesses = document.createElement('p')
const lastResult = document.createElement('p')
const indices = document.createElement('p')
finalbox.appendChild(guesses)
finalbox.appendChild(lastResult)
finalbox.appendChild(indices)
guesses.textContent = `Propositions précedentes : `
function test(maxGuesses, nombreChoisie, pseudo, choice) {

    if (guessCount === 1) {
        guesses.textContent = 'Propositions précédentes: ';
    }
    guesses.textContent += nombreChoisie + ', ';
    if (nombreChoisie === randomNumber) {
        lastResult.textContent = `Bravo ${pseudo}, vous avez trouvé le nombre !`;
        lastResult.style.color = 'green';
        indices.textContent = '';
        setGameOver(choice)
    } 

    else if (guessCount === maxGuesses) {
        lastResult.textContent = '!!! PERDU!!!';
        
    } 
    
    else {
        alert(randomNumber)
        lastResult.textContent = 'Faux!';
        lastResult.style.color = 'red';

        if (nombreChoisie < randomNumber) {
            indices.textContent = 'Le nombre saisi est trop petit !';
        } else if (nombreChoisie > randomNumber) {
            indices.textContent = 'Le nombre saisi est trop grand !';
        }
        else if (nombreChoisie === randomNumber) {
            alert('why')
        }
    }
    guessCount++;
}


function setGameOver(choice) {
    choice.disabled = true;
    resetButton = document.createElement('button')
    resetButton.textContent = 'Recommencer'
    finalbox.appendChild(resetButton)
    randomNumber = Math.floor(Math.random() * 100) + 1;
    change = document.createElement('a');
    change.textContent = 'Changer le level';
    change.href ='#';
    finalbox.appendChild(change)
    change.addEventListener('click',() =>{
        levelChange(resetButton,choice,lastResult,guesses,indices)
    });
    resetButton.addEventListener('click', () =>{
        resetGame(resetButton, lastResult, choice, guesses, indices)
    })
}

function resetGame(resetButton, lastResult, choice, guesses, indices){
    guessCount = 1;
    let resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0 ; i < resetParas.length ; i++) {
        resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);
    choice.disabled = false;
    lastResult.innerHTML = ''
    guesses.innerHTML = '';
    indices.innerHTML = '';
    choice.value = '';
    choice.focus();
    lastResult.style.backgroundColor = 'white';



}

function levelChange(resetButton,choice,lastResult,guesses,indices){
    resetButton.parentNode.removeChild(resetButton);
    change.parentNode.removeChild(change);
    choice.disabled = false;
    lastResult.innerHTML = ''
    guesses.innerHTML = '';
    indices.innerHTML = '';
    choice.value = '';
    choice.focus();

    lastResult.style.backgroundColor = 'white';
    creerDivAvecBoutons()
}

// Écouteur d'événement pour déclencher la création de la div avec les boutons
const boutonCreerDiv = document.getElementById('validButton');
boutonCreerDiv.addEventListener('click', creerDivAvecBoutons);
const conteneur = document.getElementById('conteneur');
conteneur.setAttribute('class', 'conteneur');
