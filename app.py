from flask import Flask, render_template, request, jsonify, redirect, url_for, session, send_from_directory
import sqlite3
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime
import functools

app = Flask(__name__)
app.secret_key = "hemant_portfolio_secret_2024_hp"

DB_PATH = os.path.join(os.path.dirname(__file__), "portfolio.db")

# ─────────────────────────────────────────────
# CONFIGURATION – update these before deploying
# ─────────────────────────────────────────────
OWNER_EMAIL   = "patilhemant1103@gmail.com"   # where contact form emails are sent
SMTP_HOST     = "smtp.gmail.com"
SMTP_PORT     = 587
# Set these via environment variables on Render (never hard-code passwords)
SMTP_USER     = os.environ.get("SMTP_USER", "")       # your Gmail address used to SEND
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "")   # Gmail App Password

LINKEDIN_URL  = "https://www.linkedin.com/in/hemant-patil-2b4bb1312"

# ─────────────────────────────────────────────
# DATABASE INIT
# ─────────────────────────────────────────────
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    c.execute('''CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TEXT NOT NULL
    )''')

    c.execute('''CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        tech_stack TEXT NOT NULL,
        live_url TEXT,
        is_featured INTEGER DEFAULT 0,
        created_at TEXT NOT NULL
    )''')

    c.execute('''CREATE TABLE IF NOT EXISTS visitors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip TEXT,
        visited_at TEXT NOT NULL
    )''')

    c.execute('''CREATE TABLE IF NOT EXISTS admin_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )''')

    c.execute("INSERT OR IGNORE INTO admin_users (username, password) VALUES (?, ?)",
              ("admin", "hemant@2024"))

    default_projects = [
        ("Student Management System",
         "Developed a scalable system to manage student records and workflows. Implemented authentication and structured data handling with role-based access control. Built responsive UI for a better user experience across all devices. Optimized backend performance with efficient database queries.",
         "Python,Django,MySQL,HTML,CSS,Bootstrap", "", 1),
        ("Online Polling System",
         "Created a dynamic polling platform with real-time result updates and live vote tracking. Designed a user-friendly voting interface for seamless participation. Ensured backend reliability, data integrity, and horizontal scalability for large audiences.",
         "Python,Django,JavaScript,MySQL,Bootstrap,Chart.js", "", 1),
        ("Auto Screenshot & Email System",
         "Automated periodic screenshot capture system that runs silently in the background. Integrated email delivery with timestamps using Python SMTP. Used multithreading and scheduling for seamless, uninterrupted performance.",
         "Python,Automation,SMTP,Threading,Schedule,Pillow", "", 1),
        ("Hospital Reception Automation System",
         "Automated hospital reception workflows reducing manual effort by 70%. Streamlined patient data management and appointment scheduling with a clean GUI.",
         "Python,Automation,SQLite,Tkinter", "", 0),
        ("Daily Activity Screen Monitor",
         "Built a monitoring system to capture and log daily screen activity for productivity analysis and time tracking.",
         "Python,OpenCV,Pillow,SQLite,Schedule", "", 0),
        ("House Price Prediction System",
         "ML model predicting house prices using regression algorithms. Achieved 90%+ accuracy on training data with proper cross-validation and feature engineering.",
         "Python,Scikit-learn,Pandas,NumPy,Flask,Matplotlib", "", 0),
        ("KrushiSarthi Smart Agriculture Platform",
         "Smart agriculture platform providing ML-based crop recommendations, pest detection alerts, and real-time weather integration to assist farmers.",
         "Python,ML,Flask,Django,API Integration,Bootstrap", "", 0),
    ]

    for p in default_projects:
        c.execute("SELECT id FROM projects WHERE title=?", (p[0],))
        if not c.fetchone():
            c.execute("""INSERT INTO projects (title, description, tech_stack, live_url, is_featured, created_at)
                         VALUES (?,?,?,?,?,?)""",
                      (*p, datetime.now().isoformat()))

    conn.commit()
    conn.close()


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# ─────────────────────────────────────────────
# ADMIN AUTH DECORATOR
# ─────────────────────────────────────────────
def admin_required(f):
    @functools.wraps(f)
    def decorated(*args, **kwargs):
        if not session.get("admin_logged_in"):
            return redirect(url_for("admin_login"))
        return f(*args, **kwargs)
    return decorated

# ─────────────────────────────────────────────
# VISITOR COUNTER
# ─────────────────────────────────────────────
def record_visit():
    ip = request.remote_addr
    conn = get_db()
    conn.execute("INSERT INTO visitors (ip, visited_at) VALUES (?, ?)",
                 (ip, datetime.now().isoformat()))
    conn.commit()
    count = conn.execute("SELECT COUNT(*) as cnt FROM visitors").fetchone()["cnt"]
    conn.close()
    return count

# ─────────────────────────────────────────────
# EMAIL HELPER
# ─────────────────────────────────────────────
def send_contact_email(sender_name, sender_email, message_body):
    """Send contact form submission to Hemant's Gmail."""
    if not SMTP_USER or not SMTP_PASSWORD:
        # SMTP not configured – just save to DB, don't crash
        return False, "Email not configured (set SMTP_USER and SMTP_PASSWORD env vars)"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"[Portfolio Contact] New message from {sender_name}"
    msg["From"]    = SMTP_USER
    msg["To"]      = OWNER_EMAIL
    msg["Reply-To"] = sender_email

    html_body = f"""
    <div style="font-family:Inter,sans-serif;background:#050712;padding:32px;border-radius:16px;max-width:600px;">
      <h2 style="color:#00f5ff;margin-bottom:4px;">New Portfolio Contact</h2>
      <p style="color:#6b7280;font-size:13px;margin-top:0;">Received via patilhemant1103@gmail.com portfolio</p>
      <hr style="border:1px solid rgba(255,255,255,0.08);margin:20px 0;"/>
      <table style="width:100%;font-size:14px;color:#e2e8f0;">
        <tr><td style="padding:8px 0;color:#9ca3af;width:100px;">Name</td><td style="color:#fff;font-weight:600;">{sender_name}</td></tr>
        <tr><td style="padding:8px 0;color:#9ca3af;">Email</td><td><a href="mailto:{sender_email}" style="color:#00f5ff;">{sender_email}</a></td></tr>
      </table>
      <hr style="border:1px solid rgba(255,255,255,0.06);margin:20px 0;"/>
      <h3 style="color:#b347ff;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;">Message</h3>
      <p style="color:#d1d5db;line-height:1.7;white-space:pre-wrap;">{message_body}</p>
      <hr style="border:1px solid rgba(255,255,255,0.06);margin:20px 0;"/>
      <p style="color:#4b5563;font-size:12px;">Sent from Hemant Patil Portfolio · {datetime.now().strftime('%d %b %Y, %I:%M %p')}</p>
    </div>
    """

    msg.attach(MIMEText(html_body, "html"))

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.ehlo()
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.sendmail(SMTP_USER, OWNER_EMAIL, msg.as_string())
        return True, "Email sent"
    except Exception as e:
        return False, str(e)

# ─────────────────────────────────────────────
# MAIN ROUTES
# ─────────────────────────────────────────────
@app.route("/")
def index():
    visitor_count = record_visit()
    conn = get_db()
    featured = conn.execute("SELECT * FROM projects WHERE is_featured=1 ORDER BY id").fetchall()
    extra    = conn.execute("SELECT * FROM projects WHERE is_featured=0 ORDER BY id").fetchall()
    conn.close()
    return render_template("index.html",
                           featured_projects=featured,
                           extra_projects=extra,
                           visitor_count=visitor_count,
                           linkedin_url=LINKEDIN_URL)

@app.route("/contact", methods=["POST"])
def contact():
    data    = request.get_json()
    name    = data.get("name",    "").strip()
    email   = data.get("email",   "").strip()
    message = data.get("message", "").strip()

    if not name or not email or not message:
        return jsonify({"success": False, "error": "All fields are required."}), 400

    # Save to DB
    conn = get_db()
    conn.execute("INSERT INTO contacts (name, email, message, created_at) VALUES (?,?,?,?)",
                 (name, email, message, datetime.now().isoformat()))
    conn.commit()
    conn.close()

    # Send email (best-effort, don't block success message if SMTP not configured)
    sent, info = send_contact_email(name, email, message)

    return jsonify({
        "success": True,
        "message": "Your message has been sent! Hemant will get back to you soon.",
        "email_sent": sent
    })

@app.route("/visitor-count")
def visitor_count_route():
    conn  = get_db()
    count = conn.execute("SELECT COUNT(*) as cnt FROM visitors").fetchone()["cnt"]
    conn.close()
    return jsonify({"count": count})

# ─────────────────────────────────────────────
# AI CHATBOT
# ─────────────────────────────────────────────
CHATBOT_KB = [
    (["skill","know","technology","tech","language","stack"],
     "Hemant is skilled in Python, JavaScript, Django, MERN Stack, Machine Learning, NLP, Generative AI, MySQL, MongoDB, Git, and automation technologies."),
    (["python"],
     "Hemant is an expert Python developer — web apps with Django/Flask, automation scripts, ML pipelines, and data processing."),
    (["project","built","made","created","developed"],
     "Hemant has built a Student Management System, Online Polling System, Auto Screenshot & Email System, Hospital Reception Automation, House Price Prediction, and KrushiSarthi Agriculture Platform."),
    (["experience","intern","work","job","career"],
     "Hemant has completed internships in Python Development, Automation Engineering, and AI/ML research, gaining strong industrial experience."),
    (["ml","machine learning","ai","artificial","nlp","deep","neural","model"],
     "Hemant has strong ML/AI skills — Scikit-learn, NLP with NLTK/spaCy, and Generative AI tools."),
    (["automat"],
     "Hemant specialises in Python automation — workflow automation, API integration, screenshot capture, email systems, and more."),
    (["django","flask","web","mern","react","node"],
     "Hemant has built multiple full-stack web apps using Django and Flask, and is proficient in the MERN stack."),
    (["contact","reach","hire","email","linkedin","connect"],
     f"You can reach Hemant at patilhemant1103@gmail.com or on LinkedIn: {LINKEDIN_URL}"),
    (["hello","hi","hey","who"],
     "Hi! I'm Hemant's AI assistant 👋 Ask me about his skills, projects, experience, or how to contact him!"),
]

@app.route("/chatbot", methods=["POST"])
def chatbot():
    msg  = request.get_json().get("message", "").lower()
    reply = "I'm Hemant's portfolio assistant! Ask me about his skills, projects, experience, or how to hire him. 😊"
    for keywords, response in CHATBOT_KB:
        if any(kw in msg for kw in keywords):
            reply = response
            break
    return jsonify({"reply": reply})

# ─────────────────────────────────────────────
# RESUME DOWNLOAD
# ─────────────────────────────────────────────
@app.route("/download-resume")
def download_resume():
    resume_dir  = os.path.join(os.path.dirname(__file__), "static", "assets")
    resume_file = "Hemant_Patil_Resume.pdf"
    full_path   = os.path.join(resume_dir, resume_file)
    if os.path.exists(full_path):
        return send_from_directory(resume_dir, resume_file, as_attachment=True)
    return jsonify({"error": "Resume PDF not found. Place your resume at static/assets/Hemant_Patil_Resume.pdf"}), 404

# ─────────────────────────────────────────────
# ADMIN PANEL
# ─────────────────────────────────────────────
@app.route("/admin/login", methods=["GET", "POST"])
def admin_login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        conn = get_db()
        user = conn.execute("SELECT * FROM admin_users WHERE username=? AND password=?",
                            (username, password)).fetchone()
        conn.close()
        if user:
            session["admin_logged_in"] = True
            return redirect(url_for("admin_dashboard"))
        return render_template("admin/login.html", error="Invalid credentials.")
    return render_template("admin/login.html", error=None)

@app.route("/admin/logout")
def admin_logout():
    session.pop("admin_logged_in", None)
    return redirect(url_for("admin_login"))

@app.route("/admin")
@admin_required
def admin_dashboard():
    conn = get_db()
    projects      = conn.execute("SELECT * FROM projects ORDER BY id DESC").fetchall()
    contacts      = conn.execute("SELECT * FROM contacts ORDER BY id DESC LIMIT 20").fetchall()
    visitor_count = conn.execute("SELECT COUNT(*) as cnt FROM visitors").fetchone()["cnt"]
    conn.close()
    return render_template("admin/dashboard.html",
                           projects=projects,
                           contacts=contacts,
                           visitor_count=visitor_count)

@app.route("/admin/project/add", methods=["GET", "POST"])
@admin_required
def admin_add_project():
    if request.method == "POST":
        conn = get_db()
        conn.execute("""INSERT INTO projects (title, description, tech_stack, live_url, is_featured, created_at)
                        VALUES (?,?,?,?,?,?)""",
                     (request.form.get("title"),
                      request.form.get("description"),
                      request.form.get("tech_stack"),
                      request.form.get("live_url", ""),
                      1 if request.form.get("is_featured") else 0,
                      datetime.now().isoformat()))
        conn.commit()
        conn.close()
        return redirect(url_for("admin_dashboard"))
    return render_template("admin/project_form.html", project=None)

@app.route("/admin/project/edit/<int:pid>", methods=["GET", "POST"])
@admin_required
def admin_edit_project(pid):
    conn    = get_db()
    project = conn.execute("SELECT * FROM projects WHERE id=?", (pid,)).fetchone()
    if request.method == "POST":
        conn.execute("""UPDATE projects SET title=?, description=?, tech_stack=?, live_url=?, is_featured=?
                        WHERE id=?""",
                     (request.form.get("title"),
                      request.form.get("description"),
                      request.form.get("tech_stack"),
                      request.form.get("live_url", ""),
                      1 if request.form.get("is_featured") else 0,
                      pid))
        conn.commit()
        conn.close()
        return redirect(url_for("admin_dashboard"))
    conn.close()
    return render_template("admin/project_form.html", project=project)

@app.route("/admin/project/delete/<int:pid>", methods=["POST"])
@admin_required
def admin_delete_project(pid):
    conn = get_db()
    conn.execute("DELETE FROM projects WHERE id=?", (pid,))
    conn.commit()
    conn.close()
    return redirect(url_for("admin_dashboard"))

# ─────────────────────────────────────────────
# ENTRY POINT
# ─────────────────────────────────────────────
if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=5000)
