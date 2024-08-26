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

// Cargar noticias al inicio y luego reemplazar cada 10 segundos
loadNews();
setInterval(loadNews, 10000);


