var contentSection = document.getElementById('content-section');
var dashboardSection = document.getElementById('dashboard-section');

function viewAllPosts(){
    fetch('/api/post')
    .then(function(response) {
      return response.json()
    })
    .then(function (data) {
        console.log(data)

        for(var i= 0; i<data.length; i++){
            var blogPost = document.createElement('section')
            blogPost.classList.add("blog-post")

            var blogTitle = document.createElement('h2')
            blogTitle.innerText = data[i].title

            var blogUser = document.createElement('h6')
            blogUser.innerText = data[i].user['username']

            var blogContent = document.createElement('p')
            blogContent.innerText = data[i].content

            blogPost.appendChild(blogTitle)
            blogPost.appendChild(blogUser)
            blogPost.appendChild(blogContent)

            contentSection.appendChild(blogPost)
        };
})}

viewAllPosts()

let userID=1

function viewDashboardPosts(){
    fetch(`/api/post/${userID}`)
    .then(function(response) {
      return response.json()
    })
    .then(function (data) {
        console.log(data)

        for(var i= 0; i<data.length; i++){
            var blogPost = document.createElement('section')
            blogPost.classList.add("blog-post")

            var blogTitle = document.createElement('h2')
            blogTitle.innerText = data[i].title

            var blogUser = document.createElement('h6')
            blogUser.innerText = data[i].user['username']

            var blogContent = document.createElement('p')
            blogContent.innerText = data[i].content

            blogPost.appendChild(blogTitle)
            blogPost.appendChild(blogUser)
            blogPost.appendChild(blogContent)

            dashboardSection.appendChild(blogPost)
        };
})
}

function newPost(){

    fetch()
}