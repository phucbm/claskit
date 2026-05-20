'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { pad, box, fmtDuration, taskTitle, buildPrompt } = require('../bin/claskit.js');

// ─── pad ─────────────────────────────────────────────────────────────────────

test('pad: pads short string', () => {
  assert.equal(pad('hi', 5), 'hi   ');
});

test('pad: no truncation when over length', () => {
  assert.equal(pad('toolong', 3), 'toolong');
});

test('pad: exact length unchanged', () => {
  assert.equal(pad('abc', 3), 'abc');
});

test('pad: coerces non-string', () => {
  assert.equal(pad(42, 5), '42   ');
});

// ─── fmtDuration ─────────────────────────────────────────────────────────────

test('fmtDuration: 0 seconds', () => {
  assert.equal(fmtDuration(0), '0s');
});

test('fmtDuration: seconds only', () => {
  assert.equal(fmtDuration(45), '45s');
});

test('fmtDuration: minutes and seconds', () => {
  assert.equal(fmtDuration(65), '1m 05s');
});

test('fmtDuration: exact minute', () => {
  assert.equal(fmtDuration(120), '2m 00s');
});

test('fmtDuration: hours minutes seconds', () => {
  assert.equal(fmtDuration(3661), '1h 01m 01s');
});

test('fmtDuration: large value', () => {
  assert.equal(fmtDuration(7384), '2h 03m 04s');
});

// ─── box ─────────────────────────────────────────────────────────────────────

test('box: starts with top border', () => {
  const result = box('line1');
  assert.match(result, /^╔/);
});

test('box: ends with bottom border', () => {
  const result = box('line1');
  assert.match(result, /╚[═]+╝$/);
});

test('box: all lines same character count', () => {
  const lines = box('hello', 'world').split('\n');
  const lengths = lines.map(l => [...l].length); // unicode-safe
  assert.ok(lengths.every(n => n === lengths[0]), `line lengths differ: ${lengths}`);
});

// ─── taskTitle ───────────────────────────────────────────────────────────────

test('taskTitle: extracts # heading', () => {
  const tmp = path.join(os.tmpdir(), `claskit-test-${Date.now()}.md`);
  fs.writeFileSync(tmp, '# My Task Title\n\nsome content');
  assert.equal(taskTitle(tmp), 'My Task Title');
  fs.unlinkSync(tmp);
});

test('taskTitle: heading with extra spaces', () => {
  const tmp = path.join(os.tmpdir(), `claskit-test-${Date.now()}.md`);
  fs.writeFileSync(tmp, '#  Spaced Title  \n');
  assert.equal(taskTitle(tmp), 'Spaced Title');
  fs.unlinkSync(tmp);
});

test('taskTitle: file with no # heading falls back to filename', () => {
  const tmp = path.join(os.tmpdir(), `claskit-test-${Date.now()}.md`);
  fs.writeFileSync(tmp, 'no heading here\njust content');
  const result = taskTitle(tmp);
  assert.equal(result, path.basename(tmp, '.md'));
  fs.unlinkSync(tmp);
});

test('taskTitle: nonexistent file falls back to filename', () => {
  const fake = '/nonexistent/path/my-task.md';
  assert.equal(taskTitle(fake), 'my-task');
});

test('taskTitle: heading not on first line is still found', () => {
  const tmp = path.join(os.tmpdir(), `claskit-test-${Date.now()}.md`);
  fs.writeFileSync(tmp, 'some preamble\n# Late Heading\ncontent');
  assert.equal(taskTitle(tmp), 'Late Heading');
  fs.unlinkSync(tmp);
});

// ─── buildPrompt ─────────────────────────────────────────────────────────────

test('buildPrompt: contains each task file path (forward slashes)', () => {
  const tasks = ['.claude/tasks/todo/task-1.md', '.claude/tasks/todo/task-2.md'];
  const prompt = buildPrompt(tasks);
  assert.ok(prompt.includes('task-1.md'), 'missing task-1');
  assert.ok(prompt.includes('task-2.md'), 'missing task-2');
});

test('buildPrompt: contains autonomous task runner instruction', () => {
  const prompt = buildPrompt(['.claude/tasks/todo/x.md']);
  assert.ok(prompt.includes('autonomous task runner'));
});

test('buildPrompt: contains move to done instruction', () => {
  const prompt = buildPrompt(['.claude/tasks/todo/x.md']);
  assert.ok(prompt.includes('done/'));
});

test('buildPrompt: uses forward slashes even with backslash input', () => {
  const winPath = '.claude\\tasks\\todo\\task.md';
  const prompt = buildPrompt([winPath]);
  assert.ok(!prompt.includes('\\'), 'backslash found in prompt');
});
