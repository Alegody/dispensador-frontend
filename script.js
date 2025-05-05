const petSelect = document.getElementById('petSelect');
const petIcon = document.getElementById('petIcon');
const comidaBotones = document.querySelectorAll('.btn-comida');

function actualizarEstiloMascota() {
  if (petSelect.value === 'gato') {
    petIcon.innerHTML = '<i class="fas fa-cat"></i>';
    petIcon.classList.remove('perro');
    petIcon.classList.add('gato');

    comidaBotones.forEach(btn => {
      btn.style.background = "linear-gradient(135deg, #ffeb3b 25%, #ff9800 25%, #ff9800 50%, #ffeb3b 50%, #ffeb3b 75%, #ff9800 75%)";
      btn.style.backgroundSize = "40px 40px";
      btn.style.backgroundPosition = "0 0";
      btn.style.borderColor = "#ff9800";
    });

  } else {
    petIcon.innerHTML = '<i class="fas fa-dog"></i>';
    petIcon.classList.remove('gato');
    petIcon.classList.add('perro');

    comidaBotones.forEach(btn => {
      btn.style.background = "#8b4513";
      btn.style.borderColor = "#8b4513";
    });
  }
}

petSelect.addEventListener('change', actualizarEstiloMascota);

document.addEventListener('DOMContentLoaded', () => {
  actualizarEstiloMascota();
});

function enviarComandoAgua(accion) {
  const url = accion === "abrir" 
    ? 'http://10.40.0.8:5000/desactivar' 
    : 'http://10.40.0.8:5000/activar';

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tipo: 'agua', accion })
  })
    .then(res => res.json())
    .then(data => alert(data.mensaje))
    .catch(err => console.error('Error:', err));
}