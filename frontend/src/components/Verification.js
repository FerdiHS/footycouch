export function isValidUsername(username) {
    const regex = /^\s*([0-9a-zA-Z]+)\s*$/;
    return regex.test(username);
}

export function isValidPassword(password) {
    return password.length >= 8;
}

