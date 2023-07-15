import { Amplify, Auth } from 'aws-amplify'
import awsmobile from '../aws-exports'

Amplify.configure(awsmobile)
console.log(awsmobile)

export const container = {
  auth: Auth,
}
