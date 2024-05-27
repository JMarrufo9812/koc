import ServerDirections from '@/config/server-directions'
import { RequestService } from '@/services/request.service'

const requestService = new RequestService()

export class GeneralRequests {
    pilotCheckIn (params) {
      const route = ServerDirections.PILOT_CHECK_IN
      const method = 'post'

      function map (res) {
        return res
      }

      return requestService.makePromise(route, method, { params }, map)
    }
}