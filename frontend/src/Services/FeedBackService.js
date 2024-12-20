import axios from 'axios';
const TOUR_API = "http://localhost:9090/feedback";

class FeedBackService {
    createFeedback(feedback, userId) {
        return axios.post(TOUR_API + '/create/' + userId, feedback);
    }

    getAllFeedBacks() {
        return axios.get(TOUR_API + '/getall');
    }

    deleteFeedBack(feedbackId) {
        return axios.delete(TOUR_API + '/delete/' + feedbackId); 
    }
}

export default new FeedBackService();