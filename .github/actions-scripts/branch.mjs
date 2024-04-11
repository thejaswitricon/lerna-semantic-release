const { Octokit } = require('@octokit/core');

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
        contexts: ['continuous-integration/travis-ci']
      },
      enforce_admins: true,
      required_pull_request_reviews: {
        dismissal_restrictions: {
          users: ['octocat'],
          teams: ['justice-league']
        },
        dismiss_stale_reviews: true,
        require_code_owner_reviews: true,
        required_approving_review_count: 2,
        require_last_push_approval: true,
        bypass_pull_request_allowances: {
          users: ['octocat'],
          teams: ['justice-league']
        }
      },
      restrictions: {
        users: ['octocat'],
        teams: ['justice-league'],
        apps: ['super-ci']
      },
      required_linear_history: true,
      allow_force_pushes: true,
      allow_deletions: true,
      block_creations: true,
      required_conversation_resolution: true,
      lock_branch: true,
      allow_fork_syncing: true,
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

setBranchProtection(owner, repo, branch);
