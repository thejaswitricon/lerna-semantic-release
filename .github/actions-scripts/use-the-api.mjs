import { Octokit } from '@octokit/core';

async function addCollaborators(owner, repo, teamSlugs) {
  const octokit = new Octokit({
    auth: process.env.TOKEN // GitHub Actions automatically provides a token
  });

  for (const teamSlug of teamSlugs) {
    try {
      await octokit.request('PUT /repos/{owner}/{repo}/teams/{team_slug}/repos/{owner}/{repo}', {
        owner: owner,
        repo: repo,
        team_slug: teamSlug,
        permission: 'triage',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
      console.log(`Team ${teamSlug} added as a collaborator to ${owner}/${repo}`);
    } catch (error) {
      console.error(`Failed to add team ${teamSlug} as a collaborator to ${owner}/${repo}: ${error.message}`);
    }
  }
}

// Usage example
const owner = 'tandfgroup'; // Replace 'OWNER' with the repository owner's username or organization name
const repo = 'codespaces-demo'; // Replace 'REPO' with the name of the repository
const teamSlugs = ['@tandfgroup/platform-engineering', 'quality-engineering', 'thejaswitricon']; // Array of team slugs

addCollaborators(owner, repo, teamSlugs);
