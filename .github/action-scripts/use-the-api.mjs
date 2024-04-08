import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.TOKEN,
});

await octokit.request('PUT /repos/{owner}/{repo}/branches/{branch}/protection', {
  owner: 'tandfgroup',
  repo: 'codespaces-demo',
  branch: 'main',
  required_status_checks: {
    strict: true,
    contexts: [
      'continuous-integration/travis-ci'
    ]
  },
  enforce_admins: true,
  required_pull_request_reviews: {
    dismissal_restrictions: {
      users: [
        'thejaswitricon'
      ],
      teams: []
    },
    dismiss_stale_reviews: true,
    require_code_owner_reviews: true,
    required_approving_review_count: 2,
    require_last_push_approval: true,
    bypass_pull_request_allowances: {
      users: [
        'thejaswitricon'
      ],
      teams: []
    }
  },
  restrictions: {
    users: [
      'thejaswitricon'
    ],
    teams: [],
    apps: []
  },
  required_linear_history: false,
  allow_force_pushes: false,
  allow_deletions: false,
  block_creations: true,
  required_conversation_resolution: true,
  lock_branch: true,
  allow_fork_syncing: true,
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
});
