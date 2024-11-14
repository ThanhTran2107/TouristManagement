export const registerUser  = (email, password, additionalInfo) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    const newUser  = { email, password, ...additionalInfo }; 
    const emailExists = storedUsers.some(user => user.email === email);
    if (!emailExists) {
        storedUsers.push(newUser );
        localStorage.setItem('users', JSON.stringify(storedUsers));
    }

    const storedEmails = JSON.parse(localStorage.getItem('email')) || [];
    if (!storedEmails.includes(email)) {
        storedEmails.push(email);
        localStorage.setItem('email', JSON.stringify(storedEmails));
    }
};