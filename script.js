const exteriorScene = document.getElementById('exterior');
const interiorScene = document.getElementById('interior');
const messageboardScene = document.getElementById('messageboard');
const doorOverlay = document.getElementById('doorOverlay');
const doorOverlay2 = document.getElementById('doorOverlay2');
const wallOverlay = document.getElementById('wallOverlay');
const wallOverlay4 = document.getElementById('wallOverlay4');
const writeMessageBtn = document.getElementById('writeMessageBtn');

// Create door outline
const doorOutline = document.createElement('div');
doorOutline.className = 'door-outline';
doorOverlay.appendChild(doorOutline);

const doorText = document.createElement('div');
doorText.className = 'door-text';
doorText.textContent = "enter rita's room";
doorOutline.appendChild(doorText);

// Create door2 outline
const doorOutline2 = document.createElement('div');
doorOutline2.className = 'door-outline';
doorOverlay2.appendChild(doorOutline2);

const doorText2 = document.createElement('div');
doorText2.className = 'door-text';
doorText2.textContent = "leave rita's room";
doorOutline2.appendChild(doorText2);

// Create wall outline
const wallOutline = document.createElement('div');
wallOutline.className = 'wall-outline';
wallOverlay.appendChild(wallOutline);

const wallText = document.createElement('div');
wallText.className = 'wall-text';
wallText.textContent = "view messages";
wallOutline.appendChild(wallText);

// Create wallOverlay4 outline
const wallOutline4 = document.createElement('div');
wallOutline4.className = 'wall-outline';
wallOverlay4.appendChild(wallOutline4);

const wallText4 = document.createElement('div');
wallText4.className = 'wall-text';
wallText4.textContent = "go back";
wallOutline4.appendChild(wallText4);

// Create write message outline
const writeMessageOutline = document.createElement('div');
writeMessageOutline.className = 'write-message-outline';
writeMessageBtn.appendChild(writeMessageOutline);

const writeMessageText = document.createElement('div');
writeMessageText.className = 'write-message-text';
writeMessageText.textContent = "write a message";
writeMessageOutline.appendChild(writeMessageText);

// Messages storage
let messages = [];

// Position functions
function positionDoor() {
    const container = document.querySelector('.scene-container');
    const doorX = container.offsetWidth * 0.35;            
    const doorY = container.offsetHeight * 0.2;
    const doorWidth = 400;
    const doorHeight = 500;

    doorOverlay.style.left = doorX + 'px';
    doorOverlay.style.top = doorY + 'px';
    doorOverlay.style.width = doorWidth + 'px';
    doorOverlay.style.height = doorHeight + 'px';

    doorOutline.style.left = '0';
    doorOutline.style.top = '0';
    doorOutline.style.width = doorWidth + 'px';
    doorOutline.style.height = doorHeight + 'px';
}

function positionDoor2() {
    const container = document.querySelector('.scene-container');
    const doorX = container.offsetWidth * 0.1;
    const doorY = container.offsetHeight * 0.25;
    const doorWidth = 300;
    const doorHeight = 400;

    doorOverlay2.style.left = doorX + 'px';
    doorOverlay2.style.top = doorY + 'px';
    doorOverlay2.style.width = doorWidth + 'px';
    doorOverlay2.style.height = doorHeight + 'px';

    doorOutline2.style.left = '0';
    doorOutline2.style.top = '0';
    doorOutline2.style.width = doorWidth + 'px';
    doorOutline2.style.height = doorHeight + 'px';
}

function positionWall() {
    const container = document.querySelector('.scene-container');
    const wallX = container.offsetWidth * 0.5;
    const wallY = container.offsetHeight * 0.3;
    const wallWidth = 400;
    const wallHeight = 300;

    wallOverlay.style.left = wallX + 'px';
    wallOverlay.style.top = wallY + 'px';
    wallOverlay.style.width = wallWidth + 'px';
    wallOverlay.style.height = wallHeight + 'px';

    wallOutline.style.left = '0';
    wallOutline.style.top = '0';
    wallOutline.style.width = wallWidth + 'px';
    wallOutline.style.height = wallHeight + 'px';
}

function positionWallOverlay4() {
    const container = document.querySelector('.scene-container');
    const wallX = 20;
    const wallY = 20;
    const wallWidth = 120;
    const wallHeight = 45;

    wallOverlay4.style.left = wallX + 'px';
    wallOverlay4.style.top = wallY + 'px';
    wallOverlay4.style.width = wallWidth + 'px';
    wallOverlay4.style.height = wallHeight + 'px';

    wallOutline4.style.left = '0';
    wallOutline4.style.top = '0';
    wallOutline4.style.width = wallWidth + 'px';
    wallOutline4.style.height = wallHeight + 'px';
}

// Initialize positions
positionDoor();
positionDoor2();
positionWall();
positionWallOverlay4();

window.addEventListener('resize', positionDoor);
window.addEventListener('resize', positionDoor2);
window.addEventListener('resize', positionWall);
window.addEventListener('resize', positionWallOverlay4);

// Render messages
let draggedCard = null;
let offsetX = 0;
let offsetY = 0;

function renderMessages() {
    const container = document.getElementById('messagesContainer');
    container.innerHTML = '';
    
    messages.forEach((msg) => {
        const card = document.createElement('div');
        card.className = 'message-card';
        
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = msg.text;
        
        const messageName = document.createElement('div');
        messageName.className = 'message-name';
        messageName.textContent = `— ${msg.name || 'Unknown'}`;
        
        card.appendChild(messageText);
        card.appendChild(messageName);
        
        const randomX = Math.random() * (window.innerWidth - 150);
        const randomY = Math.random() * (window.innerHeight - 80);
        
        card.style.left = randomX + 'px';
        card.style.top = randomY + 'px';
        card.style.width = (80 + Math.random() * 120) + 'px';
        card.style.height = (60 + Math.random() * 80) + 'px';
        
        // Drag functionality
        card.addEventListener('mousedown', (e) => {
            draggedCard = card;
            const rect = card.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            card.style.zIndex = 1000;
        });
        
        container.appendChild(card);
    });
}

document.addEventListener('mousemove', (e) => {
    if (draggedCard) {
        draggedCard.style.left = (e.clientX - offsetX) + 'px';
        draggedCard.style.top = (e.clientY - offsetY) + 'px';
    }
});

document.addEventListener('mouseup', () => {
    if (draggedCard) {
        draggedCard.style.zIndex = 10;
        draggedCard = null;
    }
});
// Initial display setup
doorOverlay2.style.display = 'none';
wallOverlay.style.display = 'none';
writeMessageBtn.style.display = 'none';
wallOverlay4.style.display = 'none'; // Will be shown when entering messageboard

// Door 1 events
doorOverlay.addEventListener('mouseenter', () => doorOutline.classList.add('active'));
doorOverlay.addEventListener('mouseleave', () => doorOutline.classList.remove('active'));
doorOverlay.addEventListener('click', () => {
    exteriorScene.classList.add('zoom-out');
    interiorScene.classList.remove('hidden');
    doorOverlay.style.display = 'none';
    doorOverlay2.style.display = 'block';
    wallOverlay.style.display = 'block';
});

// Door 2 events
doorOverlay2.addEventListener('mouseenter', () => doorOutline2.classList.add('active'));
doorOverlay2.addEventListener('mouseleave', () => doorOutline2.classList.remove('active'));
doorOverlay2.addEventListener('click', () => {
    interiorScene.classList.add('zoom-out');
    setTimeout(() => {
        exteriorScene.classList.remove('zoom-out');
        exteriorScene.classList.remove('hidden');
        interiorScene.classList.add('hidden');
        doorOverlay.style.display = 'block';
        doorOverlay2.style.display = 'none';
    }, 400);
});

// Wall events (view messages)
wallOverlay.addEventListener('mouseenter', () => wallOutline.classList.add('active'));
wallOverlay.addEventListener('mouseleave', () => wallOutline.classList.remove('active'));
wallOverlay.addEventListener('click', () => {
    interiorScene.classList.add('zoom-out');
    messageboardScene.classList.remove('hidden');
    doorOverlay2.style.display = 'none';
    wallOverlay.style.display = 'none';
    writeMessageBtn.style.display = 'block';
    wallOverlay4.style.display = 'block';
});

// Write message button events
writeMessageBtn.addEventListener('mouseenter', () => writeMessageOutline.classList.add('active'));
writeMessageBtn.addEventListener('mouseleave', () => writeMessageOutline.classList.remove('active'));
writeMessageBtn.addEventListener('click', () => {
    document.getElementById('messageInputOverlay').classList.remove('hidden');
    document.getElementById('messageInput').focus();
});

// Go back button events
wallOverlay4.addEventListener('mouseenter', () => wallOutline4.classList.add('active'));
wallOverlay4.addEventListener('mouseleave', () => wallOutline4.classList.remove('active'));
wallOverlay4.addEventListener('click', () => {
    messageboardScene.classList.add('zoom-out');
    setTimeout(() => {
        messageboardScene.classList.add('hidden');
        messageboardScene.classList.remove('zoom-out');
        interiorScene.classList.remove('zoom-out');
        interiorScene.classList.remove('hidden');
        doorOverlay2.style.display = 'block';
        wallOverlay.style.display = 'block';
        writeMessageBtn.style.display = 'none';
        wallOverlay4.style.display = 'none';
        renderMessages();
    }, 400);
});

// Messageboard submit/close
document.getElementById('submitBtn').addEventListener('click', () => {
    const nameInput = document.getElementById('nameInput');
    const messageInput = document.getElementById('messageInput');
    if (messageInput.value.trim()) {
        messages.push({
            text: messageInput.value.trim(),
            name: nameInput.value.trim() || 'mysterious visitor'
        });
        nameInput.value = '';
        messageInput.value = '';
        document.getElementById('messageInputOverlay').classList.add('hidden');
        renderMessages();
    }
});

//messageName.textContent = `— ${msg.name || 'No name'}`;
//messageName.textContent = `— ${msg.name || 'A visitor'}`;
//messageName.textContent = `— ${msg.name || 'Mysterious Mf'}`;

document.getElementById('closeInputBtn').addEventListener('click', () => {
    document.getElementById('messageInputOverlay').classList.add('hidden');
    document.getElementById('messageInput').value = '';
});

document.getElementById('messageInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        document.getElementById('submitBtn').click();
    }
});

const aboutBtn = document.getElementById('aboutBtn');
const aboutOverlay = document.getElementById('aboutOverlay');
const aboutClose = document.querySelector('.about-close');

aboutBtn.addEventListener('click', () => {
    aboutOverlay.classList.remove('hidden');
});

aboutClose.addEventListener('click', () => {
    aboutOverlay.classList.add('hidden');
});

aboutOverlay.addEventListener('click', (e) => {
    if (e.target === aboutOverlay) {
        aboutOverlay.classList.add('hidden');
    }
});
