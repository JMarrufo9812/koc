import config from '@/config'

const BASE_URL = `${config.API_BASE}/api/v1`

export default {
  PILOT_CHECK_IN: `${BASE_URL}/check-in`,
  PILOTS: `${BASE_URL}/pilots`,
  PILOTS_STORAGE_IMAGES: `${BASE_URL}/pilots-storage-images`
}