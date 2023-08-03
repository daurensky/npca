const getEnv = (key: string) => {
  if (!process.env[key]) {
    throw new Error(`${key} is not set`)
  }
  return process.env[key] || ''
}

export const SERVER_URL = getEnv('SERVER_URL')
export const SERVER_TOKEN = getEnv('SERVER_TOKEN')

export const ASSETS_URL = getEnv('ASSETS_URL')

export const SESSION_SECRET = getEnv('SESSION_SECRET')
