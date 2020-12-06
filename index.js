import fs from 'fs';
import { statement } from './src/ch1/statement';

const invoices = fs.readFileSync('./invoices.json', 'utf-8');
const plays = fs.readFileSync('./plays.json', 'utf-8');

console.log(statement(JSON.parse(invoices)[0], JSON.parse(plays)));
