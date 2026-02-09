const colors = [
    "festival-red",
    "festival-gold",
    "festival-orange",
    "festival-pink",
    "festival-green"
];


fetch('/public/header.json')
    .then(res => res.json())
    .then(data => {

        ///////////////////////////////////////////////////////////////
        // Find about section
        const about = data.body.sections.find(sec => sec.id === 'about');
        /*console.log('about section heading:', about.heading);*/

        // Set heading
        document.getElementById('about-heading').textContent = about.heading;

        // Join content with <br> for banner
        document.getElementById('about-tagline').innerHTML =
            about.tagline.join('<br>');

        // Join content with <br> for banner
        document.getElementById('about-content').innerHTML =
            about.content.join('<br>');

        ///////////////////////////////////////////////////////////////
        // Find contact section
        const contact = data.body.sections.find(sec => sec.id === 'contact');
        document.getElementById('contact-title').textContent = contact.heading;

        contactsection = document.getElementById('contact')
        contactsection.innerHTML = '';

        //console.log('Contact info:', contact.content);
        contact.content.forEach(item => {
            const li = document.createElement('p');
            li.className = 'contact-section';
            //console.log('Festival title:', item.title);

            li.innerHTML = `
            <strong>${item.title}:</strong> ${item.description}
            ` ;

            contactsection.appendChild(li);
        });

    })
    .catch(err => console.error('Failed to load body content:', err));

fetch('/public/header.json')
    .then(res => res.json())
    .then(data => {

        const festivals = data.body.sections.find(sec => sec.id === 'festivals');
        document.getElementById('festivals-title').textContent = festivals.heading;
        const list = document.getElementById('item_list');
        list.innerHTML = '';
        //console.log('Festival List:', festivals.content);
        //festivals.content.forEach(item => {
        //    const li = document.createElement('li');
        //    li.className = 'festival-section';
        //    //console.log('Festival title:', item.title);

        //    li.innerHTML = `
        //    <strong>${item.title}:</strong> ${item.description}
        //    ` ;

        //    list.appendChild(li);
        //});

        festivals.content.forEach((festival, index) => {
            item_list.innerHTML += `
            <div class="festival-card ${colors[index % colors.length]}">
            <h3>${festival.title}</h3>
            <p>${festival.description}</p>
            </div>
            `;
        });

        festivals.content.forEach(item => {

            item_list.innerHTML += `
         <div class="festival-card ${colors[index % colors.length]}">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
          ` ;
           
        });

    })
    .catch(err => console.error('Failed to load list:', err));
