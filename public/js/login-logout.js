const loginForm= document.getElementsByClassName('login-form')

console.log('hello login')

const loginFormFunction = async (event) => {
    event.preventDefault();
  
    const userName = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
  
    if (userName && password) {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        body: JSON.stringify({ userName, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        alert('Logged in!')
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    }
  };

  const logout = async () => {
    const response = await fetch('/api/auth/signout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
    });
    if(response.ok){
      document.location.replace('/');
    } else {
      alert('Failed to sign out!')
    }
  };

  addEventListener('submit', loginFormFunction)