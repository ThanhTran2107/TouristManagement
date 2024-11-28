import axios from "axios";

const userURL = "http://localhost:9090";

class BookingService {
  getAllBookings = () => {
    // const tok=sessionStorage.getItem("token");
    // console.log(tok);
    // axios.defaults.headers.common={Authorization:`Bearer ${tok}`};
    return axios.get(userURL + "/booking/getallbookings");
  };

  createBooking = (tourId, userId, bookingWrapping) => {
    return axios.post(
      `${userURL}/booking/createBooking/tour/${tourId}/user/${userId}`, // Đúng URL
      bookingWrapping
    );
  };

  getAllBookingByUserId = (userId) => {
    // const tok=sessionStorage.getItem("token");
    // console.log(tok);
    // axios.defaults.headers.common={Authorization:`Bearer ${tok}`};
    return axios.get(userURL + "/booking/getAllbyuserId/" + userId);
  };

  deleteBooking = (bookingId) => {
    // const tok=sessionStorage.getItem("token");
    // console.log(tok);
    // axios.defaults.headers.common={Authorization:`Bearer ${tok}`};
    return axios.delete(userURL + "/booking/delete/" + bookingId);
  };

  getAllTouristByBookingId = (bookingId) => {
    // const tok=sessionStorage.getItem("token");
    // console.log(tok);
    // axios.defaults.headers.common={Authorization:`Bearer ${tok}`};
    return axios.get(
      userURL + "/tourist/getAllTouristByBookingId/" + bookingId
    );
  };

  updateTourSeats = (tourId, newSeatCount) => {
    return axios.put(
      `${userURL}/booking/updateTourSeats/tour/${tourId}/seats`,
      {
        seats: newSeatCount,
      }
    );
  };
  
  updatePaymentStatus = (bookingId, newStatus) => {
    return axios.put(`${userURL}/booking/updatePaymentStatus/${bookingId}`, newStatus,{
    headers: {
        'Content-Type': 'application/json'
    }});
  };
}
export default new BookingService();