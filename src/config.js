let API_BASE = ''

const ENVIROMENT = process.env.NODE_ENV || 'development';

API_BASE = ENVIROMENT === 'production' ? window.location.origin : 'https://koc.orkestra.mx'

export default {
	ENVIROMENT,
	API_BASE
}