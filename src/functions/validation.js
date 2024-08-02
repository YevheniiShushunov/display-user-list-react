export function isEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

export function checkEmptyFields (user) {
    for (let key in user) {
        return !(user[key] === null || user[key] === undefined || user[key] === "");
    }
}