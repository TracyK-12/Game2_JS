function openModal(gameId) {
    document.getElementById(gameId).style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => modal.style.display = "none");
    document.getElementById("overlay").style.display = "none";
}

function calculAge() {
    let y = parseInt(document.getElementById("Anneeactuelle").value);
    let a = parseInt(document.getElementById("AnneeNaissance").value);

    if (isNaN(y) || isNaN(a)) {
        document.getElementById("ageResult").innerText = "Veuillez entrer des valeurs valides!";
    } else {
        let resultat = y - a;
        document.getElementById("ageResult").innerText = "Vous avez " + resultat + " ans.";
    }
}

function discoverYear() {
    let age = parseInt(document.getElementById("userAge").value);
    let currentYear = new Date().getFullYear();
    if (isNaN(age) || age < 0) {
        document.getElementById("yearResult").innerText = "Veuillez entrer un âge valide!";
        return;
    }
    let birthYear = currentYear - age;
    document.getElementById("yearResult").innerText = "Votre année de naissance est " + birthYear + ".";
}

function calculateMultiplication() {
    let num1 = parseFloat(document.getElementById("num1").value);
    let num2 = parseFloat(document.getElementById("num2").value);

    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById("multiplicationResult").innerText = "Veuillez entrer deux nombres valides.";
    } else {
        let result = num1 * num2;
        document.getElementById("multiplicationResult").innerText = "Le résultat est : " + result;
    }
}

// script jeu de mots tech

let chosenWord = "";
let scrambledWord = "";

// Mélanger les lettres d'un mot
function shuffleWord(word) {
return word.split('').sort(() => Math.random() - 0.5).join('');
}

// Récupérer un mot informatique aléatoire depuis l'API Datamuse
async function fetchTechWord() {
try {
let response = await fetch("https://api.datamuse.com/words?ml=technology&max=50");
let words = await response.json();

if (words.length > 0) {
    chosenWord = words[Math.floor(Math.random() * words.length)].word; // Choisir un mot aléatoire
    scrambledWord = shuffleWord(chosenWord); // Mélanger les lettres
    document.getElementById("scrambledWord").innerText = scrambledWord;
    document.getElementById("wordResult").innerText = "";
    document.getElementById("userGuess").value = "";
    openModal("wordGame"); // Afficher la modal du jeu
} else {
    console.error("Aucun mot trouvé !");
    document.getElementById("scrambledWord").innerText = "Erreur, réessayez !";
}
} catch (error) {
console.error("Erreur lors de la récupération des mots :", error);
document.getElementById("scrambledWord").innerText = "Erreur de connexion !";
}
}

// Vérifier si l'utilisateur a trouvé le bon mot
function checkWord() {
let userGuess = document.getElementById("userGuess").value.toLowerCase().trim();
if (userGuess === chosenWord) {
document.getElementById("wordResult").innerText = "✅ Bravo ! Vous avez trouvé le mot : " + chosenWord;
} else {
document.getElementById("wordResult").innerText = "❌ Mauvaise réponse. Essayez encore !";
}
}

