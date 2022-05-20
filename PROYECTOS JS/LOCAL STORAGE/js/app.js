//variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];


eventListeners();
//even listeners
function eventListeners() {
    formulario.addEventListener("submit",agregarTweet);

    document.addEventListener("DOMContentLoaded",() => {
        tweets = JSON.parse(localStorage.getItem("tweets")) || [];
        crearHTML();
    });
}


//funciones
function agregarTweet(e) {
    e.preventDefault();
    
    const tweet = document.querySelector("#tweet").value;

    if(tweet === ""){
        mostrarError("Un tweet no puede ser vacio");
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    };

    tweets = [... tweets, tweetObj];
    crearHTML();

    //reiniciar form

    formulario.reset();
}

function mostrarError(error) {
    const mensajeError = document.createElement("p");

    mensajeError.textContent = error;
    mensajeError.classList.add("error");

    const contenido = document.querySelector("#contenido");
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    },3000);
}

function crearHTML() {
    limpiarHTML();
    if(tweets.length > 0){
        tweets.forEach(tweet => {

            const btnEliminar = document.createElement("a");
            btnEliminar.classList.add("borrar-tweet");
            btnEliminar.innerText = "X";

            btnEliminar.onclick = () => {
                borrarTwet(tweet.id);
            };

            const li = document.createElement("li");
            li.innerText = tweet.tweet;

            li.appendChild(btnEliminar);
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

//agregar el local storage
function sincronizarStorage() {
    localStorage.setItem("tweets",JSON.stringify(tweets));
}

function borrarTwet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}

function limpiarHTML() {
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}