import { GraphQLClient } from 'graphql-request';

type FetchOptions = {
  revalidate?: number;
  tags?: string[];
};

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export function createContentfulClient(options?: FetchOptions) {
  const spaceId = getEnv('CONTENTFUL_SPACE_ID');
  const accessToken = getEnv('CONTENTFUL_ACCESS_TOKEN');
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${spaceId}`;

  return new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    fetch: (input, init) => {
      return fetch(input, {
        ...init,
        next: {
          revalidate: options?.revalidate,
          tags: options?.tags
        }
      });
    }
  });
}

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: FetchOptions
): Promise<T> {
  const client = createContentfulClient(options);
  return client.request<T>(query, variables);
}
