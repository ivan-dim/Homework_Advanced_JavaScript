    let imagesContainer = document.getElementById('dogImages');

    fetch('https://dog.ceo/api/breed/hound/images')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            for (let imageUrl of data.message) {
                let imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imagesContainer.appendChild(imgElement);
            }
        })
        .catch(function(error) {
            console.error(error);
        });
