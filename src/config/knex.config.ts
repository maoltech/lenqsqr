import { registerAs } from '@nestjs/config';
import knexfile from '../../knexfile';

const environment = process.env.NODE_ENV || 'development';
const config = knexfile[environment];

export default registerAs('knex', () => config);