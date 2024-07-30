import { Api } from '..'
import { GetOrAddAddressesRoute } from './Routes'
import { Address } from './types'

export const GetAddresses = () : Promise<Address[] | any> => {
    return Api.get({
        url: GetOrAddAddressesRoute
    })
}
export const CallAddAddress = (address : Address) : Promise<Address[] | any> => {
    return Api.post({
        url: GetOrAddAddressesRoute,
        data: address
    })
}
