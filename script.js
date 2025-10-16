       const exteriorScene = document.getElementById('exterior');
        const interiorScene = document.getElementById('interior');
        const messageboardScene = document.getElementById('messageboard');
        const doorOverlay = document.getElementById('doorOverlay');
        const doorOutline = document.createElement('div');
        
        doorOutline.className = 'door-outline';
        doorOverlay.appendChild(doorOutline);

        const doorText = document.createElement('div');
        doorText.className = 'door-text';
        doorText.textContent = "enter rita's room";
        doorOutline.appendChild(doorText);

        // Second door for interior (to exit)
        const doorOverlay2 = document.getElementById('doorOverlay2');
        const doorOutline2 = document.createElement('div');
        doorOutline2.className = 'door-outline';
        doorOverlay2.appendChild(doorOutline2);

        const doorText2 = document.createElement('div');
        doorText2.className = 'door-text';
        doorText2.textContent = "leave rita's room";
        doorOutline2.appendChild(doorText2);

        // Wall overlay for message board
        const wallOverlay = document.getElementById('wallOverlay');
        const wallOutline = document.createElement('div');
        wallOutline.className = 'wall-outline';
        wallOverlay.appendChild(wallOutline);

        const wallText = document.createElement('div');
        wallText.className = 'wall-text';
        wallText.textContent = "view messages";
        wallOutline.appendChild(wallText);

        // Messages storage
        let messages = [];

        // Position the door overlay and outline
        function positionDoor() {
            const container = document.querySelector('.scene-container');
            const doorX = container.offsetWidth * 0.35;            
            const doorY = container.offsetHeight * 0.2;
            const doorWidth = 300;
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

        positionDoor();
        window.addEventListener('resize', positionDoor);

        // Position the second door (interior exit door)
        function positionDoor2() {
            const container = document.querySelector('.scene-container');
            const doorX = container.offsetWidth * 0.1;
            const doorY = container.offsetHeight * 0.25;
            const doorWidth = 200;
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

        positionDoor2();
        window.addEventListener('resize', positionDoor2);

        // Position the wall overlay
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

        positionWall();
        window.addEventListener('resize', positionWall);

        // Render messages on wall
        function renderMessages() {
            const container = document.getElementById('messagesContainer');
            container.innerHTML = '';
            
            messages.forEach((msg, index) => {
                const card = document.createElement('div');
                card.className = 'message-card';
                card.textContent = msg;
                
                const randomX = Math.random() * (window.innerWidth - 150);
                const randomY = Math.random() * (window.innerHeight - 80);
                
                card.style.left = randomX + 'px';
                card.style.top = randomY + 'px';
                card.style.width = (80 + Math.random() * 120) + 'px';
                card.style.height = (60 + Math.random() * 80) + 'px';
                
                container.appendChild(card);
            });
        }

        // Door hover effect
        doorOverlay.addEventListener('mouseenter', () => {
            doorOutline.classList.add('active');
        });

        doorOverlay.addEventListener('mouseleave', () => {
            doorOutline.classList.remove('active');
        });

        // Door click transition
        doorOverlay.addEventListener('click', () => {
            exteriorScene.classList.add('zoom-out');
            interiorScene.classList.remove('hidden');
            doorOverlay.style.display = 'none';
            doorOverlay2.style.display = 'block';
            renderMessages();
        });

        // Second door hover effect
        doorOverlay2.addEventListener('mouseenter', () => {
            doorOutline2.classList.add('active');
        });

        doorOverlay2.addEventListener('mouseleave', () => {
            doorOutline2.classList.remove('active');
        });

        // Second door click transition (back to exterior)
        doorOverlay2.addEventListener('click', () => {
            interiorScene.classList.add('zoom-out');
            setTimeout(() => {
                exteriorScene.classList.remove('zoom-out');
                exteriorScene.classList.remove('hidden');
                interiorScene.classList.add('hidden');
            }, 400);
            doorOverlay.style.display = 'block';
            doorOverlay2.style.display = 'none';
        });

        // Wall hover effect
        wallOverlay.addEventListener('mouseenter', () => {
            wallOutline.classList.add('active');
        });

        wallOverlay.addEventListener('mouseleave', () => {
            wallOutline.classList.remove('active');
        });

        // Wall click - open message board
        wallOverlay.addEventListener('click', () => {
            interiorScene.classList.add('zoom-out');
            messageboardScene.classList.remove('hidden');
        });

    /* Add message button (on messageboard page) - removed unused/errored block
       The centered write button below is used instead. */

        // Go back button (on messageboard page)
        const wallOverlay4 = document.getElementById('wallOverlay4');
        const wallOutline4 = document.createElement('div');
        wallOutline4.className = 'wall-outline';
        wallOverlay4.appendChild(wallOutline4);

        const wallText4 = document.createElement('div');
        wallText4.className = 'wall-text';
        wallText4.textContent = "go back";
        wallOutline4.appendChild(wallText4);

    // Position go back button
        function positionWallOverlay4() {
            const container = document.querySelector('.scene-container');
            const wallX = container.offsetWidth * 0.1;
            const wallY = container.offsetHeight * 0.55;
            const wallWidth = 200;
            const wallHeight = 100;

            wallOverlay4.style.left = wallX + 'px';
            wallOverlay4.style.top = wallY + 'px';
            wallOverlay4.style.width = wallWidth + 'px';
            wallOverlay4.style.height = wallHeight + 'px';

            wallOutline4.style.left = '0';
            wallOutline4.style.top = '0';
            wallOutline4.style.width = wallWidth + 'px';
            wallOutline4.style.height = wallHeight + 'px';
        }


    positionWallOverlay4();
    window.addEventListener('resize', positionWallOverlay4);
		// Write message button (centered on messageboard page)
		const writeMessageBtn = document.getElementById('writeMessageBtn');
		const writeMessageOutline = document.createElement('div');
		writeMessageOutline.className = 'write-message-outline';
		writeMessageBtn.appendChild(writeMessageOutline);

		const writeMessageText = document.createElement('div');
		writeMessageText.className = 'write-message-text';
		writeMessageText.textContent = "write a message";
		writeMessageOutline.appendChild(writeMessageText);

		writeMessageBtn.addEventListener('mouseenter', () => {
    	writeMessageOutline.classList.add('active');
		});

		writeMessageBtn.addEventListener('mouseleave', () => {
    	writeMessageOutline.classList.remove('active');
		});

		writeMessageBtn.addEventListener('click', () => {
   		document.getElementById('messageInputOverlay').classList.remove('hidden');
   		document.getElementById('messageInput').focus();
		});

        // Go back click - return to interior
        wallOverlay4.addEventListener('click', () => {
            messageboardScene.classList.add('zoom-out');
            setTimeout(() => {
                messageboardScene.classList.add('hidden');
                messageboardScene.classList.remove('zoom-out');
                interiorScene.classList.remove('zoom-out');
                interiorScene.classList.remove('hidden');
                renderMessages();
            }, 400);
        });

        // Go back button (visible) - same behavior as wallOverlay4
        const goBackBtn = document.getElementById('goBackBtn');
        if (goBackBtn) {
            goBackBtn.addEventListener('click', () => {
                messageboardScene.classList.add('zoom-out');
                setTimeout(() => {
                    messageboardScene.classList.add('hidden');
                    messageboardScene.classList.remove('zoom-out');
                    interiorScene.classList.remove('zoom-out');
                    interiorScene.classList.remove('hidden');
                    renderMessages();
                }, 400);
            });
        }

        // Submit message
        document.getElementById('submitBtn').addEventListener('click', () => {
            const input = document.getElementById('messageInput');
            if (input.value.trim()) {
                messages.push(input.value.trim());
                input.value = '';
                document.getElementById('messageInputOverlay').classList.add('hidden');
            }
        });

        // Close input overlay
        document.getElementById('closeInputBtn').addEventListener('click', () => {
            document.getElementById('messageInputOverlay').classList.add('hidden');
            document.getElementById('messageInput').value = '';
        });

        // Allow Enter key to submit
        document.getElementById('messageInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                document.getElementById('submitBtn').click();
            }
        });