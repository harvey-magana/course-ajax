(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText = 'hippos';
    const responseContainer = document.querySelector('#response-container');

    fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
    	headers: {
    		Authorization: 'Client-ID 09e1b1366b815d72147f8c49359b63acd03a53e7013bef8f9515a255629d9010'
    	}
    }).then(response => response.json())
    .then(addImage);

    function addImage(data) {
    	let htmlContent = '';
    	const firstImage = data.results[0];

    	if (firstImage) {
    		htmlContent = `<figure>
    			<img src="${firstImage.urls.small}" alt="${searchedForText}">
    			<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
    		</figure>`;
    	} else {
    		htmlContent = 'Unfortunately, no image was returned for your search.'
    	}
    	
        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    });
})();
