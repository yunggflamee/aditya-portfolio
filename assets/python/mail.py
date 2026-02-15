import os
import resend

resend.api_key = os.environ.get("RESEND_API_KEY")
EMAIL = os.environ.get("EMAIL_USER", "yourfavworker2019@gmail.com")


def send_email(name, sender_email, message):
    
    print(f"[MAIL] Sending email from {name} via Resend...")

    try:
        params = {
            "from": "Portfolio <onboarding@resend.dev>",
            "to": [EMAIL],
            "subject": f"Portfolio Contact from {name}",
            "html": f"""
            <h2>New Contact Form Message</h2>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {sender_email}</p>
            <p><strong>Message:</strong></p>
            <p>{message}</p>
            """
        }
        
        email = resend.Emails.send(params)
        print(f"[MAIL] ✅ Email sent! ID: {email['id']}")
        return True
        
    except Exception as e:
        print(f"[MAIL ERROR] ❌ {e}")
        raise