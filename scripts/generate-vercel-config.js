// scripts/generate-vercel-config.js
import { readFileSync, writeFileSync } from 'fs';

// Leer template
const template = readFileSync('vercel.template.json', 'utf8');

// Reemplazar con variable de entorno
const config = template.replace('{{API_URL}}', process.env.API_URL);

// Escribir vercel.json
writeFileSync('vercel.json', config);

console.log('✅ vercel.json generado con API_URL:', process.env.API_URL);