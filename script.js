let currentStage = 1;
const totalStages = 9;

// Waypoint positions on the path (approximate percentages for transform)
const waypointPositions = [
    { x: 50, y: 300 },
    { x: 250, y: 180 },
    { x: 450, y: 320 },
    { x: 550, y: 280 },
    { x: 700, y: 380 },
    { x: 800, y: 330 },
    { x: 900, y: 320 },
    { x: 950, y: 300 }
];

// Get elements
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressFill = document.getElementById('progressFill');
const stageInfo = document.getElementById('stageInfo');
const mascot = document.getElementById('mascot');

// Initialize
updateStage();

// Event listeners
nextBtn.addEventListener('click', () => {
    if (currentStage < totalStages) {
        currentStage++;
        updateStage();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentStage > 1) {
        currentStage--;
        updateStage();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentStage < totalStages) {
        currentStage++;
        updateStage();
    } else if (e.key === 'ArrowLeft' && currentStage > 1) {
        currentStage--;
        updateStage();
    }
});

function updateStage() {
    // Hide all stage contents
    const stageContents = document.querySelectorAll('.stage-content');
    stageContents.forEach(content => {
        content.classList.remove('active');
    });

    // Show current stage content
    const currentContent = document.querySelector(`[data-stage="${currentStage}"]`);
    if (currentContent) {
        currentContent.classList.add('active');
    }

    // Update progress bar
    const progress = (currentStage / totalStages) * 100;
    progressFill.style.width = `${progress}%`;

    // Update stage info
    stageInfo.textContent = `Stage ${currentStage} of ${totalStages}`;

    // Update waypoints
    updateWaypoints();

    // Move mascot
    moveMascot();

    // Update button states
    prevBtn.disabled = currentStage === 1;

    if (currentStage === totalStages) {
        nextBtn.innerHTML = 'Finish <span>✓</span>';
    } else {
        nextBtn.innerHTML = 'Next <span>→</span>';
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateWaypoints() {
    for (let i = 1; i <= 8; i++) {
        const waypoint = document.getElementById(`wp${i}`);
        waypoint.classList.remove('active', 'completed');

        if (i < currentStage) {
            waypoint.classList.add('completed');
        } else if (i === currentStage) {
            waypoint.classList.add('active');
        }
    }
}

function moveMascot() {
    if (currentStage <= waypointPositions.length) {
        const pos = waypointPositions[currentStage - 1];
        mascot.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    }
}
