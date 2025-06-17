import express from 'express';

const app = express();
app.set('trust proxy', true);

const GEOIP_SERVER_HOST = process.env.GEOIP_SERVER_HOST || "http://localhost:3005"

app.get('/', (req, res) => {
    fetch(GEOIP_SERVER_HOST)
    .then(data => data.json())
    .then(data => {
        const now = new Date();
        res.json({
            ...data,
            timeInfo: {
                isoDate: now.toISOString(),
                localDate: now.toString(),
                timestamp: now.getTime(),
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                utcOffset: now.getTimezoneOffset()
            }
        })
    })
    
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});