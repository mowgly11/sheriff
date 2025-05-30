// Load and parse the JSON data
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading data:', error);
        return null;
    }
}

// Render Command Staff Section
function renderCommandStaff(data) {
    const commandStaffSection = document.querySelector('#team');
    const title = commandStaffSection.querySelector('h2');
    title.textContent = data.commandStaff.title;

    const membersContainer = commandStaffSection.querySelector('.grid');
    membersContainer.innerHTML = ''; // Clear existing content

    data.commandStaff.members.forEach(member => {
        const memberCard = `
            <div class="deputy-card">
                <div class="image-container">
                    <img src="${member.image}" alt="${member.name}">
                </div>
                <div class="content">
                    <div class="text-content">
                        <h3>${member.name}</h3>
                        <p class="position">${member.position}</p>
                        <div class="description">
                            <p class="text-gray-300 text-sm">${member.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        membersContainer.innerHTML += memberCard;
    });

    // Update Command Staff Modal
    const modalContent = document.querySelector('#commandStaffModalContent .modal-body .grid');
    modalContent.innerHTML = ''; // Clear existing content

    data.commandStaff.additionalStaff.forEach(member => {
        const memberCard = `
            <div class="deputy-card">
                <div class="image-container">
                    <img src="${member.image}" alt="${member.name}">
                </div>
                <div class="content">
                    <div class="text-content">
                        <h3>${member.name}</h3>
                        <p class="position">${member.position}</p>
                        <div class="description">
                            <p class="text-gray-300 text-sm">${member.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        modalContent.innerHTML += memberCard;
    });
}

// Render Divisions Section
function renderDivisions(data) {
    const divisionsSection = document.querySelector('#divisions');
    const title = divisionsSection.querySelector('h2');
    const subtitle = divisionsSection.querySelector('p');
    
    title.textContent = data.divisions.title;
    subtitle.textContent = data.divisions.subtitle;

    const divisionsContainer = divisionsSection.querySelector('.grid');
    divisionsContainer.innerHTML = ''; // Clear existing content

    data.divisions.divisions.forEach(division => {
        const divisionCard = `
            <div class="division-card">
                <div class="icon-container">
                    <i class="${division.icon}"></i>
                </div>
                <div class="content">
                    <h3>${division.name}</h3>
                    <p class="subtitle">${division.subtitle}</p>
                    <p>${division.description}</p>
                </div>
            </div>
        `;
        divisionsContainer.innerHTML += divisionCard;
    });
}

// Render Memoriam Section
function renderMemoriam(data) {
    const memoriamSection = document.querySelector('#Memoriam');
    const title = memoriamSection.querySelector('h2');
    const subtitle = memoriamSection.querySelector('p');
    
    title.textContent = data.memoriam.title;
    subtitle.textContent = data.memoriam.subtitle;

    const memoriamContainer = memoriamSection.querySelector('.grid');
    memoriamContainer.innerHTML = ''; // Clear existing content

    data.memoriam.fallenHeroes.forEach(hero => {
        const imageClasses = hero.fullscreen 
            ? 'w-full h-full object-cover filter grayscale transition-all duration-500 group-hover:grayscale-0' 
            : `${hero.imageSize.width} ${hero.imageSize.height} object-contain filter grayscale transition-all duration-500 group-hover:grayscale-0`;

        const heroCard = `
            <div class="memorial-card group relative overflow-hidden rounded-xl bg-gray-800 shadow-xl transition-all duration-500 hover:shadow-2xl">
                <div class="relative h-64 overflow-hidden flex items-center justify-center bg-gray-900">
                    <img src="${hero.image}" alt="${hero.name}" class="${imageClasses}" draggable="false">
                </div>
                <div class="p-6 bg-gray-800/95 backdrop-blur-sm">
                    <h3 class="text-2xl font-bold text-yellow-50 mb-1">${hero.name}</h3>
                    <p class="text-yellow-200 text-sm mb-4">End of Watch: ${hero.endOfWatch}</p>
                    <p class="text-gray-300 mb-4 text-center">${hero.description}</p>
                    <div class="flex items-center justify-center">
                        <div class="flex items-center space-x-2">
                            <i class="fas fa-shield-alt text-yellow-500"></i>
                            <span class="text-sm text-gray-400">${hero.yearsOfService} Years of Service</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        memoriamContainer.innerHTML += heroCard;
    });
}

// Render News Section
function renderNews(data) {
    const newsSection = document.querySelector('#newsletter');
    const title = newsSection.querySelector('h2');
    const subtitle = newsSection.querySelector('p');
    
    title.textContent = data.news.title;
    subtitle.textContent = data.news.subtitle;

    const newsContainer = newsSection.querySelector('.grid');
    newsContainer.innerHTML = ''; // Clear existing content

    data.news.articles.forEach((article, index) => {
        const isFullWidth = index === data.news.articles.length - 1;
        const newsCard = `
            <div class="news-card group ${isFullWidth ? 'md:col-span-2' : ''}">
                <div class="image-container">
                    <img src="${article.image}" alt="${article.title}">
                    <div class="category-badge">${article.category}</div>
                </div>
                <div class="content">
                    <div class="date">
                        <i class="far fa-calendar-alt"></i>
                        <span>${article.date}</span>
                    </div>
                    <h3>${article.title}</h3>
                    <p class="excerpt">${article.excerpt}</p>
                    <button onclick="openModal('news${index + 1}')" class="read-more">
                        Read Full Article
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
        newsContainer.innerHTML += newsCard;
    });

    // Update news modal data
    window.newsData = {};
    data.news.articles.forEach((article, index) => {
        window.newsData[`news${index + 1}`] = {
            title: article.title,
            date: article.date,
            category: article.category,
            content: `
                <img src="${article.fullContent.image}" alt="${article.title}">
                ${article.fullContent.paragraphs.map(p => `<p>${p}</p>`).join('')}
                <ul class="list-disc pl-6 mt-4 space-y-2">
                    ${article.fullContent.highlights.map(h => `<li>${h}</li>`).join('')}
                </ul>
            `
        };
    });
}

// Render Latest Upload Section
function renderLatestUpload(data) {
    const uploadSection = document.querySelector('#latestUpload');
    const title = uploadSection.querySelector('h2');
    const subtitle = uploadSection.querySelector('p');
    
    title.textContent = data.latestUpload.title;
    subtitle.textContent = data.latestUpload.subtitle;

    const iframe = uploadSection.querySelector('iframe');
    iframe.src = data.latestUpload.video.url;
    iframe.title = data.latestUpload.video.title;
}

// Initialize the page
async function initializePage() {
    const data = await loadData();
    if (data) {
        renderCommandStaff(data);
        renderDivisions(data);
        renderMemoriam(data);
        renderNews(data);
        renderLatestUpload(data);
    }
}

// Call initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage); 