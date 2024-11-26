package com.app.service.Impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.BookingDTO;
import com.app.dto.TourDetailsDTO;
import com.app.dto.TouristDTO;
import com.app.entities.Booking;
import com.app.entities.TourDetails;
import com.app.entities.Tourist;
import com.app.entities.User;
import com.app.repository.BookingRepositry;
import com.app.repository.TourDetailsRepository;
import com.app.repository.TouristRepository;
import com.app.repository.UserRepository;
import com.app.service.BookingService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {
	@Autowired
	ModelMapper modelMapper;
	@Autowired
	BookingRepositry  bookingRepo;

	@Autowired
	UserRepository userRepo;
	@Autowired
	TourDetailsRepository tourRepo;
	@Autowired
	TouristRepository touristAdd;

	@Override
	public BookingDTO createBooking(BookingDTO bookingdto, Long tourDetailId, Long userId, List<TouristDTO> touristDtos) {
		Booking booking = this.modelMapper.map(bookingdto, Booking.class);

		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("user", "userId", userId));
		TourDetails tour = this.tourRepo.findById(tourDetailId)
				.orElseThrow(() -> new ResourceNotFoundException("tour", "tourDetailId", tourDetailId));

		booking.setUser(user);
		booking.setTourDetails(tour);

		Booking createdBooking = bookingRepo.save(booking);

		List<Tourist> tourists = touristDtos.stream()
			.map(tr -> {
				Tourist tourist = this.modelMapper.map(tr, Tourist.class);
				tourist.setBooking(createdBooking); // Gắn Booking
				return tourist;
			})
			.collect(Collectors.toList());

		touristAdd.saveAll(tourists); 
		createdBooking.setTouristList(tourists);

		if (tour.getMaxSeats() >= createdBooking.getSeatCount()) {
			tour.setMaxSeats(tour.getMaxSeats() - createdBooking.getSeatCount());
		} else {
			throw new RuntimeException("Not enough seats available for booking!");
		}

		return this.modelMapper.map(createdBooking, BookingDTO.class);
	}

	@Override
	public void DeleteBookingById(Long bookingId) {
		Booking deleteBooking = this.bookingRepo.findById(bookingId)
				.orElseThrow(() -> new ResourceNotFoundException("booking", "bookingId", bookingId));
		this.bookingRepo.delete(deleteBooking);
	}

	@Override
	public BookingDTO getBookingById(Long bookingId) {
		Booking getBooking = this.bookingRepo.findById(bookingId)
				.orElseThrow(() -> new ResourceNotFoundException("booking", "bookingId", bookingId));
		return this.modelMapper.map(getBooking, BookingDTO.class);
	}

	@Override
	public List<BookingDTO> getAllBooking() {
		List<Booking> getAllBooking = this.bookingRepo.findAll();
		List<BookingDTO> getAllBookingDTO = getAllBooking.stream()
				.map((getbooking) -> this.modelMapper.map(getbooking, BookingDTO.class)).collect(Collectors.toList());
		return getAllBookingDTO;
	}


	@Override
	public List<BookingDTO> getBookingByDuration(LocalDate startDate, LocalDate endDate) {
		List<Booking> getAllBooking=this.bookingRepo.findByBookingDateBetween(startDate, endDate);
		List<BookingDTO> getAllBookingDto = getAllBooking.stream().map((getBooking) -> this.modelMapper.map(getBooking, BookingDTO.class)).collect(Collectors.toList());
		return getAllBookingDto;
	}

	@Override
	public List<BookingDTO> getBooksByTourID(Long tourId) {
		List<Booking> bookings=this.bookingRepo.findByTourDetailsTourId(tourId);
		List<BookingDTO> bookingdto=bookings.stream().map((booking)->this.modelMapper.map(booking,BookingDTO.class)).collect(Collectors.toList());
		return bookingdto;
	}

	@Override
	public List<BookingDTO> getBookingsByUserId(Long userId) {
		List<Booking> bookings=this.bookingRepo.findByUserUserId(userId);
//		List<BookingDTO> bookingdto=bookings.stream()
//				.map(
//					(booking)->this.modelMapper
//						.map(booking,BookingDTO.class)).collect(Collectors.toList()
//				);
        @SuppressWarnings("Convert2Diamond")
		List<BookingDTO> dtoList = new ArrayList<BookingDTO>();
		bookings.forEach(
					booking -> {
						BookingDTO dto = modelMapper.map(booking, BookingDTO.class);
						dto.setTourDetails(modelMapper.map(booking.getTourDetails(), TourDetailsDTO.class));
						dtoList.add(dto);
					}
				);
//		return bookingdto;
		return dtoList;
	}
}