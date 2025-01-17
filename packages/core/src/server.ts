import { type IncomingMessage, createServer } from 'node:http'
import { exit } from 'node:process'
import type { InertiaAppResponse, Page } from './types'

export type AppCallback = (page: Page) => InertiaAppResponse
export type RouteHandler = (request: IncomingMessage) => Promise<unknown>

const readableToString: (readable: IncomingMessage) => Promise<string> = (
  readable
) =>
  new Promise((resolve, reject) => {
    let data = ''
    readable.on('data', (chunk) => (data += chunk))
    readable.on('end', () => resolve(data))
    readable.on('error', (err) => reject(err))
  })

export default (render: AppCallback, port?: number): void => {
  const _port = port || 13714

  const routes: Record<string, RouteHandler> = {
    '/health': async () => ({ status: 'OK', timestamp: Date.now() }),
    '/shutdown': () => exit(),
    '/render': async (request) =>
      render(JSON.parse(await readableToString(request))),
    '/404': async () => ({ status: 'NOT_FOUND', timestamp: Date.now() }),
  }

  createServer(async (request, response) => {
    const dispatchRoute = routes[<string>request.url] || routes['/404']

    try {
      response.writeHead(200, {
        'Content-Type': 'application/json',
        Server: 'Inertia.js SSR',
      })
      if (dispatchRoute) {
        response.write(JSON.stringify(await dispatchRoute(request)))
      }
    } catch (e) {
      console.error(e)
    }

    response.end()
  }).listen(_port, () => console.log('Inertia SSR server started.'))

  console.log(`Starting SSR server on port ${_port}...`)
}
