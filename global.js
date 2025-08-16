document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://YOUR_API_URL_HERE/album/';
    const albumId = 'YOUR_ALBUM_ID_HERE';
    const gallery = document.getElementById('photo-gallery');
    
    // Define image sets based on page
    const imagesets = {
        main: [
            'images/main/image1.jpg',
            'images/main/image2.png',
            'images/main/image3.png',
            'images/main/image4.png',
            'images/main/image5.png',
            'images/main/image6.png',
            'images/main/image7.png',
            'images/main/image8.png',
            'images/main/image9.png'
        ],
        portraits: [
            'images/portraits/EJB_1691-Enhanced-SR.jpg',
            'images/portraits/EJB_1696-Enhanced-SR.jpg',
            'images/portraits/EJB_1739-Enhanced-SR.jpg',
            'images/portraits/EJB_1783-Enhanced-SR.jpg',
            'images/portraits/EJB_1790-Enhanced-SR.jpg',
            'images/portraits/EJB_1791-Enhanced-SR.jpg'
        ]
    };

    // Determine which image set to use based on current page
    const currentPage = window.location.pathname.includes('portraits') ? 'portraits' : 'main';
    const fallbackImages = imagesets[currentPage];

    if (gallery) {
        fetch(`${apiUrl}${albumId}`)
            .then(response => response.json())
            .then(imageUrls => {
                imageUrls.forEach(url => {
                    const img = document.createElement('img');
                    img.src = `${url}=w800`;
                    img.alt = 'Photo from album';
                    gallery.appendChild(img);
                });
            })
            .catch(error => {
                console.error('Error loading photos from Google Photos:', error);
                fallbackImages.forEach(path => {
                    const img = document.createElement('img');
                    img.src = path;
                    img.alt = 'Fallback local photo';
                    gallery.appendChild(img);
                });
            });
    }

    // Handle mobile menu
    document.addEventListener('click', (e) => {
        const navMenu = document.querySelector('.nav-menu');
        if (e.target.matches('.hamburger')) {
            navMenu.classList.toggle('active');
        } else if (!e.target.closest('.nav-menu')) {
            navMenu.classList.remove('active');
        }
    });
});