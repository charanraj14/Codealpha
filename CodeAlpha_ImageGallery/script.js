document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    document.body.appendChild(lightbox);
    let currentIndex = 0;

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentIndex = index;
            showImage();
        });
    });

    lightbox.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });
    
    function showImage() {
        const imgSrc = galleryItems[currentIndex].querySelector('img').getAttribute('src');
        lightbox.innerHTML = `<img src="${imgSrc}" alt="Enlarged Image">`;
        lightbox.style.display = 'flex';
    }

    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                showImage();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % galleryItems.length;
                showImage();
            }
            else if (e.key === 'Escape') {
                lightbox.style.display = 'none';
            }
            
        }
    });
});
