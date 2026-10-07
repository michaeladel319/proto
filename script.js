document.addEventListener("DOMContentLoaded", () => {
    const bgLayer = document.getElementById("bgLayer");
    const shapeCount = 40; // Number of floating background shapes

    const shapes = [
        // Hollow Circle
        `<svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="none" stroke="#333333" stroke-width="2"/></svg>`,
        // Solid Circle
        `<svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#333333"/></svg>`,
        // Hollow Triangle
        `<svg width="24" height="24" viewBox="0 0 24 24"><polygon points="12,2 22,20 2,20" fill="none" stroke="#333333" stroke-width="2"/></svg>`,
        // Plus Shape
        `<svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 0 V16 M0 8 H16" stroke="#333333" stroke-width="2"/></svg>`,
        // Squiggle
        `<svg width="30" height="10" viewBox="0 0 30 10"><path d="M0 5 Q 7.5 0, 15 5 T 30 5" fill="none" stroke="#333333" stroke-width="2"/></svg>`,
        // Pill Shape
        `<svg width="24" height="12" viewBox="0 0 24 12"><rect x="1" y="1" width="22" height="10" rx="5" fill="none" stroke="#333333" stroke-width="2"/></svg>`
    ];

    for (let i = 0; i < shapeCount; i++) {
        const shapeEl = document.createElement('div');
        shapeEl.classList.add('shape');

        // Pick random SVG
        shapeEl.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];

        // Randomize position
        const top = Math.random() * 100;
        const left = Math.random() * 100;

        // Randomize animation duration, delay, and scale for 3D parallax feel
        const duration = 20 + Math.random() * 30; // 20s to 50s
        const delay = Math.random() * -30; // Start at different times
        const scale = 0.5 + Math.random() * 2; // scale 0.5x to 2.5x

        shapeEl.style.top = `${top}vh`;
        shapeEl.style.left = `${left}vw`;
        shapeEl.style.width = 'fit-content';
        shapeEl.style.height = 'fit-content';

        // Override the animation defined in CSS so it preserves individual transforms
        shapeEl.style.animation = `floatAndRotate ${duration}s linear ${delay}s infinite`;
        shapeEl.style.transform = `scale(${scale})`;

        // Since transform is overridden by keyframes, let's wrap the svg in a scalable wrapper
        const wrapper = document.createElement('div');
        wrapper.style.transform = `scale(${scale})`;
        wrapper.innerHTML = shapeEl.innerHTML;
        shapeEl.innerHTML = '';
        shapeEl.appendChild(wrapper);

        bgLayer.appendChild(shapeEl);
    }

    // Typewriter effect for hero text
    const typewriterEl = document.querySelector('.hero-text h2');
    if (typewriterEl) {
        const textToType = typewriterEl.getAttribute('data-text');
        let index = 0;
        let isDeleting = false;

        function typeWriter() {
            if (!isDeleting && index < textToType.length) {
                // Type next character
                if (index === 0) typewriterEl.textContent = '';
                typewriterEl.textContent += textToType.charAt(index);
                index++;
                setTimeout(typeWriter, 150 + Math.random() * 100); // Random typing speed flavor
            } else if (!isDeleting && index === textToType.length) {
                // Pause at the end before deleting
                isDeleting = true;
                setTimeout(typeWriter, 3000);
            } else if (isDeleting && index > 0) {
                // Delete character
                index--;
                typewriterEl.textContent = textToType.substring(0, index);
                setTimeout(typeWriter, 80 + Math.random() * 50); // Faster deleting speed
            } else if (isDeleting && index === 0) {
                // Pause before typing again
                isDeleting = false;
                setTimeout(typeWriter, 800);
            }
        }

        setTimeout(typeWriter, 800); // Start delay
    }
});
