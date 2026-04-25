# AI Skill Analyzer

An advanced career evaluator tool that compares user resumes against job descriptions using an AI-powered system mock (for now), giving structured skill assessments and guided learning roadmaps.

## Features
- **File Parsing**: Upload `.pdf` or `.docx` for extraction.
- **Skill Extraction**: Intelligently pinpoints missing, matched, and extra tech & soft skills. 
- **Assessment Breakdowns**: Provides a beginner/intermediate/advanced skill breakdown.
- **Learning Roadmap**: Step-by-step estimated timeline to learn missing skills.
- **Mock Interviews**: Gives specific questions based on skills that need improvement.

## UI Design
The UI provides an ultra-modern, minimal dashboard created with standard responsive HTML, CSS, JavaScript, and features smooth hover states, flexible grids, and a beautifully unified styling.

## Getting Started

### Prerequisites
- Python 3
- Flask

### Backend Setup
1. Open a terminal and CD into the `backend/` folder.
2. Create your virtual environment: `python -m venv venv`
3. Activate the virtual environment:
   - Windows: `.\venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
4. Install requirements: `pip install -r requirements.txt`
5. Run the server: `python app.py`

### Frontend Setup
1. Open the `frontend/` folder.
2. Launch `index.html` via Live Server or just open it directly in any modern browser.

## Built With
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Python, Flask, PyPDF2, python-docx
