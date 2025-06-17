import express from 'express';
import geoip from 'geoip-lite';

const app = express();
app.set('trust proxy', true);

app.get('/', (req, res) => {
	const clientIp = req.ip;
	const geo = geoip.lookup(clientIp || '');
	
	
	res.json({
		ipInfo: {
			ip: clientIp,
			...(geo ? {
				country: geo.country,
				city: geo.city,
				timezone: geo.timezone,
				coordinates: geo.ll
			} : { error: "GeoIP data not available" })
		}
	});
});

const PORT = 3005;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});