import React, { useState } from "react";
import {
  Maximize2,
  Mountain,
  Users2,
  ArrowLeftCircle,
  ArrowRightCircle,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import SignUpForm from "../pages/SignUpForm";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import "./calender.css";

export default function Room() {
  const rooms = [
    {
      name: "Double Bed Room",
      images: [
        "https://i.ibb.co.com/423pxtz/IMG-20241112-WA0013.jpg",
        "https://i.ibb.co.com/Y8QSQgJ/IMG-20241112-WA0007.jpg",
        "https://i.ibb.co.com/DQ3DRhy/IMG-20241112-WA0010.jpg",
        "https://i.ibb.co.com/PjGrNBy/IMG-20241112-WA0012.jpg",
        "https://i.ibb.co.com/QJTH5YP/IMG-20241112-WA0014.jpg",
        "https://i.ibb.co.com/tJKjmxR/IMG-20241112-WA0015.jpg",
        "https://i.ibb.co.com/9wWTdDB/IMG-20241112-WA0016.jpg",
        "https://i.ibb.co.com/r3XLp3K/IMG-20241112-WA0017.jpg",
        "https://i.ibb.co.com/RTfqzff/IMG-20241112-WA0018.jpg",
        "https://i.ibb.co.com/5xXKV32/IMG-20241112-WA0019.jpg",
        "https://i.ibb.co.com/djyC4Vp/IMG-20241112-WA0020.jpg",
        "https://i.ibb.co.com/WnMbD5d/IMG-20241112-WA0021.jpg",
        "https://i.ibb.co.com/5TbnWj9/IMG-20241112-WA0022.jpg",
        "https://i.ibb.co.com/GFzYjLz/IMG-20241112-WA0024.jpg",
        "https://i.ibb.co.com/P9PqbS1/IMG-20241112-WA0025.jpg",
      ],
      capacity: "2 Adults",
      size: "20sqm",
      view: "City",
      price: "45",
      href: "#",
    },
    {
      name: "Double Bed Room",
      images: [
        "https://i.ibb.co.com/DQ3DRhy/IMG-20241112-WA0010.jpg",
        "https://i.ibb.co.com/423pxtz/IMG-20241112-WA0013.jpg",
        "https://i.ibb.co.com/Y8QSQgJ/IMG-20241112-WA0007.jpg",
        "https://i.ibb.co.com/PjGrNBy/IMG-20241112-WA0012.jpg",
        "https://i.ibb.co.com/QJTH5YP/IMG-20241112-WA0014.jpg",
        "https://i.ibb.co.com/tJKjmxR/IMG-20241112-WA0015.jpg",
        "https://i.ibb.co.com/9wWTdDB/IMG-20241112-WA0016.jpg",
        "https://i.ibb.co.com/r3XLp3K/IMG-20241112-WA0017.jpg",
        "https://i.ibb.co.com/RTfqzff/IMG-20241112-WA0018.jpg",
        "https://i.ibb.co.com/5xXKV32/IMG-20241112-WA0019.jpg",
        "https://i.ibb.co.com/djyC4Vp/IMG-20241112-WA0020.jpg",
        "https://i.ibb.co.com/WnMbD5d/IMG-20241112-WA0021.jpg",
        "https://i.ibb.co.com/5TbnWj9/IMG-20241112-WA0022.jpg",
        "https://i.ibb.co.com/GFzYjLz/IMG-20241112-WA0024.jpg",
        "https://i.ibb.co.com/P9PqbS1/IMG-20241112-WA0025.jpg",
      ],
      capacity: "2 Adults",
      size: "20sqm",
      view: "City",
      price: "45",
      href: "#",
    },
    {
      name: "Single Bed Room",
      images: [
        "https://i.ibb.co.com/L8tdzk7/IMG-20241112-WA0033.jpg",
        "https://i.ibb.co.com/FV3W9ZY/IMG-20241112-WA0026.jpg",
        "https://i.ibb.co.com/25X1SQC/IMG-20241112-WA0023.jpg",
        "https://i.ibb.co.com/5r5WVWz/IMG-20241112-WA0027.jpg",
        "https://i.ibb.co.com/2StPZx0/IMG-20241112-WA0028.jpg",
        "https://i.ibb.co.com/bbWZxmL/IMG-20241112-WA0029.jpg",
        "https://i.ibb.co.com/FDdY2vg/IMG-20241112-WA0030.jpg",
      ],
      capacity: "1 Adults",
      size: "15sqm",
      view: "City",
      price: "40",
      href: "#",
    },
    // Other rooms...
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDates, setSelectedDates] = useState([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const openModal = (index) => {
    setCurrentRoomIndex(index);
    setCurrentImageIndex(0); // Start from the first image
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsCalendarOpen(false); // Close calendar if modal is closed
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === rooms[currentRoomIndex].images.length - 1
        ? 0
        : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0
        ? rooms[currentRoomIndex].images.length - 1
        : prevIndex - 1
    );
  };

  const handleDateChange = (date) => {
    let newDates = [...selectedDates];
    if (newDates.length === 0) {
      newDates.push(date);
    } else {
      const lastDate = newDates[newDates.length - 1];
      if (lastDate.getTime() === date.getTime()) {
        newDates.pop(); // Remove the same date if clicked again
      } else {
        // Select all dates between the last date and the clicked date
        const rangeDates = getDatesInRange(lastDate, date);
        newDates = [...newDates, ...rangeDates];
      }
    }
    setSelectedDates(newDates);
  };

    const getDatesInRange = (startDate, endDate) => {
        let dates = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    };

    // const handleBooking = () => {
    //     alert(`You have booked from ${selectedDates[0].toLocaleDateString()} to ${selectedDates[selectedDates.length - 1].toLocaleDateString()}`);
    //     setIsCalendarOpen(false); // Close calendar after booking
    // };

    const [open, setOpen] = useState(false);
    const handleBooking = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <section className="py-12 md:py-24">
            <div className="max-w-screen-xl mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Our Rooms
                    </h2>
                    <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                        Maecenas feugiat mattis ipsum, vitae semper massa
                        porttitor sit amet. Nulla mattis, urna et posuere
                        ornare, neque leo dapibus ante, nec dignissim.
                    </p>
                </div>
                

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {rooms.map((room, index) => (
                        <div
                        onClick={() => openModal(index)} 
                            key={room.name}
                            className="flex flex-col bg-white rounded-lg overflow-hidden border"
                        >
                            <div className="relative h-64 sm:h-80">
                                <img
                                    src={room.images[0]} // Show the first image for each room
                                    alt={room.name}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="p-6 space-y-4">
                                <h3 className="text-2xl font-bold">{room.name}</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center text-gray-500">
                                        <Users2 className="h-5 w-5 mr-2" />
                                        <span>Capacity: {room.capacity}</span>
                                    </div>
                                    <div className="flex items-center text-gray-500">
                                        <Maximize2 className="h-5 w-5 mr-2" />
                                        <span>Size: {room.size}</span>
                                    </div>
                                    <div className="flex items-center text-gray-500">
                                        <Mountain className="h-5 w-5 mr-2" />
                                        <span>View: {room.view}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t">
                                    <div className="font-bold">€ {room.price} / Night</div>
                                    <button
                                        onClick={() => openModal(index)}
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                                    >
                                        View Room
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white rounded-lg w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 p-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-2xl font-bold">
                                {rooms[currentRoomIndex].name}
                            </h3>
                            <Button
                                onClick={closeModal}
                                variant="contained"
                                startIcon={<ArrowLeftIcon />}
                                sx={{
                                    backgroundColor: '#ff6666', // Light red color for the default state
                                    '&:hover': {
                                    backgroundColor: '#d32f2f', // Darker red on hover
                                    },
                                }}
                            >
                                Exit
                            </Button>

                        </div>
                        <div className="flex justify-between mt-4">
                            <button onClick={prevImage} className="text-blue-500" style={{marginRight:'20px'}}
                            >
                                <ArrowLeftCircle className="w-12 h-12" />
                            </button>
                            <div className="w-full h-[400px] sm:h-[500px] flex items-center justify-center">
                                <img
                                    src={rooms[currentRoomIndex].images[currentImageIndex]}
                                    alt="Room"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <button onClick={nextImage} className="text-blue-500" style={{marginLeft:'20px'}}>
                                <ArrowRightCircle className="w-12 h-12" />
                            </button>
                        </div>
                        {/* <div className="mt-4 space-y-2">
                            <div className="flex items-center">
                                <Users2 className="w-5 h-5" />
                                <span>{rooms[currentRoomIndex].capacity}</span>
                            </div>
                            <div className="flex items-center">
                                <Maximize2 className="w-5 h-5" />
                                <span>{rooms[currentRoomIndex].size}</span>
                            </div>
                            <div className="flex items-center">
                                <Mountain className="w-5 h-5" />
                                <span>{rooms[currentRoomIndex].view}</span>
                            </div>
                        </div> */}
                        <div className="flex justify-between items-center mt-6">
                            <div className="font-bold">€ {rooms[currentRoomIndex].price} / Night</div>
                            <button
                                onClick={() => setIsCalendarOpen(true)}
                                className="bg-blue-500 text-white rounded-md py-2 px-4"
                            >
                                Book Now
                            </button>
                        </div>
                        {/* Calendar Popup */}


                        {isCalendarOpen && (
                            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 z-10 flex items-center justify-center">
                                <div className="bg-white p-6 rounded-lg calender">
                                    <DatePicker
                                        selected={selectedDates[0]}
                                        onChange={handleDateChange}
                                        inline
                                        monthsShown={2}
                                        highlightDates={selectedDates}
                                    />
                                    <div className="mt-4">
                                        <Button
                                            onClick={handleBooking}
                                            variant="contained"
                                            color="success"
                                            style={{ backgroundColor: '#4caf50', color: '#fff' }}
                                        >
                                            Confirm Booking
                                        </Button>
                                        <Button
                                            onClick={closeModal}
                                            variant="contained"
                                            style={{ backgroundColor: '#f55454', color: '#fff', float:'right'}}
                                        >
                                            Cancel
                                        </Button>

                                        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                                            <DialogTitle></DialogTitle>
                                            <DialogContent>
                                            <SignUpForm />
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            </div>
                        )}



                        
                    </div>
                </div>
            )}
        </section>
    );
}
