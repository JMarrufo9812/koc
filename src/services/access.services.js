import ServerDirections from '@/config/server-directions'
import { RequestService } from '@/services/request.service'

const requestService = new RequestService()

export class AccessRequests {
  accessCheckIn (params) {
    const route = ServerDirections.ACCESS_CHECK_IN
    const method = 'post'

    function map (res) {
      return res
    }

    return requestService.makePromise(route, method, { params }, map)
  }
  visitsValidate (params) {
    const route = ServerDirections.ACCESS_VISIT_VALIDATE
    const method = 'post'

    function map (res) {
      return res
    }

    return requestService.makePromise(route, method, { params }, map)
  }
  visitAccessCheckin (params) {
    const route = ServerDirections.ACCESS_VISIT_CHECK_IN
    const method = 'post'

    function map (res) {
      return res
    }

    return requestService.makePromise(route, method, { params }, map)
  }
}