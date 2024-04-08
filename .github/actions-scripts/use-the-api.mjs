import { Octokit } from 'https://cdn.skypack.dev/@octokit/core';

const octokit = new Octokit({
  auth: process.env.TOKEN,
});
async function updateBranchProtection() {
  try {
    await octokit.request('GET /repos/{owner}/{repo}/branches/{branch}/protection', {
      owner: 'tandfgroup',
      repo: 'codespaces-demo',
      branch: 'main',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
      } catch (error) {
    console.error('Error updating branch protection:', error.message);
  }
}
updateBranchProtection();
