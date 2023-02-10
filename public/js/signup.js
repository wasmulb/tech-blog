
const signUp = async (event) => {
    event.preventDefault();

    const email = document.getElementById('new-email').value.trim();
    const username = document.getElementById('new-username').value.trim();
    const password = document.getElementById('new-password').value.trim();

    const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ username, email, password}),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if(response.ok){
        alert('New account created!')
        document.location.replace('/')
    } else {
        alert('Failed to create account')
    }
}

addEventListener('submit', signUp)