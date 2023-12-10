import smtplib
from email.message import EmailMessage
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


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
            message = MIMEMultipart()
            message['From'] = self.email_address_from
            message['To'] = self.email_address_to
            message['Subject'] = self.subject

            message.attach(MIMEText(self.message_text, 'plain'))

            print(f'{self.host}:{self.port}')
            with smtplib.SMTP_SSL(f'{self.host}:{self.port}') as server:
                print(server)
                server.login(self.email_address_from, self.email_password)
                print('server connected successful')
                server.send_message(message)
            return 'Message send successful'
        except:
            return 'An error occurred while sending the message'
