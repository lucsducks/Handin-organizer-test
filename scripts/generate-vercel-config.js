// scripts/generate-vercel-config.js
import { readFileSync, writeFileSync } from 'fs';

// Leer template
const template = readFileSync('vercel.template.json', 'utf8');

// Usar variable de entorno o fallback para desarrollo
const apiUrl = process.env.API_URL || 'https://api.handin.pro/api';

// Reemplazar con variable de entorno
const config = template.replace('{{API_URL}}', apiUrl);

// Escribir vercel.json
writeFileSync('vercel.json', config);

console.log('✅ vercel.json generado con API_URL:', apiUrl);