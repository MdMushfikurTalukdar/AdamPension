# views.py

from django.core.mail import send_mail
from django.http import JsonResponse
from rest_framework.decorators import api_view

@api_view(['POST'])
def send_email(request):
    subject = request.data.get('subject')
    message = request.data.get('message')
    recipient_email = request.data.get('to')

    try:
        send_mail(
            subject,
            message,
            'juliajac13@gmail.com',  # Sender's email
            [recipient_email],  # Receiver's email
            fail_silently=False,
        )
        return JsonResponse({'message': 'Email sent successfully!'}, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
