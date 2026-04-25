import time
import io
import PyPDF2
import docx

def extract_text_from_pdf(file_stream):
    """Extracts text from a loaded PDF stream using PyPDF2."""
    text = ""
    try:
        pdf_reader = PyPDF2.PdfReader(file_stream)
        for page in pdf_reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
    except Exception as e:
        print(f"PDF extraction error: {e}")
    return text.strip()

def extract_text_from_docx(file_stream):
    """Extracts text from a loaded docx stream using python-docx."""
    text = ""
    try:
        doc = docx.Document(file_stream)
        for para in doc.paragraphs:
            text += para.text + "\n"
    except Exception as e:
        print(f"DOCX extraction error: {e}")
    return text.strip()


def analyze_skills(resume_text, jd_text):
    """
    Mock function to simulate AI skill analysis without requiring an API key.
    The real AI integration can be added back here later using the detailed prompt.
    """
    # Simulate a small delay for realistic processing time
    time.sleep(1.5)
    
    # Static mock response matching the new highly detailed REQUIRED structure
    mock_response = {
        "matched_skills": [
            "Python", 
            "HTML",
            "CSS",
            "JavaScript",
            "Problem Solving"
        ],
        "missing_skills": [
            "React.js", 
            "Node.js",
            "AWS Deployment",
            "REST APIs",
            "PostgreSQL Database"
        ],
        "extra_skills": [
            "Photoshop",
            "Data Analysis",
            "Jupyter Notebooks"
        ],
        "skill_analysis": {
            "beginner": [],
            "intermediate": ["HTML", "CSS", "JavaScript", "Problem Solving", "Data Analysis"],
            "advanced": ["Python"]
        },
        "questions": [
            {
                "skill": "React.js",
                "question": "Explain the Virtual DOM and how React handles state updates under the hood."
            },
            {
                "skill": "Node.js",
                "question": "How does Node.js handle asynchronous operations despite being single-threaded?"
            },
            {
                "skill": "AWS Deployment",
                "question": "What is the difference between EC2 and S3, and when would you use each?"
            },
            {
                "skill": "REST APIs",
                "question": "What are the common HTTP methods used in RESTful APIs and what are their purposes?"
            },
            {
                "skill": "PostgreSQL Database",
                "question": "Can you explain the difference between INNER JOIN and LEFT JOIN in SQL?"
            }
        ],
        "learning_roadmap": [
            {
                "step": 1,
                "title": "Master React Mechanics",
                "description": "Understand component lifecycles, hooks, and state management to build interactive UI components required for this role.",
                "resources": [
                    "React Docs (react.dev)",
                    "FreeCodeCamp React Course"
                ],
                "estimated_time": "2 weeks"
            },
            {
                "step": 2,
                "title": "Node.js API Development",
                "description": "Learn to construct RESTful APIs with Express to serve data to your frontend and connect to databases.",
                "resources": [
                    "Nodejs.org Guides",
                    "YouTube: Traversy Media Node.js Crash Course"
                ],
                "estimated_time": "1.5 weeks"
            },
            {
                "step": 3,
                "title": "Database Design and SQL",
                "description": "Learn relational database concepts, write SQL queries, and integrate PostgreSQL with Node.js.",
                "resources": [
                    "PostgreSQL Tutorial",
                    "Sequelize ORM Documentation"
                ],
                "estimated_time": "1.5 weeks"
            },
            {
                "step": 4,
                "title": "Cloud Deployment Basics",
                "description": "Familiarize yourself with AWS basics to host both your frontend and Node.js backend infrastructure.",
                "resources": [
                    "AWS Cloud Practitioner Free Tier resources"
                ],
                "estimated_time": "1 week"
            }
        ],
        "final_assessment": {
            "overall_level": "Intermediate",
            "summary": "The candidate has a solid grasp of foundational languages (Python, HTML, CSS, JavaScript) but requires upskilling in modern web frameworks (React.js), backend runtime environments (Node.js), API design, and databases (PostgreSQL) to meet the full job description requirements.",
            "improvement_focus": [
                "React.js state generation & hooks",
                "Backend runtime environment (Node.js) and REST APIs",
                "Database Management (PostgreSQL)",
                "Full-stack cloud deployment practices (AWS)"
            ]
        }
    }
    
    return mock_response
