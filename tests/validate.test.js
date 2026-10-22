// Simple automated checks for the app (run by Jenkins in the "Build & Test" stage)
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const script = html.split('<script>')[1].split('</script>')[0];

test('page has the correct title', () => {
  assert.ok(html.includes('<title>Textile Sales Manager</title>'));
});

test('JavaScript has no syntax errors', () => {
  assert.doesNotThrow(() => new Function(script));
});

test('page has the header and build tag', () => {
  assert.ok(html.includes('id="brandTitle"'));
  assert.ok(html.includes('id="buildTag"'));
});

test('bills are saved in the browser', () => {
  assert.ok(script.includes('localStorage'));
});

test('printed bill says it is not a GST invoice', () => {
  assert.ok(html.includes('not a GST tax invoice'));
});
