# Hemant Patil – Portfolio (Flask + Tailwind CSS)

A premium, futuristic recruiter-focused portfolio featuring:
- Animated hero, glassmorphism cards, neon glow accents
- Dark / Light mode toggle
- AI chatbot
- Visitor counter
- Contact form → sends email directly to patilhemant1103@gmail.com
- Admin panel to manage projects
- Resume download

---

## 📂 Project Structure

```
Portfolio/
├── app.py                  ← Flask backend (all routes, SMTP email)
├── requirements.txt
├── Procfile                ← for Render deployment
├── portfolio.db            ← auto-generated SQLite DB
├── static/
│   ├── css/style.css
│   ├── js/main.js
│   └── assets/
│       └── Hemant_Patil_Resume.pdf   ← PUT YOUR RESUME HERE
└── templates/
    ├── index.html          ← main portfolio page
    └── admin/
        ├── login.html
        ├── dashboard.html
        └── project_form.html
```

---

## 🚀 Run Locally

```bash
# 1. Install dependencies
pip install flask gunicorn

# 2. (Optional) Set Gmail credentials as env vars for email sending
#    On Windows PowerShell:
$env:SMTP_USER     = "your_gmail@gmail.com"
$env:SMTP_PASSWORD = "your_gmail_app_password"

# 3. Start Flask dev server
python app.py
```

Open: http://127.0.0.1:5000

**Admin panel:** http://127.0.0.1:5000/admin/login
- Username: `admin`
- Password: `hemant@2024`

---

## 📧 Email Setup (Gmail App Password)

1. Go to your Google Account → **Security**
2. Enable **2-Step Verification** (required)
3. Search "App Passwords" → Generate one for "Mail"
4. Copy the 16-character password
5. Set environment variables:
   ```
   SMTP_USER     = patilhemant1103@gmail.com
   SMTP_PASSWORD = <your 16-char app password>
   ```

> If SMTP_USER / SMTP_PASSWORD are not set, the contact form still saves messages to the database (visible in Admin panel) — it just won't send an email.

---

## 📄 Resume

Place your resume PDF at:
```
static/assets/Hemant_Patil_Resume.pdf
```

Then the "Download Resume" button will work automatically.

---

## 🌐 Deploy on Render (Free)

1. Push project to GitHub
2. Go to https://render.com → New → **Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app`
   - **Environment Variables:**
     - `SMTP_USER` = patilhemant1103@gmail.com
     - `SMTP_PASSWORD` = <your Gmail App Password>
5. Click **Deploy**

Your portfolio will be live at: `https://your-app-name.onrender.com`

---

## 🔑 Change Admin Password

Edit the seed in `app.py`:
```python
c.execute("INSERT OR IGNORE INTO admin_users (username, password) VALUES (?, ?)",
          ("admin", "YOUR_NEW_PASSWORD"))
```
Then delete `portfolio.db` and restart the server.

---

© 2024 Hemant Patil · patilhemant1103@gmail.com
