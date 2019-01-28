import { graphqlFly } from './flyApollo';

import { ApolloServerBase } from 'apollo-server-core';
export { GraphQLOptions, GraphQLExtension } from 'apollo-server-core';
import { GraphQLOptions } from 'apollo-server-core';
import { Request } from 'apollo-server-env';

declare var fly: any;
export class ApolloServer extends ApolloServerBase {
  // This translates the arguments from the middleware into graphQL options It
  // provides typings for the integration specific behavior, ideally this would
  // be propagated with a generic to the super class
  async createGraphQLServerOptions(request: Request): Promise<GraphQLOptions> {
    return super.graphQLServerOptions({ request });
  }

  public async listen() {
    await this.willStart();
    fly.http.respondWith((req: Request) => {
      return graphqlFly(() => {
        return this.createGraphQLServerOptions(req);
      })(req);
    });
    return await { url: '', port: null };
  }

  // This integration supports file uploads.
  protected supportsUploads(): boolean {
    return false;
  }

  // This integration supports subscriptions.
  protected supportsSubscriptions(): boolean {
    return false;
  }
}
