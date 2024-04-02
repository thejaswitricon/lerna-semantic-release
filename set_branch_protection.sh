#!/bin/bash

# Variables
OWNER="thejaswitricon"
REPO="$2"
BRANCH="main"
TOKEN="$1"

# JSON payload
JSON='{
  "required_status_checks": {
    "strict": true,
    "contexts": ["continuous-integration/travis-ci"]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "dismissal_restrictions": {
      "users": ["octocat"],
      "teams": ["justice-league"]
    },
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true,
    "required_approving_review_count": 2,
    "require_last_push_approval": true,
    "bypass_pull_request_allowances": {
      "users": ["octocat"],
      "teams": ["justice-league"]
    }
  },
  "restrictions": {
    "users": ["octocat"],
    "teams": ["justice-league"],
    "apps": ["super-ci"]
  },
  "required_linear_history": true,
  "allow_force_pushes": true,
  "allow_deletions": false,
  "block_creations": true,
  "required_conversation_resolution": true,
  "lock_branch": true,
  "allow_fork_syncing": true
}'

# Make API call
curl -X PUT \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  -d "$JSON" \
  "https://api.github.com/repos/$OWNER/$REPO/branches/$BRANCH/protection"
