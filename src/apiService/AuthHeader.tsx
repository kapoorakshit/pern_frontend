export default function authHeader() {
    const token = localStorage.getItem("token"); // Make sure you're storing the token under "token"
    if (token) {
        return { Authorization: `Bearer ${token}` }; // Properly format the token as Bearer
    } else {
        return {};
    }
}
