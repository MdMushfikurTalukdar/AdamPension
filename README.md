# AdamPension

**AdamPension** is a web-based application designed for efficient management and booking of hotel rooms. The platform integrates modern UI/UX design and robust backend functionality, ensuring a smooth experience for users.

---

## Features

### Room Management
- **Room Details**: Displays essential information and images of available rooms.
- **Interactive Calendar**: Shows marked dates for already booked rooms, allowing users to select their desired booking period.

### Booking Process
1. **Booking Availability**: Clients can view room availability and select their preferred dates.
2. **Email Verification**: A verification code is sent to confirm the client's email address. Only verified users can proceed with the booking process.

### Payment System
- **Multiple Payment Methods**:
  - **Stripe**
  - **PayPal**
- Payment is securely processed, ensuring user safety and trust.

### Booking Confirmation
- Upon successful payment, an authentication email is sent to the client with a confirmation message.

---

## Technologies Used

### Frontend
- **React.js**: For building the user interface.
- **Material-UI**: For sleek and responsive UI components.
- **Hosting**: Frontend hosted on [Vercel](https://react-mansion.vercel.app/).

### Backend
- **Django**: A high-level Python web framework.
- **Django Rest Framework (DRF)**: For creating RESTful APIs.
- **Hosting**: Backend hosted on [PythonAnywhere](https://www.pythonanywhere.com/).

### Payment Integration
- **Stripe API**
- **PayPal API**

---

## Installation (For Local Development)

### Prerequisites
- Node.js and npm
- Python 3.x
- Django

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/MdMushfikurTalukdar/AdamPension.git
2. Navigate to the frontend directory:
  cd AdamPension/frontend
3. Install dependencies:
  npm install
4. Start the development server:
  npm start
  The application will be available at `http://localhost:3000`.

---


### Backend Setup
1. Navigate to the backend directory:
  cd AdamPension/backend
2. Create a virtual environment and activate it:
  python -m venv env source env/bin/activate # On Windows: env\Scripts\activate
3. Install dependencies:
  pip install -r requirements.txt
4. Configure payment keys and email settings in the environment variables or `settings.py` file.
5. Run migrations:
  python manage.py migrate
6. Start the backend server:
  python manage.py runserver
  The API will be available at `http://localhost:8000`.

---


## Deployment

### Frontend
- Hosted on [Vercel](https://react-mansion.vercel.app/). 
- Ensure the base API URL in the frontend matches the deployed backend URL.

### Backend
- Hosted on [PythonAnywhere](https://www.pythonanywhere.com/).
- Ensure email and payment configurations are properly set in the deployment environment.

---

## Usage

1. Access the frontend through the Vercel-hosted URL: [https://react-mansion.vercel.app/](https://react-mansion.vercel.app/).
2. Browse rooms with images and availability.
3. Book a room by verifying email and selecting a payment method.
4. Receive a booking confirmation email upon successful payment.

---

## Folder Structure

AdamPension/ <br>
├── frontend/ # React.js application <br>
├── backend/ # Django backend <br>
├── README.md # Project documentation

---


## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature description"`.
4. Push to the branch: `git push origin feature-name`.
5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For any inquiries, please contact:  
**Email:** mithutalukdar09@gmail.com  
**GitHub:** [MdMushfikurTalukdar](https://github.com/MdMushfikurTalukdar)
