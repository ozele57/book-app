import React, { useEffect, useState } from "react";
import { getGithubRepos } from "../githubApi";

export default function GithubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getGithubRepos()
      .then(setRepos)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading projects...</p>;

  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2>My GitHub Projects</h2>

      <div className="github-repos">
        {repos.map((repo) => (
          <article key={repo.id}>
            <h3>{repo.name}</h3>

            <p>
              {repo.description || "No description available"}
            </p>

            <span>{repo.language || "Other"}</span>

            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
            >
              View Project
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}