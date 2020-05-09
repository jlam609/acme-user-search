const tbody = document.querySelector('tbody')
const body = document.querySelector('.bodyContainer')
const loadUser = () => {
window.fetch(`https://acme-users-api-rev.herokuapp.com/api/users`)
.then(res => res.json())
.then(data => {
    const htmlString = data.users.map(elem => {
        return `<tr class = 'user'>
        <td>${elem.firstName}</td>
        <td>${elem.lastName}</td>
        <td>${elem.email}</td>
        <td>${elem.title}</td>
        <td><img src=${elem.avatar} class ='image'></td>
        </tr>`
    })
    .join('')
    tbody.innerHTML = htmlString
})
.catch(e => console.log('error', e))
}

const createHeader = () => {
    const headerContainer = document.createElement('div')
    const headerText = document.createElement('h1')
    headerText.innerHTML = 'ACME User Search'
    headerContainer.classList.add('headerContainer')
    headerContainer.append(headerText)
    body.append(headerContainer)
}
const createSearchBar = () => {
    const searchContainer = document.createElement('div')
    const searchBar = document.createElement('input')
    searchBar.setAttribute('type', 'search')
    searchBar.placeholder = 'Input Search Term'
    searchContainer.classList.add('searchBar')
    searchBar.addEventListener('keyup', e => {
        e.stopPropagation()
        let value = e.target.value
        window.location.hash = value
        if (value !== ''){
            window.fetch(`https://acme-users-api-rev.herokuapp.com/api/users/search/${value}`)
            .then(res => res.json())
            .then(data => {
                const htmlString = data.users.map(elem => {
                    return `<tr class = 'user'>
                    <td>${elem.firstName}</td>
                    <td>${elem.lastName}</td>
                    <td>${elem.email}</td>
                    <td>${elem.title}</td>
                    <td><img src=${elem.avatar} class ='image'></td>
                    </tr>`
                })
                .join('')
                tbody.innerHTML = htmlString
            })
            .catch(e => console.log('error', e))
        }
    })
    searchContainer.append(searchBar)
    body.append(searchContainer)
}
const createClearButton = () => {
    const clearContainer = document.createElement('div')
    const clearButton = document.createElement('button')
    clearContainer.classList.add('clearButton')
    clearButton.innerHTML = 'Clear'
    clearButton.addEventListener('click', ev => {
        ev.stopPropagation()
        reset()
        render()
    })
    clearContainer.append(clearButton)
    body.append(clearContainer)
}
const reset = () => body.innerHTML = ''
const render = () => {
createHeader()
createSearchBar()
createClearButton()
loadUser()
}
render()