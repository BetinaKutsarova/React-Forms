async function registerUser(userData) {
    try {
        const response = await fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Network response error');
        }

        return await response.json();
    } catch (error) {
        console.error('Error saving user:', error);
        throw error;
    }
}

export default registerUser;