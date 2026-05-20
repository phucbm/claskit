'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execSync } = require('node:child_process');

const CLASK = path.resolve(__dirname, '..', 'bin', 'clask.js');

function run(args, cwd, { allowFail = false } = {}) {
  try {
    const stdout = execSync(`node "${CLASK}" ${args}`, {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env },
    });
    return { code: 0, stdout };
  } catch (err) {
    if (!allowFail) throw err;
    return { code: err.status ?? 1, stdout: (err.stdout || '') + (err.stderr || '') };
  }
}

function makeTmp() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'clask-int-'));
}

// ─── --init ──────────────────────────────────────────────────────────────────

test('--init: creates todo/, done/, README.md', () => {
  const dir = makeTmp();
  run('--init', dir);
  assert.ok(fs.existsSync(path.join(dir, '.claude/tasks/todo')), 'todo/ missing');
  assert.ok(fs.existsSync(path.join(dir, '.claude/tasks/done')), 'done/ missing');
  assert.ok(fs.existsSync(path.join(dir, '.claude/tasks/README.md')), 'README.md missing');
  fs.rmSync(dir, { recursive: true });
});

test('--init: idempotent — runs twice without error', () => {
  const dir = makeTmp();
  run('--init', dir);
  const { code, stdout } = run('--init', dir);
  assert.equal(code, 0);
  assert.ok(stdout.includes('README'), 'second init should mention README');
  fs.rmSync(dir, { recursive: true });
});

test('--init: README.md contains "For AI assistants" section', () => {
  const dir = makeTmp();
  run('--init', dir);
  const readme = fs.readFileSync(path.join(dir, '.claude/tasks/README.md'), 'utf8');
  assert.ok(readme.includes('For AI assistants'));
  fs.rmSync(dir, { recursive: true });
});

// ─── no init ─────────────────────────────────────────────────────────────────

test('no init: exits 1 with --init hint', () => {
  const dir = makeTmp();
  const { code, stdout } = run('', dir, { allowFail: true });
  assert.equal(code, 1);
  assert.ok(stdout.includes('clask --init'), `hint missing, got: ${stdout}`);
  fs.rmSync(dir, { recursive: true });
});

// ─── --test ──────────────────────────────────────────────────────────────────

test('--test: creates 2 test .md files in todo/', () => {
  const dir = makeTmp();
  run('--init', dir);
  run('--test', dir);
  const files = fs.readdirSync(path.join(dir, '.claude/tasks/todo'));
  const testFiles = files.filter(f => f.startsWith('clask-test-task-'));
  assert.equal(testFiles.length, 2, `expected 2 test tasks, got ${testFiles.length}`);
  fs.rmSync(dir, { recursive: true });
});

test('--test: task files contain valid # headings', () => {
  const dir = makeTmp();
  run('--init', dir);
  run('--test', dir);
  const todoDir = path.join(dir, '.claude/tasks/todo');
  const files = fs.readdirSync(todoDir).filter(f => f.startsWith('clask-test-task-'));
  files.forEach(f => {
    const content = fs.readFileSync(path.join(todoDir, f), 'utf8');
    assert.match(content, /^# .+/m, `${f} missing # heading`);
  });
  fs.rmSync(dir, { recursive: true });
});

test('--test: output includes "Now run" instruction', () => {
  const dir = makeTmp();
  run('--init', dir);
  const { stdout } = run('--test', dir);
  assert.ok(stdout.includes('Now run'), `missing instruction, got: ${stdout}`);
  fs.rmSync(dir, { recursive: true });
});

// ─── --clean-test ────────────────────────────────────────────────────────────

test('--clean-test: removes test files', () => {
  const dir = makeTmp();
  run('--init', dir);
  run('--test', dir);
  run('--clean-test', dir);
  const files = fs.readdirSync(path.join(dir, '.claude/tasks/todo'));
  const testFiles = files.filter(f => f.startsWith('clask-test-task-'));
  assert.equal(testFiles.length, 0, 'test files still present after clean');
  fs.rmSync(dir, { recursive: true });
});

test('--clean-test: reports cleaned count', () => {
  const dir = makeTmp();
  run('--init', dir);
  run('--test', dir);
  const { stdout } = run('--clean-test', dir);
  assert.ok(stdout.includes('Cleaned up'), `missing report, got: ${stdout}`);
  fs.rmSync(dir, { recursive: true });
});

test('--clean-test: safe when no test files exist', () => {
  const dir = makeTmp();
  run('--init', dir);
  const { code, stdout } = run('--clean-test', dir);
  assert.equal(code, 0);
  assert.ok(stdout.includes('0'), 'should report 0 cleaned');
  fs.rmSync(dir, { recursive: true });
});
