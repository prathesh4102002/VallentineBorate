document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const grid = document.getElementById('imageGrid');
    const revealBtn = document.getElementById('revealBtn');
    const canvas = document.getElementById('confettiCanvas');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const ctx = canvas.getContext('2d');
    const video = document.getElementById('backgroundVideo');
    const lightbox = document.getElementById('lightbox');
    const closeLightbox = document.getElementById('closeLightbox');
    
    // Config variables
    const rows = 10;
    const cols = 10;
    const imageUrl = 'PIC0.jpeg'; // Replace with your bouquet image URL
    const confettiColors = ['#e63946', '#457b9d', '#ffb703', '#2a9d8f'];
    let confetti = [];
  
    // Function to resize canvas to full window
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  
    // Create grid blocks for the image
    function createGrid() {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const block = document.createElement('div');
          block.classList.add('image-block');
          block.style.backgroundImage = `url(${imageUrl})`;
          block.style.backgroundPosition = `${(col / (cols - 1)) * 100}% ${(row / (rows - 1)) * 100}%`;
          grid.appendChild(block);
        }
      }
    }
  
    // Function to reveal image
    function revealImage() {
      const blocks = document.querySelectorAll('.image-block');
      blocks.forEach((block, index) => {
        setTimeout(() => {
          block.classList.add('revealed');
        }, index * 50);
      });
  
      startConfetti();
      setTimeout(stopConfetti, 10000);
  
      // Smooth scrolling
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
  
      // Show and play the video
      video.style.display = 'block';
      video.style.opacity = 0;
      setTimeout(() => {
        video.style.transition = 'opacity 1s ease-in-out';
        video.style.opacity = 1;
      }, 0);
      video.play();
    }
  
    // Function to create confetti particles
    function createConfetti() {
      for (let i = 0; i < 100; i++) {
        confetti.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
          size: Math.random() * 5 + 2,
          dx: Math.random() * 2 - 1,
          dy: Math.random() * 3 + 2,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 10,
        });
      }
    }
  
    // Function to update and animate confetti
    function updateConfetti() {
      confetti.forEach((particle) => {
        particle.y += particle.dy;
        particle.x += particle.dx;
        particle.rotation += particle.rotationSpeed;
  
        if (particle.y > canvas.height) {
          particle.y = -10;
          particle.x = Math.random() * canvas.width;
        }
      });
    }
  
    // Function to draw confetti on canvas
    function drawConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confetti.forEach((particle) => {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        ctx.restore();
      });
    }
  
    // Function to start confetti animation
    function startConfetti() {
      createConfetti();
      function animate() {
        updateConfetti();
        drawConfetti();
        requestAnimationFrame(animate);
      }
      animate();
    }
  
    // Function to stop confetti
    function stopConfetti() {
      confetti = [];
    }
  
    // "No" button avoidance logic
    noBtn.addEventListener('mouseenter', () => {
      const offsetX = Math.random() * 250 - 245;
      const offsetY = Math.random() * 250 - 245;
      noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  
    // Handle "Yes" button lightbox
    yesBtn.addEventListener('click', () => {
      lightbox.classList.remove('hidden');
    });
  
  
    // Event listener for reveal button
    revealBtn.addEventListener('click', revealImage);
  
    // Adjust canvas size on window resize
    window.addEventListener('resize', resizeCanvas);
  
    // Initial setup
    resizeCanvas();
    createGrid();
  });
  
  noBtn.addEventListener('mouseenter', () => {
    // Set a larger random offset to make the button jump farther away from the cursor
    const offsetX = Math.random() * 500 - 250; // Larger offset range
    const offsetY = Math.random() * 500 - 250; // Larger offset range
    noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });
  
  // Function to continuously move the button to a random position on mouse move
  noBtn.addEventListener('mousemove', () => {
    const offsetX = Math.random() * 500 - 250; // Larger offset range
    const offsetY = Math.random() * 500 - 250; // Larger offset range
    noBtn.style.transition = 'transform 0.2s ease-out'; // Smooth transition
    noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });

  let attemptCount = 0; // Initialize counter for attempts

  const messageBox = document.createElement('div'); // Create a new div for the message
  messageBox.style.position = 'fixed';
  messageBox.style.top = '50%';
  messageBox.style.left = '50%';
  messageBox.style.transform = 'translate(-50%, -50%)';
  messageBox.style.padding = '20px';
  messageBox.style.backgroundColor = '#ffeb3b';
  messageBox.style.borderRadius = '10px';
  messageBox.style.fontSize = '20px';
  messageBox.style.fontWeight = 'bold';
  messageBox.style.display = 'none'; // Initially hidden
  messageBox.innerText = 'Just Click YES, please 😌';
  
  document.body.appendChild(messageBox); // Add the message to the body
  
  noBtn.addEventListener('mouseenter', () => {
    // Increment the counter each time the "No" button is missed
    attemptCount++;
  
    // Set larger random offset to make the button jump farther away from the cursor
    const offsetX = Math.random() * 500 - 250; // Larger offset range
    const offsetY = Math.random() * 500 - 250; // Larger offset range
    noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  
    // If the user has attempted 5 times, show the message
    if (attemptCount >= 5) {
      messageBox.style.display = 'block'; // Show the message box
      setTimeout(() => {
        messageBox.style.display = 'none'; // Hide the message after 3 seconds
      }, 3000); // Hide message after 3 seconds
  
      attemptCount = 0; // Reset the counter
    }
  });
  
  noBtn.addEventListener('mousemove', () => {
    const offsetX = Math.random() * 500 - 250; // Larger offset range
    const offsetY = Math.random() * 500 - 250; // Larger offset range
    noBtn.style.transition = 'transform 0.2s ease-out'; // Smooth transition
    noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });
  