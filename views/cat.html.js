module.exports = (cat) => `
    <li>
        <img src="${cat.imageUrl}" alt="${cat.name}">
        <h3>${cat.name}</h3>
        <p><span>Breed: </span>${cat.breed}</p>
        <p><span>Description: </span>${cat.description}</p>
        <ul class="buttons">
            <li class="btn edit"><a href="/cats/edit-cat">Change Info</a></li>
            <li class="btn delete"><a href="/cats/cat-shelter">New Home</a></li>
        </ul>
     </li>
`