// Current stage tracking
let currentStage = 1;
const totalStages = 9;

// Get elements
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressFill = document.getElementById('progressFill');
const stageCounter = document.getElementById('stageCounter');

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

// Update stage display
function updateStage() {
    // Hide all stages
    const stages = document.querySelectorAll('.stage');
    stages.forEach(stage => {
        stage.classList.remove('active');
    });

    // Show current stage
    const currentStageElement = document.getElementById(`stage${currentStage}`);
    currentStageElement.classList.add('active');

    // Update progress bar
    const progress = (currentStage / totalStages) * 100;
    progressFill.style.width = `${progress}%`;

    // Update stage counter
    stageCounter.textContent = `Stage ${currentStage} of ${totalStages}`;

    // Update button states
    prevBtn.disabled = currentStage === 1;

    if (currentStage === totalStages) {
        nextBtn.textContent = '🎉 Finish';
    } else {
        nextBtn.textContent = 'Next →';
    }

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
