document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://YOUR_API_URL_HERE/album/';  // Placeholder: Replace with your hosted API endpoint (e.g., https://my-glitch-app.glitch.me/album/)
    const albumId = 'YOUR_ALBUM_ID_HERE';  // Placeholder: Get from Google Photos share link (e.g., 'QCXy6XaKX5x1AynH8' from https://photos.app.goo.gl/QCXy6XaKX5x1AynH8)
    const gallery = document.getElementById('photo-gallery');

    // Define fallback local images (update with your actual file names/paths)
    const fallbackImages = [
        'images/main/image1.jpg',
        'images/main/image2.png',
        'images/main/image3.png',
        'images/main/image4.png',
        'images/main/image5.png',
        'images/main/image6.png',
        'images/main/image7.png',
        'images/main/image8.png',
        'images/main/image9.png',
        // Add more as needed
    ];

    if (gallery) {
        fetch(`${apiUrl}${albumId}`)
            .then(response => response.json())
            .then(imageUrls => {
                imageUrls.forEach(url => {
                    const img = document.createElement('img');
                    img.src = `${url}=w800`;  // Append size param for display (adjust '800' as needed)
                    img.alt = 'Photo from album';
                    gallery.appendChild(img);
                });
            })
            .catch(error => {
                console.error('Error loading photos from Google Photos:', error);
                // Fallback to local images
                fallbackImages.forEach(path => {
                    const img = document.createElement('img');
                    img.src = path;
                    img.alt = 'Fallback local photo';
                    gallery.appendChild(img);
                });
            });
    }
});