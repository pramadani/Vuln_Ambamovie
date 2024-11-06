import axios from 'axios';

async function registerUser() {
    try {
        const response = await axios.post('http://localhost:3000/users/register', {
            email: 'test3@example.com',
            name: 'Test User',
            password: 'Test1234!'
        });
        console.log('Register response:', response.data);
    } catch (error) {
        console.error('Register Error:', error.response?.data || error.message);
    }
}

async function loginUser() {
    try {
        const response = await axios.post('http://localhost:3000/users/login', {
            email: 'test3@example.com',
            password: 'Test1234!'
        });
        
        const token = response.data.token;
        console.log('Login Token:', token);
        
        await getMovies(token);
        
    } catch (error) {
        console.error('Login Error:', error.response?.data || error.message);
    }
}

async function getMovies(token) {
    try {
        const response = await axios.get('http://localhost:3000/movies', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Movies response:', response.data);
    } catch (error) {
        console.error('Movies Error:', error.response?.data || error.message);
    }
}

(async () => {
    await registerUser();
    await loginUser();
})();
