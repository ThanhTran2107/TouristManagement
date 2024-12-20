package com.app.service;

import java.time.LocalDate;
import java.util.List;

import com.app.dto.BookingDTO;
import com.app.dto.TouristDTO;
import com.app.entities.PaymentStatus;

public interface BookingService {
	
	BookingDTO createBooking(BookingDTO bookingdto, Long userId, Long tourDetailId, List<TouristDTO> touristDtos);

	void DeleteBookingById(Long bookingId);

	BookingDTO getBookingById(Long bookingId);

	List<BookingDTO> getAllBooking();

	List<BookingDTO> getBooksByTourID(Long tourId);

	List<BookingDTO> getBookingsByUserId(Long userId);

	List<BookingDTO> getBookingByDuration(LocalDate startdate, LocalDate lastDate);

	public boolean updateSeats(Long tourId, int newSeatCount);
	
	public boolean updatePaymentStatus(Long bookingId, PaymentStatus paymentStatus);

}
