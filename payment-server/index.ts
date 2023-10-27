import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());

app.post('/charge', (_req: Request, res: Response) => {
	console.log('💸 Payment processed…');
	res.sendStatus(204);
});

app.listen(port, () => {
	console.log(`Payment Processing Server running at http://localhost:${port}`);
});
