# Proyecto de Noticias en Tiempo Real

## Descripción del Proyecto
Este proyecto es una aplicación web que muestra noticias en tiempo real utilizando la API de NewsAPI. Las noticias se actualizan automáticamente cada 10 segundos y se obtienen de fuentes confiables que siempre incluyen imágenes, garantizando una experiencia visual atractiva.

## Características

- *Noticias en tiempo real:* La aplicación actualiza las noticias automáticamente cada 10 segundos para mantener la información actualizada.
- *Visualización de noticias con imágenes:* Todas las noticias mostradas incluyen imágenes, asegurando una presentación visual atractiva.
- *Rotación entre fuentes confiables:* Las noticias provienen de fuentes reconocidas y confiables como:
  - BBC News
  - CNN
  - The Verge
  - Reuters
  - Al Jazeera English
  # Instrucciones para Ejecutar la Aplicación

## Requisitos Previos

Para ejecutar esta aplicación, necesitarás:

- Un navegador web moderno (Chrome, Firefox, Safari, etc.).
- Conexión a Internet.
- Un servidor local o un entorno que soporte la ejecución de archivos HTML y JavaScript.

## Pasos para Ejecutar la Aplicación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/proyecto-noticias.git
cd proyecto-noticias
```
### 2. Abrir el Archivo HTML

1. Navega a la carpeta del proyecto utilizando el explorador de archivos de tu sistema operativo.
2. Abre el archivo index.html en tu navegador web.
3. La aplicación se iniciará automáticamente y comenzará a mostrar noticias en tiempo real.

## Descripción de la API Utilizada: NewsAPI

La aplicación utiliza la API de NewsAPI para obtener noticias en tiempo real. A continuación se detallan los aspectos clave de la API:

- *URL Base:* https://newsapi.org/v2/top-headlines
- *Parámetros Principales:*
  - sources: Define la fuente de noticias.
    - Ejemplos: bbc-news, cnn, the-verge, reuters, al-jazeera-english.
  - apiKey: Tu clave API personal para autenticar las solicitudes. *Reemplázala con tu clave API.*
  - pageSize: Número de artículos a obtener en cada solicitud. En este proyecto, se obtienen 5 noticias a la vez.
- *Respuesta:* La API devuelve un objeto JSON con una lista de artículos de noticias. Cada artículo incluye:
  - *Título*
  - *Descripción*
  - *URL de la noticia*
  - *URL de la imagen asociada*

## Conexión de la Aplicación a la API

La aplicación se conecta a la API de NewsAPI utilizando solicitudes fetch en JavaScript. Se utilizan fuentes confiables que incluyen imágenes en sus artículos. Cada 10 segundos, se realiza una nueva solicitud para actualizar las noticias en la página.
``` javascript
const apiKey = 'fd27ef3aec824f4385b403377427d71a';
const sources = ['bbc-news', 'cnn', 'the-verge', 'reuters', 'al-jazeera-english']; // Fuentes confiables que incluyen imágenes
let currentSourceIndex = 0;
const pageSize = 5;
const defaultImage = 'https://via.placeholder.com/300x200'; // Imagen predeterminada si no hay imagen

const loadNews = async () => {
    try {
        // Obtener la fuente actual
        const source = sources[currentSourceIndex];

        // Construir la URL de la API con la fuente actual
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}&pageSize=${pageSize}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.articles.length === 0) {
            console.log('No more news available.');
            return;
        }

        const container = document.getElementById('news-container');
        container.innerHTML = ''; // Limpiar las noticias anteriores

        data.articles.forEach(article => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';

            newsItem.innerHTML = `
                <img src="${article.urlToImage || defaultImage}" alt="${article.title}">
                <div class="content">
                    <h2>${article.title}</h2>
                    <p>${article.description || 'No description available'}</p>
                    <a href="${article.url}" target="_blank">Leer más</a>
                </div>
            `;

            container.appendChild(newsItem);
        });

        // Avanzar a la siguiente fuente en la lista
        currentSourceIndex = (currentSourceIndex + 1) % sources.length;

    } catch (error) {
        console.error('Error fetching news:', error);
    }
};
```
```javascript
loadNews();
setInterval(loadNews, 10000);
```
