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
    listItem.innerHTML = `
        <img src="${user.fotografia}" alt="Foto de ${user.nombre}">
        <p><strong>Nombre:</strong> ${user.nombre}</p>
        <p><strong>Género:</strong> ${user.genero}</p>
        <p><strong>Ubicación:</strong> ${user.ubicacion}</p>
        <p><strong>Correo:</strong> ${user.correo}</p>
        <p><strong>Fecha de Nacimiento:</strong> ${user.fechaNacimiento}</p>
    `;
    userList.appendChild(listItem);
    });
}

  // Llamar a la función para obtener y mostrar los datos
fetchUserData().then(users => {
    displayUsers(users);
});
