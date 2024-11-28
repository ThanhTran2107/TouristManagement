package com.app.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.app.dto.ApiResponse;
import com.app.dto.BookingDTO;
import com.app.dto.BookingWrapper;
import com.app.dto.SeatUpdateRequest;
import com.app.entities.PaymentStatus;
import com.app.service.BookingService;

@RestController
@RequestMapping("/booking")
@SuppressWarnings("Convert2Diamond")
@CrossOrigin(origins="http://localhost:3000")
public class BookingController {
	@Autowired
	BookingService bookingService;

	@PostMapping("/createBooking/tour/{tourId}/user/{userId}")
	public ResponseEntity<BookingDTO> createBooking(@RequestBody BookingWrapper bookingWrapper ,  @PathVariable Long tourId,@PathVariable Long userId) {
		BookingDTO bookingcreated = this.bookingService.createBooking(bookingWrapper.getBookingDto(),tourId, userId,bookingWrapper.getTouristDtoList());
		return new ResponseEntity<BookingDTO>(bookingcreated, HttpStatus.CREATED);
	}

	@PutMapping("/updateTourSeats/tour/{tourId}/seats")
    public ResponseEntity<?> updateTourSeats(@PathVariable Long tourId, @RequestBody SeatUpdateRequest request) {
        try {
            boolean isUpdated = bookingService.updateSeats(tourId, request.getSeats());
            if (isUpdated) {
                return ResponseEntity.ok("Seats updated successfully.");
            } else {
                return ResponseEntity.status(404).body("Tour not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }

	@PutMapping("/updatePaymentStatus/{bookingId}")
	public ResponseEntity<ApiResponse> updatePaymentStatus(
			@PathVariable Long bookingId, 
			@RequestBody PaymentStatus paymentStatus) {
		try {
			boolean isUpdated = bookingService.updatePaymentStatus(bookingId, paymentStatus);
			if (isUpdated) {
				return ResponseEntity.ok(new ApiResponse("Payment status updated successfully.", false));
			} else {
				return ResponseEntity.status(404).body(new ApiResponse("Booking not found.", true));
			}
		} catch (Exception e) {
			return ResponseEntity.status(500).body(new ApiResponse("An error occurred: " + e.getMessage(), true));
		}
	}

	@DeleteMapping("/delete/{bookingId}")
	public ResponseEntity<ApiResponse> deleteBooking(@PathVariable Long bookingId) {
		this.bookingService.DeleteBookingById(bookingId);
		return new ResponseEntity<ApiResponse>(new ApiResponse("Booking is deleted sucessfully", false), HttpStatus.OK);
	}
	@GetMapping("/getAllbyuserId/{userId}")
	public ResponseEntity<List<BookingDTO>>getBookingByUserId(@PathVariable Long userId) {
		List<BookingDTO> bookingDto =this.bookingService.getBookingsByUserId(userId);
		return new ResponseEntity<List<BookingDTO>>(bookingDto,HttpStatus.OK);
	}
	@GetMapping("/get/{bookingId}")
	public ResponseEntity<BookingDTO> getBooking(@PathVariable Long bookingId) {
		BookingDTO getBooking = this.bookingService.getBookingById(bookingId);
		return new ResponseEntity<BookingDTO>(getBooking, HttpStatus.OK);
	}

	// for checking purpose only
	@GetMapping("/getallbookings")
	public ResponseEntity<List<BookingDTO>> getAllBookings() {
		List<BookingDTO> bookingDto = this.bookingService.getAllBooking();
		return new ResponseEntity<List<BookingDTO>>(bookingDto, HttpStatus.OK);
	}
	@GetMapping("/getAllByTourId/{tourId}")
	public ResponseEntity<List<BookingDTO>> getBookingsByTourID(@PathVariable Long tourId ){
		List<BookingDTO> bookingDto =this.bookingService.getBooksByTourID(tourId);
		return new ResponseEntity<List<BookingDTO>>(bookingDto,HttpStatus.OK);
		
	}
	
	@GetMapping("/getbyDate/{startdate}/{lastdate}")
	public ResponseEntity<List<BookingDTO>> getBookingsByDuration(LocalDate startdate, LocalDate lastdate){
		List<BookingDTO> bookingdto = this.bookingService.getBookingByDuration( startdate,  lastdate);
		return new ResponseEntity<List<BookingDTO>>(bookingdto, HttpStatus.OK);
	}
}