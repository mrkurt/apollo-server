import { Request, Response } from 'apollo-server-env';

declare global {
  interface fly {
    http: {
      respondWith: (req: Request) => Promise<Response> | Response;
    };
  }
}
