const analyzeBtn = document.getElementById('analyze-btn');
const resumeTextarea = document.getElementById('resume');
const jdTextarea = document.getElementById('jd');
const resumeFileInput = document.getElementById('resume-file');
const jdFileInput = document.getElementById('jd-file');
const resumeFileName = document.getElementById('resume-file-name');
const jdFileName = document.getElementById('jd-file-name');

const loadingSection = document.getElementById('loading');
const resultsSection = document.getElementById('results');
const errorToast = document.getElementById('error-message');

const ENDPOINT = 'https://ai-analyzer-1-aru5.onrender.com/api/analyze';

// UI Feedback: Handle file name displays upon selector update
resumeFileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        resumeFileName.textContent = e.target.files[0].name;
    } else {
        resumeFileName.textContent = 'No file chosen';
    }
});

jdFileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        jdFileName.textContent = e.target.files[0].name;
    } else {
        jdFileName.textContent = 'No file chosen';
    }
});

analyzeBtn.addEventListener('click', async () => {
    const resumeText = resumeTextarea.value.trim();
    const jdText = jdTextarea.value.trim();
    const resumeFile = resumeFileInput.files[0];
    const jdFile = jdFileInput.files[0];

    // Priority + Presence Validation
    if ((!resumeText && !resumeFile) || (!jdText && !jdFile)) {
        showError("Please provide both a Resume and a Job Description (either edit manually or upload).");
        return;
    }
    
    // File Type Validation Constraints (.pdf or .docx)
    if (resumeFile && !isValidFileType(resumeFile.name)) {
        showError("Upload Failed: Resume file must be a .pdf or .docx document");
        return;
    }
    
    if (jdFile && !isValidFileType(jdFile.name)) {
        showError("Upload Failed: Job Description file must be a .pdf or .docx document");
        return;
    }

    setLoadingState(true);

    // Prepare FormData specifically bypassing JSON encapsulation to safely transit file buffers
    const formData = new FormData();
    if (resumeText) formData.append('resume', resumeText);
    if (jdText) formData.append('jd', jdText);
    if (resumeFile) formData.append('resume_file', resumeFile);
    if (jdFile) formData.append('jd_file', jdFile);

    try {
        const response = await fetch(ENDPOINT, {
            method: 'POST',
            body: formData, // the browser resolves multi-part boundaries autonomously
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to analyze skills');
        }

        renderResults(data);

    } catch (error) {
        console.error("Analysis error:", error);
        showError(error.message || "An unexpected error occurred. Ensure Flask backend is running...");
    } finally {
        setLoadingState(false);
    }
});

function isValidFileType(filename) {
    const fn = filename.toLowerCase();
    return fn.endsWith('.pdf') || fn.endsWith('.docx');
}

function setLoadingState(isLoading) {
    if (isLoading) {
        analyzeBtn.disabled = true;
        analyzeBtn.innerHTML = 'Analyzing...';
        loadingSection.classList.remove('hidden');
        resultsSection.classList.add('hidden');
        errorToast.classList.add('hidden');
    } else {
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = 'Analyze Assessment 🚀';
        loadingSection.classList.add('hidden');
    }
}

function showError(message) {
    errorToast.textContent = message;
    errorToast.classList.remove('hidden');
    setTimeout(() => { errorToast.classList.add('hidden'); }, 5000);
}

function populateList(elementId, items, emptyMessage = 'None') {
    const el = document.getElementById(elementId);
    el.innerHTML = '';
    if (items && items.length > 0) {
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            el.appendChild(li);
        });
    } else {
        el.innerHTML = `<li>${emptyMessage}</li>`;
    }
}

function renderResults(data) {
    // 1. Final Assessment Banner
    document.getElementById('skill-level-badge').textContent = `Level: ${data.final_assessment?.overall_level || 'Unknown'}`;
    document.getElementById('assessment-summary').textContent = data.final_assessment?.summary || 'No summary available.';
    populateList('improvement-focus-list', data.final_assessment?.improvement_focus, 'No specific improvements targeted.');

    // 2. Skills Grid
    populateList('matched-skills-list', data.matched_skills, 'No matched skills found.');
    populateList('missing-skills-list', data.missing_skills, 'No missing skills detected!');
    populateList('extra-skills-list', data.extra_skills, 'No extra skills outside JD mentioned.');

    // 3. Proficiency Breakdown
    const sa = data.skill_analysis || {};
    populateList('beg-list', sa.beginner, 'None');
    populateList('int-list', sa.intermediate, 'None');
    populateList('adv-list', sa.advanced, 'None');

    // 4. Questions
    const questionsContainer = document.getElementById('questions-list');
    questionsContainer.innerHTML = '';
    if (data.questions && data.questions.length > 0) {
        data.questions.forEach(q => {
            const qCard = document.createElement('div');
            qCard.className = 'q-card';
            qCard.innerHTML = `
                <div class="q-skill">${q.skill || 'General'}</div>
                <div class="q-text">${q.question}</div>
            `;
            questionsContainer.appendChild(qCard);
        });
    } else {
        questionsContainer.innerHTML = '<p>No questions generated.</p>';
    }

    // 5. Roadmap
    const timeline = document.getElementById('roadmap-timeline');
    timeline.innerHTML = '';
    if (data.learning_roadmap && data.learning_roadmap.length > 0) {
        data.learning_roadmap.forEach(step => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            
            const resourcesList = (step.resources || []).map(r => `<li>${r}</li>`).join('');
            
            item.innerHTML = `
                <div class="step-number">Step ${step.step || '-'}</div>
                <h4>${step.title || 'Learning Objective'}</h4>
                <p>${step.description || ''}</p>
                <div class="timeline-meta">
                    <div><strong>⏱️ Duration:</strong> ${step.estimated_time || 'N/A'}</div>
                    <div><strong>📘 Resources:</strong>
                        <ul class="res-list">${resourcesList}</ul>
                    </div>
                </div>
            `;
            timeline.appendChild(item);
        });
    } else {
        timeline.innerHTML = '<p>No learning roadmap provided.</p>';
    }

    // Show results & roll down
    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
