from django.urls import path
from .views import (
    save_booking,
    get_bookings_by_room_name,
    get_bookings_by_month,
    get_all_bookings,
    send_verification_email,
    verify_code,
    view_all_codes,
    successfull_message,
    create_payment_intent,
    # create_order,        # New endpoint for creating PayPal order
    # capture_order,       # New endpoint for capturing PayPal order
    create_payment_paypal,
)

urlpatterns = [
    path('api/bookings/', save_booking, name='save_booking'),  # POST request for saving a booking
    path('api/bookings/all/', get_all_bookings, name='get_all_bookings'),  # GET request for fetching all bookings
    path('api/bookings/<str:room_name>/', get_bookings_by_room_name, name='get_bookings_by_room_name'),  # GET request for bookings by room name
    path('api/bookings/month/<str:start_month>/<str:end_month>/', get_bookings_by_month, name='get_bookings_by_month'),  # GET request for bookings by month range

    path('api/email/verify/', send_verification_email, name='send_verification_email'),  # Correct endpoint
    path('api/email/verify-code/', verify_code, name='verify_code'),

    path('api/view-all-codes/', view_all_codes, name='view_all_codes'),  # New endpoint to view all codes and emails
    path('api/email/successfull-message', successfull_message, name='successfull_message'),

    path('api/create-payment-intent/', create_payment_intent, name='create-payment-intent'),

    # path('api/paypal/create-order/', create_order, name='create_order'),       # New endpoint
    # path('api/paypal/capture-order/<str:order_id>/', capture_order, name='capture_order'),  # New endpoint

    path('api/create-payment-paypal/', create_payment_intent, name='create_payment_paypal'),

]



# from django.urls import path
# from .views import save_booking, get_bookings_by_room_name, get_bookings_by_month, get_all_bookings

# urlpatterns = [
#     path('api/bookings/', save_booking, name='save_booking'),  # POST request for saving a booking
#     path('api/bookings/all/', get_all_bookings, name='get_all_bookings'),  # GET request for fetching all bookings
#     path('api/bookings/<str:room_name>/', get_bookings_by_room_name, name='get_bookings_by_room_name'),  # GET request for bookings by room name
#     path('api/bookings/month/<str:start_month>/<str:end_month>/', get_bookings_by_month, name='get_bookings_by_month'),  # GET request for bookings by month range

# ]