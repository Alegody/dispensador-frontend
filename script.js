const petSelect = document.getElementById('petSelect');
const petIcon = document.getElementById('petIcon');
const comidaAbrirBtn = document.getElementById('comidaAbrir');
const comidaCerrarBtn = document.getElementById('comidaCerrar');

// Endpoint base
const API_BASE = 'https://136b-138-186-61-62.ngrok-free.app';

function actualizarEstiloMascota() {
  const tipo = petSelect.value;

  petIcon.classList.remove('gato', 'perro', 'gallina');

  if (tipo === 'gato') {
    petIcon.innerHTML = '<i class="fas fa-cat fa-3x"></i>';
    petIcon.classList.add('gato');
    comidaAbrirBtn.style.background = "#ffc107";
    comidaCerrarBtn.style.background = "#ff9800";
  } else if (tipo === 'perro') {
    petIcon.innerHTML = '<i class="fas fa-dog fa-3x"></i>';
    petIcon.classList.add('perro');
    comidaAbrirBtn.style.background = "#8b4513";
    comidaCerrarBtn.style.background = "#a0522d";
  } else if (tipo === 'gallina') {
    petIcon.innerHTML = '<i class="fas fa-dove fa-3x"></i>'; // dove como gallina
    petIcon.classList.add('gallina');
    comidaAbrirBtn.style.background = "#e0b800";
    comidaCerrarBtn.style.background = "#c99700";
  }
}

petSelect.addEventListener('change', actualizarEstiloMascota);
document.addEventListener('DOMContentLoaded', actualizarEstiloMascota);

function controlarComida() {
  Swal.fire({
    title: 'Abriendo dispensador...',
    html: 'Espere mientras se dispensa la comida.<br><br><button id="btnParar" class="btn btn-danger mt-3">🚨 Parar</button>',
    icon: 'info',
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();

      // Botón de emergencia
      const btnParar = Swal.getHtmlContainer().querySelector('#btnParar');
      btnParar.addEventListener('click', () => {
        fetch(`${API_BASE}/cerrar`, {
          method: 'POST'
        })
          .then(() => {
            Swal.fire('¡Detenido!', 'El dispensador fue cerrado correctamente.', 'success');
          })
          .catch(() => {
            Swal.fire('Error', 'No se pudo detener el dispensador.', 'error');
          });
      });

      // Apertura normal
      fetch(`${API_BASE}/abrir`, {
        method: 'POST'
      })
        .then(res => res.json())
        .then(data => {
          console.log('Apertura exitosa:', data);
          // Cierra el modal automáticamente después de un tiempo (opcional)
          setTimeout(() => {
            Swal.close();
          }, 20000); // 20 segundos
        })
        .catch(err => {
          console.error(err);
          Swal.fire('Error', 'No se pudo abrir el dispensador.', 'error');
        });
    }
  });
}

function cerrarComida() {
  Swal.fire({
    title: 'Cerrando dispensador...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();

      fetch(`${API_BASE}/cerrar`, {
        method: 'POST'
      })
        .then(res => res.json())
        .then(data => {
          Swal.fire('Éxito', 'Dispensador cerrado correctamente.', 'success');
        })
        .catch(err => {
          console.error(err);
          Swal.fire('Error', 'No se pudo cerrar el dispensador.', 'error');
        });
    }
  });
}

comidaAbrirBtn.addEventListener('click', controlarComida);
comidaCerrarBtn.addEventListener('click', cerrarComida);
