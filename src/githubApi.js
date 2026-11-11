const GITHUB_API = "https://api.github.com";

export async function getGithubRepos() {
  const response = await fetch(
    `${GITHUB_API}/users/ozele57/repos?sort=updated&per_page=100`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub repositories");
  }

  return response.json();
}