const STRAPI_GRAPHQL_ENDPOINT = process.env.STRAPI_GRAPHQL_ENDPOINT!;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN!;

export async function queryStrapi<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(STRAPI_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // ISR with 60s TTL
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error(`GraphQL Error: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
}