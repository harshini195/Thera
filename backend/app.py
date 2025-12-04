from flask import Flask, request, jsonify  # ✅ Make sure this is the first Flask-related import
import json
import uuid
import os
import hashlib

from flask_cors import CORS, cross_origin  # Optional, but useful for frontend requests

app = Flask(__name__)
CORS(app, supports_credentials=True)



DATA_FOLDER = 'data'
os.makedirs(DATA_FOLDER, exist_ok=True)

# File paths
USERS_FILE = os.path.join(DATA_FOLDER, 'users.json')
MOOD_DATA_FILE = os.path.join(DATA_FOLDER, 'moods_2025.json')
JOURNAL_DATA_FILE = os.path.join(DATA_FOLDER, 'journal_entries_2025.json')

# Initialize empty files if needed
for file in [USERS_FILE, MOOD_DATA_FILE, JOURNAL_DATA_FILE]:
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

# ------------------ AUTH ROUTES ------------------

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

    return jsonify({'message': 'User created successfully', 'token': users[email]['token']}), 201

@app.route('/auth/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    users = load_json(USERS_FILE)
    user = users.get(email)

    if user and user['password_hash'] == hash_password(password):
        return jsonify({'message': 'Login successful', 'token': user['token'], 'name': user.get('name')}), 200
    return jsonify({'error': 'Invalid credentials'}), 401

# ------------------ MOOD ROUTES ------------------

@app.route('/save-mood', methods=['POST'])
def save_mood():
    data = request.json
    token = data.get('token')
    month = str(data['month'])  # 0-based
    day = str(data['day'])
    mood = data['mood']

    users = load_json(USERS_FILE)
    email = next((email for email, u in users.items() if u['token'] == token), None)
    if not email:
        return jsonify({'error': 'Invalid token'}), 403

    mood_data = load_json(MOOD_DATA_FILE)
    if email not in mood_data:
        mood_data[email] = {}
    if month not in mood_data[email]:
        mood_data[email][month] = {}
    mood_data[email][month][day] = mood

    save_json(MOOD_DATA_FILE, mood_data)
    return jsonify({'message': 'Mood saved'}), 200

@app.route('/get-moods', methods=['GET'])
def get_moods():
    token = request.args.get('token')
    users = load_json(USERS_FILE)
    email = next((email for email, u in users.items() if u['token'] == token), None)
    if not email:
        return jsonify({'error': 'Invalid token'}), 403

    mood_data = load_json(MOOD_DATA_FILE)
    return jsonify(mood_data.get(email, {})), 200

# ------------------ JOURNAL ROUTES ------------------

@app.route('/api/journal/<date>', methods=['GET'])
def get_journal_entry(date):
    token = request.args.get('token')
    users = load_json(USERS_FILE)
    email = next((email for email, u in users.items() if u['token'] == token), None)
    if not email:
        return jsonify({'error': 'Invalid token'}), 403

    journal_data = load_json(JOURNAL_DATA_FILE)
    # Support new format: {date: {entry, title, color}}
    entry_obj = journal_data.get(email, {}).get(date, {})
    if isinstance(entry_obj, dict):
        return jsonify({
            'entry': entry_obj.get('entry', ''),
            'title': entry_obj.get('title', ''),
            'color': entry_obj.get('color', '#ccdeed')
        }), 200
    else:
        # fallback for old format (just entry string)
        return jsonify({'entry': entry_obj, 'title': '', 'color': '#ccdeed'}), 200

@app.route('/api/journal/<date>', methods=['POST'])
def save_journal_entry(date):
    data = request.json
    entry = data.get('entry')
    title = data.get('title', '')
    color = data.get('color', '#ccdeed')
    token = data.get('token')

    users = load_json(USERS_FILE)
    email = next((email for email, u in users.items() if u['token'] == token), None)
    if not email:
        return jsonify({'error': 'Invalid token'}), 403

    journal_data = load_json(JOURNAL_DATA_FILE)
    if email not in journal_data:
        journal_data[email] = {}
    # Save as object with entry, title, color
    journal_data[email][date] = {
        'entry': entry,
        'title': title,
        'color': color
    }

    save_json(JOURNAL_DATA_FILE, journal_data)
    return jsonify({'message': 'Journal entry saved'}), 200

@app.route('/get-journal', methods=['GET'])
def get_journal():
    token = request.args.get('token')
    users = load_json(USERS_FILE)
    email = next((email for email, u in users.items() if u['token'] == token), None)
    if not email:
        return jsonify({'error': 'Invalid token'}), 403

    journal_data = load_json(JOURNAL_DATA_FILE)
    # Return all entries as objects with entry, title, color
    user_journals = {}
    for date, entry_obj in journal_data.get(email, {}).items():
        if isinstance(entry_obj, dict):
            user_journals[date] = {
                'entry': entry_obj.get('entry', ''),
                'title': entry_obj.get('title', ''),
                'color': entry_obj.get('color', '#ccdeed')
            }
        else:
            user_journals[date] = {
                'entry': entry_obj,
                'title': '',
                'color': '#ccdeed'
            }
    return jsonify(user_journals), 200

# ------------------ SERVER STATUS ------------------

@app.route('/')
def index():
    return jsonify({"message": "Mood & Journal API is running"}), 200

# ------------------ RUN SERVER ------------------

if __name__ == '__main__':
    app.run(debug=True, port=5000)
