import { toast } from 'react-toastify';
import { useState } from 'react';
import FeedBackService from "../Services/FeedBackService";

export const Feedback = () => {
    const [firstName, setFirstName] = useState(sessionStorage.getItem("firstName") || '');
    const [lastName, setLastName] = useState(sessionStorage.getItem("lastName") || '');
    const fullName = firstName + " " + lastName;
    const [email, setEmail] = useState(sessionStorage.getItem("email") || ''); 
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [isHovered, setIsHovered] = useState(false); 

    const send = () => {
        if (firstName.length === 0) {
            toast.error('Please Enter Your Full Name');
        } else if (email.length === 0) {
            toast.error('Please Enter Your Email');
        } else if (rating.length === 0) {
            toast.error('Please Give Us Your Rating');
        } else if (comment.length === 0) {
            toast.error('Please Enter Your Comments');
        } else {
            const feedback = { firstName, email, rating, comment };
            let userId = sessionStorage.getItem("userId");
            FeedBackService.createFeedback(feedback, userId)
                .then(response => {
                    console.log("Feedback added successfully", response.data);
                    toast.success("Feedback added successfully!");
                    setRating('');
                    setComment('');
                })
                .catch(error => {
                    toast.error("Something went wrong!!!!");
                    console.log('Something went wrong', error);
                });
        }
    };

    return (
        <div style={{ background: `linear-gradient(to right, #D7FFFD ,#EFEFEF, #EFA8E4)`, height: "100vh" }}>
            <br /><br />
            <div style={Styles.divStyle}>
                <h2 style={Styles.feedbackText}><b>Feedback</b></h2>

                <div className="mb-3">
                    <label htmlFor="firstName" className=" form-label" style={{ marginTop: 10 }}>Full name</label>
                    <input type="text" className="form-control" id="firstName"
                        value={fullName}
                        readOnly
                        />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email"
                        value={email} 
                        readOnly 
                    />
                </div>

                <div className="form-floating" style={{ width: '15vw' }}>
                    <select className="form-select" id="rating" aria-label="Floating label select example" style={{ height: '9vh' }}
                        value={rating}
                        onChange={(event) => {
                            setRating(event.target.value);
                        }}>
                        <option value="" disabled>Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <label htmlFor="floatingSelect">Tell us your experience</label>
                </div>

                <div className="mb-3" style={{ paddingTop: 10 }}>
                    <label htmlFor="comment" className="form-label">Comments</label>
                    <textarea className="form-control" id="comment" rows="1"
                        value={comment}
                        onChange={(event) => {
                            setComment(event.target.value);
                        }}> </textarea>
                </div>

                <div>
                    <button 
                        onClick={send} 
                        style={{ 
                            ...Styles.buttonStyle, 
                            backgroundColor: isHovered ? '#892318' : '#e02c18' 
                        }} 
                        onMouseEnter={() => setIsHovered(true)} 
                        onMouseLeave={() => setIsHovered(false)} 
                    >
                        Send
                    </button>
                </div>

            </div>
        </div>
    );
}

const Styles = {
    divStyle: {
        borderColor: "crimson",
        borderStyle: "thin",
        width: 400,
        margin: "auto",
        marginTop: "10vh",
        borderRadius: 20,
        padding: "15px",
        boxShadow: "3px 3px 10px 2px #576F72",
        backgroundColor: "white"
    },
    feedbackText: {
        textAlign: "center",
        color: "#022831",
        fontFamily: 'Signika Negative',
        fontStyle: "sans-serif",
        marginTop: 8,
    },
    buttonStyle: {
        marginTop: 5,
        position: "relative",
        justifyContent: 'center', alignItems: 'center', height: '50vh',
        width: '70%',
        height: 40,
        color: 'white',
        borderRadius: 15,
        border: 'none',
        marginLeft: 53,
        transition: 'background-color 0.3s ease, color 0.3s ease',
    }
}