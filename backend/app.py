from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import analyze_skills, extract_text_from_pdf, extract_text_from_docx

app = Flask(__name__)
# Enable CORS for all routes (allow frontend to talk to backend)
CORS(app)

def process_input(text_input, file_input):
    text = ""
    # Prioritize uploaded file extraction
    if file_input and file_input.filename != '':
        filename = file_input.filename.lower()
        if filename.endswith('.pdf'):
            text = extract_text_from_pdf(file_input.stream)
        elif filename.endswith('.docx'):
            text = extract_text_from_docx(file_input.stream)
    
    # Fallback to text input
    if not text and text_input:
        text = text_input.strip()
        
    return text

@app.route('/api/analyze', methods=['POST'])
def analyze():
    # Because we are using FormData, we access text via request.form and files via request.files
    resume_text_input = request.form.get('resume', '')
    jd_text_input = request.form.get('jd', '')
    
    resume_file = request.files.get('resume_file')
    jd_file = request.files.get('jd_file')
    
    # Extract text resolving precedence: File parsing over Manual Paste
    resume_text = process_input(resume_text_input, resume_file)
    jd_text = process_input(jd_text_input, jd_file)
    
    if not resume_text or not jd_text:
        return jsonify({"error": "Both resume and job description (either via text or file) are required"}), 400
        
    # Process with AI Mock
    result = analyze_skills(resume_text, jd_text)
    
    if isinstance(result, dict) and "error" in result:
        return jsonify(result), 500
        
    return jsonify(result)

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
