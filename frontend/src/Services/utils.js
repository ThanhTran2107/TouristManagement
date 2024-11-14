export const registerUser  = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const newUser  = { email, password };
    storedUsers.push(newUser );
    localStorage.setItem('users', JSON.stringify(storedUsers));

    // Lưu email vào sessionStorage
    const storedEmails = JSON.parse(localStorage.getItem('email')) || [];
    if (!storedEmails.includes(email)) {
        storedEmails.push(email);
        localStorage.setItem('email', JSON.stringify(storedEmails));
    }
};