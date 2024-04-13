import { Octokit } from '@octokit/core';

async function addCollaborators(owner, repo, teamSlugs) {
  const octokit = new Octokit({
    auth: process.env.TOKEN // GitHub Actions automatically provides a token
  });

  for (const teamSlug of teamSlugs) {
    try {
      await octokit.request('PUT /repos/{owner}/{repo}/collaborators/{team_slug}', {
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

async function setBranchProtection(owner, repo, branch) {
  const octokit = new Octokit({
    auth: process.env.TOKEN // GitHub Actions automatically provides a token
  });

  try {
    await octokit.request('PUT /repos/{owner}/{repo}/branches/{branch}/protection', {
      owner: owner,
      repo: repo,
      branch: branch,
      required_status_checks: {
        strict: true,
        contexts: []
      },
      enforce_admins: true,
      required_pull_request_reviews: {
        dismissal_restrictions: {
          "users": [
            "seantrane",
            "informa-ap-devops"
        ],
          teams: []
        },
        dismiss_stale_reviews: true,
        require_code_owner_reviews: true,
        required_approving_review_count: 2,
        require_last_push_approval: true,
        bypass_pull_request_allowances: {
          "users": [
            "seantrane",
            "informa-ap-devops"
        ],
          teams: []
        }
      },
      restrictions: {
        users: [],
        teams: [],
        apps: []
      },
      required_linear_history: false,
      allow_force_pushes: false,
      allow_deletions: false,
      block_creations: false,
      required_conversation_resolution: true,
      lock_branch: false,
      allow_fork_syncing: false,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    console.log(`Branch protection set for ${owner}/${repo}:${branch}`);
  } catch (error) {
    console.error(`Failed to set branch protection for ${owner}/${repo}:${branch}: ${error.message}`);
  }
}

// Usage example
const owner = 'tandfgroup'; // Replace 'OWNER' with the repository owner's username or organization name
const repo = 'codespaces-demo'; // Replace 'REPO' with the name of the repository
const branch = 'main'; // Replace 'BRANCH' with the name of the branch
const teamSlugs = ['platform-engineering', 'quality-engineering', 'thejaswitricon', 'seantrane']; // Array of team slugs

(async () => {
  await addCollaborators(owner, repo, teamSlugs);
  await setBranchProtection(owner, repo, branch);
})();
