// Read title section
fetch('/public/static-text.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('title').textContent = data.title;
        document.getElementById('description').textContent = data.description;
    })
    .catch(err => console.error('Error loading text:', err));

fetch('/public/header.json')
    .then(res => res.json())
    .then(data => {
        // Find hero section
        const hero = data.body.sections.find(sec => sec.id === 'hero');
        console.log('Hero section heading:', hero.heading);
        console.log('Hero section tagline:', hero.tagline);
        // Set heading
        document.getElementById('hero-heading').textContent = hero.heading;

        // Set tagline
        document.querySelector('#hero-tagline em').textContent = hero.tagline;

        // Join content with <br> for banner
        document.getElementById('hero-content').innerHTML =
            hero.content.join('<br>');

    })
    .catch(err => console.error('Failed to load hero content:', err));
