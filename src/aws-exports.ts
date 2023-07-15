const env = process.env

const awsmobile = {
  aws_project_region: 'us-east-1',
  aws_cognito_identity_pool_id: env.COGNITO_POOL_ID,
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: env.USER_POOL_ID,
  aws_user_pools_web_client_id: env.USER_POOL_WEBCLIENT_ID,
  oauth: {},
}

export default awsmobile
