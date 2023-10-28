/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const fetchGQL = async <T>(
  query: string,
  revalidate?: number,
): Promise<T> => {
  const response = await fetch(
    'https://api-sa-east-1.hygraph.com/v2/clnzld1qa3aod01uf76f1ezq6/master',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2OTc5Mzc1NDQsImF1ZCI6WyJodHRwczovL2FwaS1zYS1lYXN0LTEuaHlncmFwaC5jb20vdjIvY2xuemxkMXFhM2FvZDAxdWY3NmYxZXpxNi9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiMzc1MzBlYzktN2M2MC00NzI0LTgxNmQtNmVkNWFmMmUxMTY2IiwianRpIjoiY2xvMHM2YWhoOG1xeDAxdWYycHl2YmI4NiJ9.ggtrKrxshcdeLuNgLGbIaZONnq-qRUJmLocAX0OCIvctYHjrAHiNpiVK0K3LF_7TvQV5cK4bJSlcH3xKAnIZFghj_w8tZW1YLvmTAIs0xRCTCO6Icv622HKOLNTQblJtRqOSyiNIJHKcPTGJS2LOYxNUM0l6ZnZSz3Y1wo0dxrgw0--dg9F1OAZVzTfhaLghzwAjIpFneEqhvC6p1I9rE0wkWqu0NJNZf8uxn0HlOWXohBQWacalE40FI_VZovgOej4ZJEP_zH_BVH0HRyIi90LBNqxlmR6yeOn29xziBd0D3WtthLrZAwPj-2b3gsmxey8fj12KETu_yh0EBGk-s_sk_ot7yf5faTXfQXSktB6g13cfaPUXW-PL_FR9aGZSJtrIlXaal_VXkrsuDvHuvrgVVI-DPfqh50nGCaH2c235kzW6I08l_8hYFHFc8UqInmhZWY3HdffJUGw9LfnseEACfaCmmHBn6BqzSNXP-0RK9WV0CkB1q1UAKPUU_iqvrgQUI9OZ_qFqjXMqPGJ2inXslWvEMwSHptG9EKie1FZm11xPGXTC5OvRi8wHWpBYRRN58rXA3KMdXBaffNkA7XC2JJ60hQrINJJYB7z2sSLLZOTjIa-zi8XggL6DIDVY56xLfam9X5Pz4h_3lBrx8u7F3sD3HXwfWMHL71cTaGQ`,
      },
      next: {
        revalidate,
      },
      body: JSON.stringify({
        query,
      }),
    },
  )

  const { data } = await response.json()

  return data
}
