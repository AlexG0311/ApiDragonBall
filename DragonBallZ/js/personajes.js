async function cargarPersonajes() {
    try {
        const response = await fetch('https://dragonball-api.com/api/characters?limit=50');
        const data = await response.json();
        const personajes = data.items;

        const contenedor = document.getElementById('personajes-container');
        const fragment = document.createDocumentFragment();

        personajes.forEach(personaje => {
            const personajeCard = document.createElement('div');
            personajeCard.classList.add('personaje-card');
            
            
            personajeCard.style.cursor = 'pointer';
            personajeCard.addEventListener('click', () => {
         
                window.location.href = `html/detalle.html?id=${personaje.id}`;
            });

        
            const imagen = document.createElement('img');
            imagen.src = personaje.image;
            imagen.alt = personaje.name;
            imagen.classList.add('personaje-imagen');

            
            const cardInfo = document.createElement('div');
            cardInfo.classList.add('card-info');

            
            const nombre = document.createElement('h3');
            nombre.textContent = personaje.name;
            nombre.classList.add('car-nombre');

            
            const race = document.createElement('p');
            race.textContent = `${personaje.race} - ${personaje.gender}`;
            race.classList.add('car-race-gender');

            
            const baseKiGroup = document.createElement('div');
            baseKiGroup.classList.add('stat-group');
            
            const baseKiLabel = document.createElement('p');
            baseKiLabel.textContent = "Base Ki";
            baseKiLabel.classList.add('stat-label');
            
            const baseKiValue = document.createElement('p');
            baseKiValue.textContent = personaje.ki;
            baseKiValue.classList.add('stat-value');

            
            const maxKiGroup = document.createElement('div');
            maxKiGroup.classList.add('stat-group');
            
            const maxKiLabel = document.createElement('p');
            maxKiLabel.textContent = "Max Ki";
            maxKiLabel.classList.add('stat-label');
            
            const maxKiValue = document.createElement('p');
            maxKiValue.textContent = personaje.maxKi;
            maxKiValue.classList.add('stat-value');

            
            const afiliacionGroup = document.createElement('div');
            afiliacionGroup.classList.add('stat-group');
            
            const afiliacionLabel = document.createElement('p');
            afiliacionLabel.textContent = "Affiliation";
            afiliacionLabel.classList.add('stat-label');
            
            const afiliacionValue = document.createElement('p');
            afiliacionValue.textContent = personaje.affiliation;
            afiliacionValue.classList.add('stat-value');

            
            baseKiGroup.appendChild(baseKiLabel);
            baseKiGroup.appendChild(baseKiValue);
            
            maxKiGroup.appendChild(maxKiLabel);
            maxKiGroup.appendChild(maxKiValue);
            
            afiliacionGroup.appendChild(afiliacionLabel);
            afiliacionGroup.appendChild(afiliacionValue);

            cardInfo.appendChild(nombre);
            cardInfo.appendChild(race);
            cardInfo.appendChild(baseKiGroup);
            cardInfo.appendChild(maxKiGroup);
            cardInfo.appendChild(afiliacionGroup);

            personajeCard.appendChild(imagen);
            personajeCard.appendChild(cardInfo);
            
            fragment.appendChild(personajeCard);
        });

        contenedor.appendChild(fragment);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', cargarPersonajes);