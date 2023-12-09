import smtplib
from email.message import EmailMessage


class SendMail:
    def __init__(
            self,
            host,
            port,
            email_address_from,
            email_password,
            email_address_to,
            message,
            subject
    ):

        self.host = host
        self.port = port
        self.email_address_from = email_address_from
        self.email_password = email_password
        self.email_address_to = email_address_to
        self.message_text = message
        self.subject = subject

    def send_email(self):
        try:
            msg = EmailMessage()
            msg['Subject'] = self.subject
            msg['From'] = self.email_address_from
            msg['To'] = self.email_address_to
            msg.set_content(self.message_text)

            server = smtplib.SMTP(f'{self.host}:{self.port}')
            server.starttls()
            server.login(self.email_address_from, self.email_password)
            server.send_message(msg)
            server.quit()
            return 'Message send successful'
        except:
            return 'An error occurred while sending the message'
