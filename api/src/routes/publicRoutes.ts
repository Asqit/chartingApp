import { Router } from 'express';
import path from 'path';

const router = Router();

router.get('/cookies', (req, res) => {
	const file = path.join(__dirname, '../', 'public/Cookies.txt');
	res.download(file);
});

export default router;
