# from django.db import models

# class RoomBooking(models.Model):
#     room_name = models.CharField(max_length=100)  # Name of the room
#     start_date = models.DateField()               # Booking start date
#     end_date = models.DateField()                 # Booking end date
#     booked_by = models.CharField(max_length=100)  # Name of the person who booked

#     def __str__(self):
#         return f"{self.room_name} ({self.start_date} - {self.end_date})"


# models.py in your Django app

from django.db import models

class RoomBooking(models.Model):
    first_name = models.CharField(max_length=100, null=True, blank=True)
    last_name = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    room_name = models.CharField(max_length=100)
    night_count = models.IntegerField(default=0)  # Field to store the number of nights
    total_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f'{self.first_name} {self.last_name} - {self.room_name} ({self.start_date} to {self.end_date})'


class VerificationCode(models.Model):
    email = models.EmailField()
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.email} - {self.code} - {self.created_at}"