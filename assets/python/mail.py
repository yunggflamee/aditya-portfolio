import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

EMAIL = os.environ.get("EMAIL_USER", "yourfavworker2019@gmail.com")
APP_PASSWORD = os.environ.get("EMAIL_PASS", "iaif lozb spcr cdei")


def send_email(name, sender_email, message):

    msg = MIMEMultipart()

    msg["Subject"] = f"Portfolio Contact from {name}"
    msg["From"] = EMAIL
    msg["To"] = EMAIL

    body = f"""
New contact form message (Aditya's Portfolio)

Name: {name}
Email: {sender_email}

Message:
{message}
"""

    msg.attach(MIMEText(body, "plain"))

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()

    server.login(EMAIL, APP_PASSWORD)

    server.send_message(msg)

    server.quit()

    return True