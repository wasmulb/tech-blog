const newPost = async (event) => {
    event.preventDefault();

    console.log('test')
    const title = document.getElementById('new-title').value.trim();
    const content = document.getElementById('new-content').value.trim();
    const user_id = 2

    const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ title, content, user_id}),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if(response.ok){
        alert('New blog post made!!')
        document.location.replace('/')
    } else {
        alert('Failed to make new blog post!')
    }
}

addEventListener('submit', newPost)