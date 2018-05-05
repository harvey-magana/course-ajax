(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText = 'hippos';
    const unsplashRequest = new XMLHttpRequest();
    const responseContainer = document.querySelector('#response-container');
    unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    unsplashRequest.onload = addImage;
    unsplashRequest.setRequestHeader('Authorization', 'Client-ID 09e1b1366b815d72147f8c49359b63acd03a53e7013bef8f9515a255629d9010');
    unsplashRequest.send();

    function addImage() {
    	let htmlContent = '';
    	const data = JSON.parse(this.responseText);
    	if(data && data.results && data.results[0]) {
    		const firstImage = data.results[0];
	     	htmlContent = `<figure>
	    		<img src="${firstImage.urls.regular}" alt="${searchedForText}">
	    		<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
	    	</figure>`;
    	} else {
    		htmlContent = '<div class="error-no-image">No images available</div>';
    	}


    	responseContainer.insertAdjacentHTML('afterbegin', htmlContent);

    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    });
})();
