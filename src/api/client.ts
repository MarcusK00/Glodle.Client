const API_URL = "http://192.168.32.4:3000/graphql";

export async function gqlFetch<T>(query: string, variables?: object): Promise<T> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const { data, errors } = await res.json();
  if (errors) throw new Error(errors[0].message);
  return data;
}

