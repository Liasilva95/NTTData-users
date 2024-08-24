//Function
function fetchUserData() {
    const apiUrl = 'https://randomuser.me/api/?results=10'; // URL de la API

    return fetch(apiUrl)
    .then(function(response) {
        return response.json();
    })
    .then((data) => {
        if (data.results) {
        return data.results.map(user => ({
            nombre: `${user.name.first} ${user.name.last}`,
            genero: user.gender,
            ubicacion: `${user.location.city}, ${user.location.country}`,
            correo: user.email,
            fechaNacimiento: new Date(user.dob.date).toLocaleDateString(),
            fotografia: user.picture.thumbnail
        }));
        } else {
        return [];
        }
    })
    .catch((error) => {
        throw error;
    });
}

function displayUsers(users) {
    const userList = document.getElementById('user-list');
    users.forEach(user => {
    const listItem = document.createElement('li');

    const greenBox = document.createElement('div');
    greenBox.classList.add('blue-box');

    const img = document.createElement('img');
    img.src = user.fotografia;
    img.alt = `Foto de ${user.nombre}`;

    greenBox.appendChild(img);

    listItem.innerHTML = `
        <p class="nombre-estilo">${user.nombre}</p>
        <p><strong>Género:</strong> ${user.genero}</p>
        <p><strong>Ubicación:</strong> ${user.ubicacion}</p>
        <p><strong>Correo:</strong> ${user.correo}</p>
        <p><strong>Fecha de Nacimiento:</strong> ${user.fechaNacimiento}</p>
    `;
    // Crear contenedor para los iconos
    const iconContainer = document.createElement('div');
    iconContainer.classList.add('icon-container');
    
     // Agregar iconos personalizados
    const icon1 = document.createElement('img');
    icon1.src = 'img/Daco_1015915.png';
    icon1.alt = 'Icono de linkedin';

    const icon2 = document.createElement('img');
    icon2.src = 'img/Daco_4044368.png';
    icon2.alt = 'Icono de Facebook';

    const icon3 = document.createElement('img');
    icon3.src = 'img/Daco_5775016.png'; 
    icon3.alt = 'Icono de Correo';

    iconContainer.appendChild(icon1);
    iconContainer.appendChild(icon2);
    iconContainer.appendChild(icon3);

    listItem.appendChild(iconContainer);
    listItem.insertBefore(greenBox, listItem.firstChild);
    userList.appendChild(listItem);
    });
}

  // Llamar a la función para obtener y mostrar los datos
fetchUserData().then(users => {
    displayUsers(users);
});
