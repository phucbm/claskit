'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execSync, spawnSync } = require('node:child_process');

const CLASK = path.resolve(__dirname, '..', 'bin', 'claskit.js');

function run(args, cwd, { allowFail = false, stdin = null } = {}) {
  if (stdin !== null) {
    const result = spawnSync('node', [CLASK, ...args.split(' ').filter(Boolean)], {
      cwd,
      encoding: 'utf8',
      input: stdin,
      env: { ...process.env },
    });
    const stdout = (result.stdout || '') + (result.stderr || '');
    if (!allowFail && result.status !== 0) throw new Error(stdout);
    return { code: result.status ?? 0, stdout };
  }
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
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'claskit-int-'));
  fs.writeFileSync(path.join(dir, 'package.json'), '{"name":"test"}');
  return dir;
}

function makeBareDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'claskit-bare-'));
}

// ─── project detection ───────────────────────────────────────────────────────

test('non-project dir: shows warning', () => {
  const dir = makeBareDir(); // no .git, package.json, or .claude
  const { stdout } = run('', dir, { allowFail: true });
  assert.ok(stdout.includes('No project detected'), `warning missing, got: ${stdout}`);
  fs.rmSync(dir, { recursive: true });
});

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

// ─── onboarding flow ─────────────────────────────────────────────────────────

test('onboarding: shows "not set up" prompt', () => {
  const dir = makeTmp();
  const { stdout } = run('', dir, { allowFail: true, stdin: 'n\n' });
  assert.ok(stdout.includes('not set up'), `prompt missing, got: ${stdout}`);
  fs.rmSync(dir, { recursive: true });
});

test('onboarding: n → exits without creating folders', () => {
  const dir = makeTmp();
  run('', dir, { allowFail: true, stdin: 'n\n' });
  assert.ok(!fs.existsSync(path.join(dir, '.claude/tasks/todo')), 'todo/ should not exist');
  fs.rmSync(dir, { recursive: true });
});

test('onboarding: y → creates folders', () => {
  const dir = makeTmp();
  run('', dir, { allowFail: true, stdin: 'y\nn\n' }); // y=init, n=no sample tasks
  assert.ok(fs.existsSync(path.join(dir, '.claude/tasks/todo')), 'todo/ missing');
  assert.ok(fs.existsSync(path.join(dir, '.claude/tasks/done')), 'done/ missing');
  fs.rmSync(dir, { recursive: true });
});

test('onboarding: y + y → creates folders and sample tasks', () => {
  const dir = makeTmp();
  run('', dir, { allowFail: true, stdin: 'y\ny\n' }); // y=init, y=sample tasks
  const files = fs.readdirSync(path.join(dir, '.claude/tasks/todo'));
  const testFiles = files.filter(f => f.startsWith('claskit-test-task-'));
  assert.equal(testFiles.length, 2, `expected 2 sample tasks, got ${testFiles.length}`);
  fs.rmSync(dir, { recursive: true });
});

test('onboarding: y + y → shows Ready message', () => {
  const dir = makeTmp();
  const { stdout } = run('', dir, { allowFail: true, stdin: 'y\ny\n' });
  assert.ok(stdout.includes('Ready'), `ready message missing, got: ${stdout}`);
  fs.rmSync(dir, { recursive: true });
});

test('onboarding: y + n → no sample tasks created', () => {
  const dir = makeTmp();
  run('', dir, { allowFail: true, stdin: 'y\nn\n' });
  const files = fs.readdirSync(path.join(dir, '.claude/tasks/todo'));
  assert.equal(files.length, 0, 'no tasks expected');
  fs.rmSync(dir, { recursive: true });
});

// ─── --test ──────────────────────────────────────────────────────────────────

test('--test: creates 2 test .md files in todo/', () => {
  const dir = makeTmp();
  run('--init', dir);
  run('--test', dir);
  const files = fs.readdirSync(path.join(dir, '.claude/tasks/todo'));
  const testFiles = files.filter(f => f.startsWith('claskit-test-task-'));
  assert.equal(testFiles.length, 2, `expected 2 test tasks, got ${testFiles.length}`);
  fs.rmSync(dir, { recursive: true });
});

test('--test: task files contain valid # headings', () => {
  const dir = makeTmp();
  run('--init', dir);
  run('--test', dir);
  const todoDir = path.join(dir, '.claude/tasks/todo');
  const files = fs.readdirSync(todoDir).filter(f => f.startsWith('claskit-test-task-'));
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
  const testFiles = files.filter(f => f.startsWith('claskit-test-task-'));
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
