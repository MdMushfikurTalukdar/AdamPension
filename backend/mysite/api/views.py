from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from .models import RoomBooking
from .serializers import RoomBookingSerializer
from datetime import datetime

from django.core.mail import EmailMessage

import stripe
from django.conf import settings
from rest_framework import status




# POST API - Save a new booking
@api_view(['POST'])
def save_booking(request):
    if request.method == 'POST':
        serializer = RoomBookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Booking saved successfully!', 'data': serializer.data}, status=201)
        return Response(serializer.errors, status=400)

# GET API - Search bookings by room name
@api_view(['GET'])
def get_bookings_by_room_name(request, room_name):
    if request.method == 'GET':
        bookings = RoomBooking.objects.filter(room_name=room_name)
        if not bookings.exists():
            return Response({'message': f'No bookings found for room: {room_name}'}, status=404)
        serializer = RoomBookingSerializer(bookings, many=True)
        return Response({'bookings': serializer.data}, status=200)

# GET API - Search bookings by start and end month
@api_view(['GET'])
def get_bookings_by_month(request, start_month, end_month):
    if request.method == 'GET':
        try:
            start_month = datetime.strptime(start_month, '%Y-%m').date()
            end_month = datetime.strptime(end_month, '%Y-%m').date()

            bookings = RoomBooking.objects.filter(
                Q(start_date__month__gte=start_month.month, start_date__year=start_month.year) &
                Q(end_date__month__lte=end_month.month, end_date__year=end_month.year)
            )

            if not bookings.exists():
                return Response({'message': 'No bookings found for the specified date range.'}, status=404)

            serializer = RoomBookingSerializer(bookings, many=True)
            return Response({'bookings': serializer.data}, status=200)
        except ValueError as e:
            return Response({'error': 'Invalid date format. Use YYYY-MM format.'}, status=400)


@api_view(['GET'])
def get_all_bookings(request):
    if request.method == 'GET':
        bookings = RoomBooking.objects.all()  # Fetch all bookings from the database
        if not bookings.exists():
            return Response({'message': 'No bookings found'}, status=404)
        serializer = RoomBookingSerializer(bookings, many=True)
        return Response({'bookings': serializer.data}, status=200)



# # New Email API - Send a Verification Email
# @api_view(['POST'])
# def send_verification_email(request):
#     """
#     Send a verification email to the provided email address.
#     Request payload: {"email": "user@example.com"}
#     """
#     if request.method == 'POST':
#         email_address = request.data.get('email', None)

#         if not email_address:
#             return Response({'error': 'Email address is required.'}, status=400)

#         try:
#             # Generate a verification code (for example, a random 6-digit number)
#             import random
#             verification_code = random.randint(100000, 999999)

#             # Save the code in the session (or a database if needed)
#             request.session['verification_code'] = verification_code

#             # Compose and send the email
#             email = EmailMessage(
#                 subject="Your Verification Code",
#                 body=f"Your verification code is: {verification_code}",
#                 to=[email_address]
#             )
#             email.send()

#             return Response({'message': 'Verification email sent successfully!'}, status=200)
#         except Exception as e:
#             return Response({'error': str(e)}, status=500)

# API - Verify the Email Code
import random
import logging
logger = logging.getLogger(__name__)

# @api_view(['POST'])
# def send_verification_email(request):
#     """
#     Send a verification email to the provided email address.
#     """
#     email_address = request.data.get('email', None)

#     if not email_address:
#         return Response({'error': 'Email address is required.'}, status=400)

#     try:
#         # Generate a 6-digit verification code
#         verification_code = random.randint(100000, 999999)
#         # Save the code in the session for verification
#         request.session['verification_code'] = verification_code

#         # Log the verification code (for debugging purposes)
#         logger.debug(f"Verification code stored in session: {verification_code}")

#         # Compose and send the email
#         email = EmailMessage(
#             subject="Your Verification Code",
#             body=f"Your verification code is: {verification_code}",
#             to=[email_address],
#         )
#         email.send()

#         return Response({'message': 'Verification email sent successfully!'}, status=200)
#     except Exception as e:
#         logger.error(f"Error while sending verification email: {e}")
#         return Response({'error': str(e)}, status=500)



@api_view(['POST'])
def send_verification_email(request):
    """
    Send a verification email to the provided email address.
    """
    email_address = request.data.get('email', None)
    verification_code = request.data.get('code', None)

    if not email_address or not verification_code:
        return Response({'error': 'Email address and verification code are required.'}, status=400)

    try:
        # Log the received verification code (for debugging purposes)
        logger.debug(f"Received verification code: {verification_code}")

        # Compose and send the email
        email = EmailMessage(
            subject="Adam’s Pension Verification Code",
            body=f"Your verification code is: {verification_code}",
            to=[email_address],
        )
        email.send()

        return Response({'message': 'Verification email sent successfully!'}, status=200)
    except Exception as e:
        logger.error(f"Error while sending verification email: {e}")
        return Response({'error': str(e)}, status=500)

@api_view(['POST'])
def successfull_message(request):
    """
    Send a verification email to the provided email address.
    """
    email_address = request.data.get('email', None)
    verification_code = request.data.get('code', None)

    if not email_address or not verification_code:
        return Response({'error': 'Email address and verification code are required.'}, status=400)

    try:
        # Log the received verification code (for debugging purposes)
        logger.debug(f"Received verification code: {verification_code}")

        # Compose and send the email
        email = EmailMessage(
            subject="Adam’s Pension Verification",
            body=f"Successfully you have booked Adam’s Pension room",
            to=[email_address],
        )
        email.send()

        return Response({'message': 'Verification email sent successfully!'}, status=200)
    except Exception as e:
        logger.error(f"Error while sending verification email: {e}")
        return Response({'error': str(e)}, status=500)

@api_view(['POST'])
def verify_code(request):
    """
    Verify the code provided by the user.
    """
    code = request.data.get('code', None)

    if not code:
        return Response({'error': 'Verification code is required.'}, status=400)

    # Retrieve the stored code from session
    stored_code = request.session.get('verification_code', None)

    # Log the stored code and user input for debugging
    print(f"Stored code from session: {stored_code}")
    print(f"User input code: {code}")

    if stored_code and str(code).strip() == str(stored_code).strip():
        # If the codes match, delete the session code and confirm the verification
        del request.session['verification_code']
        return Response({'message': 'Verification successful!'}, status=200)

    return Response({'error': 'Invalid verification code.'}, status=400)


from .models import VerificationCode
from .serializers import VerificationCodeSerializer

@api_view(['GET'])
def view_all_codes(request):
    """
    View all verification codes, associated email addresses, and creation times.
    """
    if request.method == 'GET':
        verification_records = VerificationCode.objects.all()  # Fetch all verification records
        if not verification_records.exists():
            return Response({'message': 'No verification codes found.'}, status=404)

        serializer = VerificationCodeSerializer(verification_records, many=True)
        return Response({'verification_codes': serializer.data}, status=200)

# Set the Stripe secret key
stripe.api_key = settings.STRIPE_SECRET_KEY

@api_view(['POST'])
def create_payment_intent(request):
    """
    Create a Stripe PaymentIntent to handle payments.
    """
    try:
        # Get amount and currency from the request
        amount = request.data.get('amount')  # Amount in cents
        currency = request.data.get('currency', 'eur')  # Default to USD if not provided

        if not amount:
            return Response({'error': 'Amount is required.'}, status=400)

        # Create a PaymentIntent
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            payment_method_types=["card"],
        )

        return Response({
            'client_secret': intent['client_secret']
        }, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=500)


# import requests
# PAYPAL_CLIENT_ID = "Your PayPal Client ID"
# PAYPAL_SECRET = "Your PayPal Secret"
# PAYPAL_BASE_URL = "https://api.sandbox.paypal.com"  # Use sandbox for testing

# def get_paypal_token():
#     url = f"{PAYPAL_BASE_URL}/v1/oauth2/token"
#     headers = {"Accept": "application/json", "Accept-Language": "en_US"}
#     data = {"grant_type": "client_credentials"}
#     response = requests.post(url, headers=headers, data=data, auth=(PAYPAL_CLIENT_ID, PAYPAL_SECRET))
#     return response.json()

# @api_view(["POST"])
# def create_order(request):
#     token = get_paypal_token().get("access_token")
#     url = f"{PAYPAL_BASE_URL}/v2/checkout/orders"
#     headers = {
#         "Content-Type": "application/json",
#         "Authorization": f"Bearer {token}",
#     }
#     amount = request.data.get("amount")  # Get the dynamic amount from the request body
#     if not amount:
#         return Response({"error": "Amount is required"}, status=400)

#     data = {
#         "intent": "CAPTURE",
#         "purchase_units": [
#             {
#                 "amount": {
#                     "currency_code": "USD",
#                     "value": amount,  # Use the dynamic amount
#                 },
#             },
#         ],
#     }
#     response = requests.post(url, headers=headers, json=data)
#     return Response(response.json())


# @api_view(["POST"])
# def capture_order(request, order_id):
#     token = get_paypal_token().get("access_token")
#     url = f"{PAYPAL_BASE_URL}/v2/checkout/orders/{order_id}/capture"
#     headers = {
#         "Content-Type": "application/json",
#         "Authorization": f"Bearer {token}"
#     }
#     response = requests.post(url, headers=headers)
#     return Response(response.json())

import paypalrestsdk
# Configure PayPal SDK
paypalrestsdk.configure({
    "mode": "sandbox",  # 'live' for production
    "client_id": "YOUR_PAYPAL_CLIENT_ID",
    "client_secret": "YOUR_PAYPAL_SECRET",
})

@api_view(['POST'])
def create_payment_paypal(request):
    # Extract email and amount from the request
    email = request.data.get('email')
    amount = request.data.get('amount')

    if not email or not amount:
        return Response({'error': 'Email and amount are required'}, status=400)

    # Create PayPal payment
    payment = paypalrestsdk.Payment({
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "transactions": [{
            "amount": {
                "total": str(amount),  # Use the dynamic amount
                "currency": "USD"  # You can change this currency as needed
            },
            "payee": {
                "email": email  # The recipient's PayPal email
            },
            "description": "Payment for service"
        }],
        "redirect_urls": {
            "return_url": "http://yourfrontend.com/success",  # Adjust with your success URL
            "cancel_url": "http://yourfrontend.com/cancel"  # Adjust with your cancel URL
        }
    })

    # Create the payment and return the approval URL
    if payment.create():
        approval_url = next(link.href for link in payment.links if link.rel == "approval_url")
        return Response({'approval_url': approval_url})
    else:
        return Response({'error': 'Payment creation failed'}, status=500)

