function fetchVideoInfo() {
    const videoUrl = document.getElementById('video-url').value;

    if (videoUrl) {
        fetch(`/video-info?url=${videoUrl}`)
            .then(response => response.json())
            .then(data => {
                const videoPreview = document.getElementById('video-preview');
                const downloadOptions = document.getElementById('download-options');

                videoPreview.innerHTML = `
                    <h2>Video Preview</h2>
                    <p>Title: ${data.title}</p>
                    <img src="${data.thumbnail}" alt="Video Thumbnail">
                `;

                downloadOptions.innerHTML = `
                    <h3>Download Options</h3>
                    ${data.formats.map(format => `<a href="${format.url}" download>${format.quality}</a>`).join('')}
                `;
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter a valid YouTube video URL.');
    }
}
