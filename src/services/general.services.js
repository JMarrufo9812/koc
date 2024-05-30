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
    getPilots() {
      const route = ServerDirections.PILOTS
      const method = 'get'

      function map (res) {
        return res
      }

      return requestService.makePromise(route, method, {}, map)
    }
    downloadPilotsTemplate (params) {
      const route = ServerDirections.PILOTS_TEMPLATE
      const method = 'get'

      function map (res) {
        return res
      }

      return requestService.makePromise(route, method, { params }, map)
    }
    downloadChekInReport (params) {
      const route = `${ServerDirections.PILOTS_CHECK_IN_EXPORT
        .replace('{DATE_INI}', params.period.date_ini)
        .replace('{DATE_END}', params.period.date_end)
      }`
      const method = 'get'

      function map (res) {
        return res
      }

      return requestService.makePromise(route, method, { params: params.credentials }, map)
    }
    pilotsExport(params) {
      const route = ServerDirections.PILOTS_EXPORT
      const method = 'get'

      function map (res) {
        return res
      }

      return requestService.makePromise(route, method, { params }, map)
    }
    pilotsImport(params) {
      const route = ServerDirections.PILOTS_IMPORT
      const method = 'post'

      function map (res) {
        return res
      }

      return requestService.makePromise(route, method, { params }, map)
    }
}