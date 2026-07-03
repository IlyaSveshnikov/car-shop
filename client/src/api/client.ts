// Эндпоинт GraphQL: в проде задаётся через VITE_API_URL, локально идёт через
// Vite-прокси (см. vite.config.js) — путь /api ведёт на NestJS-сервер.
const GRAPHQL_ENDPOINT =
  (import.meta.env.VITE_API_URL as string | undefined) ?? "/api";

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

/** Выполняет GraphQL-запрос и возвращает типизированные данные либо бросает ошибку. */
export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Сервер ответил со статусом ${response.status}`);
  }

  const result = (await response.json()) as GraphQLResponse<T>;

  if (result.errors?.length) {
    throw new Error(result.errors.map((error) => error.message).join(", "));
  }

  if (!result.data) {
    throw new Error("Сервер вернул пустой ответ");
  }

  return result.data;
}
