const loadUsers = () => {
window.fetch('https://acme-users-api-rev.herokuapp.com/api/users')
.then(res => res.json())
.then(res => createUser(res))
.then(()=> {
    return window.fetch('https://acme-users-api-rev.herokuapp.com/api/users/1')
})
.then(res => res.json())
.then(res => createUser(res))
.then(()=> window.fetch('https://acme-users-api-rev.herokuapp.com/api/users/2'))
.then(res => res.json())
.then(res => createUser(res))
.catch(e => console.log('Fetch Error', e))
}
const app = document.getElementById('app')
const createHeader = () => {
    const headerContainer = document.createElement('div')
    const headerText = document.createElement('h1')
    headerText.innerHTML = 'ACME User Search'
    headerContainer.classList.add('headerContainer')
    headerContainer.append(headerText)
    app.append(headerContainer)
}
const createSearchBar = () => {
    const searchContainer = document.createElement('div')
    const searchBar = document.createElement('input')
    searchBar.setAttribute('type', 'search')
    searchBar.placeholder = 'Input Search Term'
    searchContainer.classList.add('searchBar')
    searchBar.addEventListener('keyup', e => {
        e.stopPropagation()
        let value = e.target.value.toLowerCase()
        userContainer.childNodes.forEach(elem => {
            if (value !== '' && elem.innerHTML.toLowerCase().includes(value)) {
                elem.classList = 'userSelected'
            }
            else elem.classList = 'user'
        })
    })
    searchContainer.append(searchBar)
    app.append(searchContainer)
}

const createClearButton = () => {
    const clearContainer = document.createElement('div')
    const clearButton = document.createElement('button')
    clearContainer.classList.add('clearButton')
    clearButton.innerHTML = 'Clear'
    clearButton.addEventListener('click', ev => {
        ev.stopPropagation()
        reset();
        render()
    })
    clearContainer.append(clearButton)
    app.append(clearContainer)
}
const createUser = (users) => {
    for (let user in users){
        let totalUsers = users[user]
    for (let each in totalUsers){
        let eachUser = totalUsers[each]
        const user = document.createElement('div')
        user.innerHTML =  
        `<div class = 'user'>
        <h2> Name:${eachUser.fullName}</h2>
        <p> Email:${eachUser.email}</p>
        <p> Title:${eachUser.title}</p>
        <img src=${eachUser.avatar} class=image>
        </div>`
        userContainer.append(user)
    }
    }
}
const userContainer = document.createElement('div')
userContainer.classList.add('userContainer')
const reset = () => {
    userContainer.childNodes.forEach(elem => {
       elem.classList = 'user'
    })

}
const render = () => {
    app.innerHTML = ''
    createHeader()
    createSearchBar()
    createClearButton()
    loadUsers()
    app.append(userContainer)
}
render()
