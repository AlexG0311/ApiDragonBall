async function cargarDetalle() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const personajeId = urlParams.get('id');
        
        if (!personajeId) {
            window.location.href = '../index.html';
            return;
        }

        const response = await fetch(`https://dragonball-api.com/api/characters/${personajeId}`);
        const personaje = await response.json();

        const contenedor = document.getElementById('detalle-container');
        const fragment = document.createDocumentFragment();

        
        const personajePrincipal = document.createElement('div');
        personajePrincipal.classList.add('personaje-principal');

       
        const imagenPrincipal = document.createElement('div');
        imagenPrincipal.classList.add('imagen-principal');
        
        const imgPersonaje = document.createElement('img');
        imgPersonaje.src = personaje.image;
        imgPersonaje.alt = personaje.name;
        imagenPrincipal.appendChild(imgPersonaje);

        
        const infoPrincipal = document.createElement('div');
        infoPrincipal.classList.add('info-principal');

    
        const nombre = document.createElement('h2');
        nombre.textContent = personaje.name;

        
        const statsGrid = document.createElement('div');
        statsGrid.classList.add('stats-grid');

        
        const stats = [
            { label: 'Raza:', value: personaje.race },
            { label: 'Género:', value: personaje.gender },
            { label: 'Base Ki:', value: personaje.ki },
            { label: 'Max Ki:', value: personaje.maxKi },
            { label: 'Afiliación:', value: personaje.affiliation }
        ];

        stats.forEach(stat => {
            const statItem = document.createElement('div');
            statItem.classList.add('stat-item');

            const statLabel = document.createElement('span');
            statLabel.classList.add('stat-label');
            statLabel.textContent = stat.label;

            const statValue = document.createElement('span');
            statValue.classList.add('stat-value');
            statValue.textContent = stat.value;

            statItem.appendChild(statLabel);
            statItem.appendChild(statValue);
            statsGrid.appendChild(statItem);
        });

        // Descripción (si existe)
        if (personaje.description) {
            const description = document.createElement('div');
            description.classList.add('description');
            
            const descParagraph = document.createElement('p');
            descParagraph.textContent = personaje.description;
            description.appendChild(descParagraph);
            
            infoPrincipal.appendChild(nombre);
            infoPrincipal.appendChild(statsGrid);
            infoPrincipal.appendChild(description);
        } else {
            infoPrincipal.appendChild(nombre);
            infoPrincipal.appendChild(statsGrid);
        }

        
        personajePrincipal.appendChild(imagenPrincipal);
        personajePrincipal.appendChild(infoPrincipal);
        fragment.appendChild(personajePrincipal);

    
        if (personaje.originPlanet) {
            const seccionPlaneta = document.createElement('div');
            seccionPlaneta.classList.add('seccion');

            const tituloPlaneta = document.createElement('h3');
            tituloPlaneta.textContent = 'Planeta de origen';

            const planetaCard = document.createElement('div');
            planetaCard.classList.add('planeta-card');

            // Imagen del planeta
            const planetaImagen = document.createElement('div');
            planetaImagen.classList.add('planeta-imagen');
            
            const imgPlaneta = document.createElement('img');
            imgPlaneta.src = personaje.originPlanet.image;
            imgPlaneta.alt = personaje.originPlanet.name;
            planetaImagen.appendChild(imgPlaneta);

           
            const planetaInfo = document.createElement('div');
            planetaInfo.classList.add('planeta-info');

            const nombrePlaneta = document.createElement('h4');
            nombrePlaneta.textContent = personaje.originPlanet.name;

          
            if (personaje.originPlanet.isDestroyed === true) {
                const planetaDestruido = document.createElement('p');
                planetaDestruido.textContent = 'PLANETA DESTRUIDO';
                planetaDestruido.classList.add('planeta-destruido');
                planetaInfo.appendChild(nombrePlaneta);
                planetaInfo.appendChild(planetaDestruido);
            } else {
                planetaInfo.appendChild(nombrePlaneta);
            }

            const descPlaneta = document.createElement('p');
            descPlaneta.classList.add('planeta-desc');
            descPlaneta.textContent = personaje.originPlanet.description || 'Información no disponible';

            planetaInfo.appendChild(descPlaneta);

            planetaCard.appendChild(planetaImagen);
            planetaCard.appendChild(planetaInfo);

            seccionPlaneta.appendChild(tituloPlaneta);
            seccionPlaneta.appendChild(planetaCard);
            fragment.appendChild(seccionPlaneta);
        }

       
        if (personaje.transformations && personaje.transformations.length > 0) {
            const seccionTransformaciones = document.createElement('div');
            seccionTransformaciones.classList.add('seccion');

            const tituloTransformaciones = document.createElement('h3');
            tituloTransformaciones.textContent = `Transformaciones de ${personaje.name}`;

            const transformacionesGrid = document.createElement('div');
            transformacionesGrid.classList.add('transformaciones-grid');

            personaje.transformations.forEach(transformacion => {
                const transformacionCard = document.createElement('div');
                transformacionCard.classList.add('transformacion-card');

                const imgTransformacion = document.createElement('img');
                imgTransformacion.src = transformacion.image;
                imgTransformacion.alt = transformacion.name;

                const nombreTransformacion = document.createElement('h4');
                nombreTransformacion.textContent = transformacion.name;

                const kiTransformacion = document.createElement('p');
                kiTransformacion.textContent = `Ki: ${transformacion.ki}`;

                transformacionCard.appendChild(imgTransformacion);
                transformacionCard.appendChild(nombreTransformacion);
                transformacionCard.appendChild(kiTransformacion);

                transformacionesGrid.appendChild(transformacionCard);
            });

            seccionTransformaciones.appendChild(tituloTransformaciones);
            seccionTransformaciones.appendChild(transformacionesGrid);
            fragment.appendChild(seccionTransformaciones);
        }

       
        contenedor.innerHTML = '';
        contenedor.appendChild(fragment);
        
    } catch (error) {
        console.error('Error:', error);
        
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error');
        
        const errorTitle = document.createElement('h2');
        errorTitle.textContent = 'Error al cargar el personaje';
        
        const errorLink = document.createElement('a');
        errorLink.href = '../index.html';
        errorLink.textContent = 'Volver al inicio';
        
        errorDiv.appendChild(errorTitle);
        errorDiv.appendChild(errorLink);
        
        document.getElementById('detalle-container').appendChild(errorDiv);
    }
}

document.addEventListener('DOMContentLoaded', cargarDetalle);