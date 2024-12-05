from django.urls import path
from .views import send_verification_code

urlpatterns = [
    path("send-code/", send_verification_code, name="send_code"),
]
