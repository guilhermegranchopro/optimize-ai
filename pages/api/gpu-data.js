// pages/api/gpu-data.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'gpu-data.json');

  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error reading GPU data:', error);
    res.status(500).json({ error: 'Failed to load GPU data' });
  }
}
