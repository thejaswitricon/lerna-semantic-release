/**
 * Release configuration for the monorepo
 *
 * For more info;
 * - https://github.com/Updater/semantic-release-monorepo
 * - https://github.com/semantic-release/semantic-release
 * - https://github.com/lerna/lerna
 */

module.exports = {
    branch: 'main',
    // tagFormat: 'v${version}',
    monorepo: {
      analyzeCommits: [
        '@semantic-release/commit-analyzer'
      ],
      generateNotes: [
        '@semantic-release/release-notes-generator'
      ]
    },
    /**
     * Move plugins from verifyConditions to verifyRelease to
     * reduce expensive network calls (50%+ runtime reduction).
     * https://github.com/Updater/semantic-release-monorepo#reduce-expensive-network-calls-50-runtime-reduction
     */
    verifyConditions: [],
    verifyRelease: [
      '@semantic-release/changelog',
      '@semantic-release/npm',
      '@semantic-release/git',
      '@semantic-release/github'
    ]
      .map(require)
      .map(x => x.verifyConditions),
    prepare: [
      {
        path: '@semantic-release/changelog',
        changelogTitle: '# CHANGELOG'
      },
      {
        path: '@semantic-release/exec',
        cmd: 'lerna exec -- npx echo "Publishing package: Echoing the packages"'
      },
      '@semantic-release/npm',
      {
        'path': '@semantic-release/git',
        'message': 'chore(release): ${nextRelease.gitTag} [skip ci]\n\n${nextRelease.notes}'
      }
    ],
    publish: [
      {
        path: '@semantic-release/exec',
        cmd: 'lerna exec -- npx sh -c "echo Publishing package: $(basename $PWD)"'
      },
      "@semantic-release/npm", {
        "npmPublish": false
      },
      '@semantic-release/github'
    ],
    success: [
      '@semantic-release/github'
    ],
    fail: [
      '@semantic-release/github'
    ]
  };