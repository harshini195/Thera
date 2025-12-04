from flask import Flask, request, jsonify
import json
import uuid
import os
import hashlib
import openai
from flask_cors import CORS
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

# Load .env file
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# Email configuration
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")  # Your Gmail address
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")  # Your Gmail app password

app = Flask(__name__)
CORS(app, supports_credentials=True)

DATA_FOLDER = 'data'
os.makedirs(DATA_FOLDER, exist_ok=True)

# File paths
USERS_FILE = os.path.join(DATA_FOLDER, 'users.json')
MOOD_DATA_FILE = os.path.join(DATA_FOLDER, 'moods_2025.json')
JOURNAL_DATA_FILE = os.path.join(DATA_FOLDER, 'journal_entries_2025.json')
CHAT_MEMORY_FILE = os.path.join(DATA_FOLDER, 'chat_memory.json')

# Create empty files if they don't exist
for file in [USERS_FILE, MOOD_DATA_FILE, JOURNAL_DATA_FILE, CHAT_MEMORY_FILE]:
    if not os.path.exists(file):
        with open(file, 'w') as f:
            json.dump({}, f)

def load_json(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)

def save_json(file_path, data):
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def send_email(name, email, message):
    """Send email notification to your Gmail"""
    try:
        # Check if email credentials are properly configured
        if not EMAIL_ADDRESS or not EMAIL_PASSWORD or EMAIL_PASSWORD == "your-app-password-here":
            print("Email credentials not configured properly")
            return False
            
        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = EMAIL_ADDRESS  # Send to yourself
        msg['Subject'] = f"🌟 New Message from {name} - Thera Contact Form"
        
        body = f"""
        🌟 NEW CONTACT FORM MESSAGE 🌟
        📧 CONTACT DETAILS        
        👤 Name: {name}
        📧 Email: {email}
        📅 Date: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}
        ============================================
        💬 MESSAGE
        
        {message}
                
        This message was sent from your Thera website contact form.
        Reply directly to this email to respond to {name}.
        
        ---
        Thera - Your Mental Wellness Companion
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        text = msg.as_string()
        server.sendmail(EMAIL_ADDRESS, EMAIL_ADDRESS, text)
        server.quit()
        
        return True
    except Exception as e:
        print(f"Email sending error: {e}")
        return False

# ------------------ CONTACT FORM ------------------

@app.route('/api/contact', methods=['POST'])
def contact_form():
    try:
        data = request.json
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        message = data.get('message', '').strip()
        
        if not all([name, email, message]):
            return jsonify({'error': 'All fields are required'}), 400
        
        # Send email notification
        if send_email(name, email, message):
            return jsonify({'message': 'Message sent successfully!'}), 200
        else:
            return jsonify({'error': 'Email service not configured. Please contact the administrator.'}), 500
            
    except Exception as e:
        print(f"Contact form error: {e}")
        return jsonify({'error': 'An error occurred. Please try again.'}), 500

# ------------------ AUTH ------------------

@app.route('/auth/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    name = data.get('name', '')

    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400

    users = load_json(USERS_FILE)
    if email in users:
        return jsonify({'error': 'User already exists'}), 400

    users[email] = {
        'name': name,
        'password_hash': hash_password(password),
        'token': str(uuid.uuid4())
    }
    save_json(USERS_FILE, users)

    return jsonify({'message': 'User created', 'token': users[email]['token']}), 201

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    users = load_json(USERS_FILE)
    user = users.get(email)

    if user and user['password_hash'] == hash_password(password):
        return jsonify({'message': 'Login successful', 'token': user['token'], 'name': user.get('name')}), 200
    return jsonify({'error': 'Invalid credentials'}), 401

# ------------------ MOODS ------------------

@app.route('/save-mood', methods=['POST'])
def save_mood():
    data = request.json
    token = data.get('token')
    month = str(data['month'])
    day = str(data['day'])
    mood = data['mood']

    users = load_json(USERS_FILE)
    email = next((e for e, u in users.items() if u['token'] == token), None)
    if not email:
        return jsonify({'error': 'Invalid token'}), 403

    mood_data = load_json(MOOD_DATA_FILE)
    mood_data.setdefault(email, {}).setdefault(month, {})[day] = mood
    save_json(MOOD_DATA_FILE, mood_data)

    return jsonify({'message': 'Mood saved'}), 200

@app.route('/get-moods', methods=['GET'])
def get_moods():
    token = request.args.get('token')
    users = load_json(USERS_FILE)
    email = next((e for e, u in users.items() if u['token'] == token), None)
    if not email:
        return jsonify({'error': 'Invalid token'}), 403

    mood_data = load_json(MOOD_DATA_FILE)
    return jsonify(mood_data.get(email, {})), 200

# ------------------ JOURNAL ------------------

@app.route('/api/journal/<date>', methods=['GET'])
def get_journal_entry(date):
    token = request.args.get('token')
    users = load_json(USERS_FILE)
    email = next((e for e, u in users.items() if u['token'] == token), None)
    if not email:
        return jsonify({'error': 'Invalid token'}), 403

    journal_data = load_json(JOURNAL_DATA_FILE)
    return jsonify({'entry': journal_data.get(email, {}).get(date, '')}), 200

@app.route('/api/journal/<date>', methods=['POST'])
def save_journal_entry(date):
    data = request.json
    entry = data.get('entry')
    token = data.get('token')

    users = load_json(USERS_FILE)
    email = next((e for e, u in users.items() if u['token'] == token), None)
    if not email:
        return jsonify({'error': 'Invalid token'}), 403

    journal_data = load_json(JOURNAL_DATA_FILE)
    journal_data.setdefault(email, {})[date] = entry
    save_json(JOURNAL_DATA_FILE, journal_data)

    return jsonify({'message': 'Entry saved'}), 200

# ------------------ CHATBOT ------------------

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    token = data.get('token')
    user_message = data.get('message', '')

    if not user_message:
        return jsonify({'reply': "Can you tell me more about how you're feeling?"})

    users = load_json(USERS_FILE)
    email = next((e for e, u in users.items() if u['token'] == token), None)
    if not email:
        return jsonify({'error': 'Invalid token'}), 403

    chat_memory = load_json(CHAT_MEMORY_FILE)
    messages = chat_memory.get(email, [
        {"role": "system", "content": "You're a kind, friendly AI therapist named TheraBot. You listen to users and offer emotional support and thoughtful advice."}
    ])
    messages.append({"role": "user", "content": user_message})

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0.7
        )
        bot_reply = response['choices'][0]['message']['content']
    except Exception as e:
        print("OpenAI API error:", e)
        return jsonify({'reply': "Sorry, I'm having trouble responding right now."})

    # Save the updated memory (keep only last 10)
    messages.append({"role": "assistant", "content": bot_reply})
    chat_memory[email] = messages[-10:]
    save_json(CHAT_MEMORY_FILE, chat_memory)

    return jsonify({'reply': bot_reply})

# ------------------ SERVER STATUS ------------------

@app.route('/')
def index():
    return jsonify({'message': 'Therabot server running'}), 200

# ------------------ MAIN ------------------

if __name__ == '__main__':
    app.run(debug=True, port=5001)
