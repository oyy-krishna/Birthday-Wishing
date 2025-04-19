const https = require('https');
const fs = require('fs');
const path = require('path');

const sounds = {
    click: 'https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3',
    surprise: 'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3',
    celebration: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'
};

const audioDir = path.join(__dirname, '../public/audio');

if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
}

Object.entries(sounds).forEach(([name, url]) => {
    const filePath = path.join(audioDir, `${name}.mp3`);
    
    // Remove existing file if it exists
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
    
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
        if (response.statusCode !== 200) {
            console.error(`Failed to download ${name}.mp3: Status code ${response.statusCode}`);
            return;
        }
        
        response.pipe(file);
        
        file.on('finish', () => {
            file.close();
            console.log(`Successfully downloaded ${name}.mp3`);
        });
    }).on('error', (err) => {
        fs.unlink(filePath);
        console.error(`Error downloading ${name}.mp3:`, err.message);
    });
}); 