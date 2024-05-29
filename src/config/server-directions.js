import config from '@/config'

const BASE_URL = `${config.API_BASE}/api/v1`

export default {
  PILOT_CHECK_IN: `${BASE_URL}/check-in`,
  PILOTS_CHECK_IN_EXPORT: `${BASE_URL}/check-in-export/{DATE_INI}/{DATE_END}`,
  PILOTS: `${BASE_URL}/pilots`,
  PILOTS_STORAGE_IMAGES: `${BASE_URL}/pilots-storage-images`,
  PILOTS_TEMPLATE: `${BASE_URL}/pilots-template`
}