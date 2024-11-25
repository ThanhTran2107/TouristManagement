import axios from "axios";

const tour_URL = "http://localhost:9090/tourdetails";

class TourService {
  getAllTours() {
    return axios.get(tour_URL + "/getall");
  }

  saveTourDetails(tour) {
    return axios.post(tour_URL + "/create", tour);
  }

  getTourById(tourId) {
    return axios.get(`${tour_URL}/get/${tourId}`);
  }

  updateTour = (tour, tourId) => {
    const tok = sessionStorage.getItem("token");
    console.log(tok);
    axios.defaults.headers.common = { Authorization: `Bearer ${tok}` };
    console.log(tour_URL + tourId);
    return axios.put(tour_URL + "/update/" + tourId, tour);
  };

  removeTour(tourId) {
    return axios.delete(`${tour_URL}/delete/${tourId}`);
  }

  getBookings(tourId) {
    return axios.get(`${tour_URL}/${tourId}/booking`);
  }

  getByDestination(destination) {
    return axios.get(`${tour_URL}/getbydestination/${destination}`);
  }

  getByBudget() {
    return axios.get(`${tour_URL}/getbybudget`);
  }
}

export default new TourService();
