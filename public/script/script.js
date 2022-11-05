function handleCloseMessage(closeIcon) {

   document.querySelector('.message').classList.add('hidden');
}

function handleSendData() {
   document.querySelector('.uploading').style.display = "block";
}

function handleUpdateData() {
   document.querySelector('.update').style.display = "block";
}

function getFile() {

   const nroSec = document.querySelector('.input-secuencia').value;

   fetch(`https://fayfaviposis.herokuapp.com/data/secuencia?nroSec=${nroSec}`)
      .then((response) => response.json())
      .then(json => {
         console.log(json);
         if (json) {
            document.querySelector('.mensaje-secuencia').classList.add('mensaje-none');
            return downloadTextFile(JSON.stringify(json), `${nroSec}.json`);
         }
         noExisteSecuencia(nroSec);
      })
      .catch(err => console.log('Solicitud fallida', err));

}


function downloadTextFile(text, name) {
   const a = document.createElement('a');
   const type = name.split(".").pop();
   a.href = URL.createObjectURL(new Blob([text], { type: `text/${type === "txt" ? "plain" : type}` }));
   a.download = name;
   a.click();
}

function noExisteSecuencia(nroSec) {

   const parrafo = document.querySelector('.mensaje-secuencia')
   parrafo.classList.remove('mensaje-none');

   if (nroSec) {
      parrafo.innerHTML = `El N° de secuencia ${nroSec} no existe`;
   } else {
      parrafo.innerHTML = `Ingrese un N° de secuencia`;
   }

}

const input = document.querySelector('.input-secuencia');

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (event) {
   // If the user presses the "Enter" key on the keyboard
   if (event.key === "Enter") {
      document.querySelector('.btn-secuencia').focus()
   }
})