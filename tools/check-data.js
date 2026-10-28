// 데이터 검사: node tools/check-data.js
// 필수 칸, 중복 제목, 없는 분야/소분류, 한 줄 답 길이를 확인해요.
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.join(__dirname, '..');
const dir = path.join(root, 'data');
const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort((a, b) => a.startsWith('_') ? -1 : b.startsWith('_') ? 1 : 0);
files.forEach(f => vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8').replace(/^const /gm, 'var '), ctx, { filename: f }));
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const src = app.slice(app.indexOf('var CATS = ['), app.indexOf('var CAT = {}')).replace('var CATS =', '(').replace(/;\s*$/, '') + ')';
const CATS = vm.runInNewContext(src);
const subs = {}; CATS.forEach(c => subs[c.id] = c.subs);
const seen = {}, bad = [], cnt = {};
ctx.DATA.forEach(e => {
  if (seen[e.t]) bad.push('제목 중복: ' + e.t); seen[e.t] = 1;
  e.c.forEach(c => { cnt[c] = (cnt[c] || 0) + 1; if (!subs[c]) bad.push('없는 분야 ' + c + ': ' + e.t); });
  e.sub.forEach(s => { if (!e.c.some(c => (subs[c] || []).indexOf(s) > -1)) bad.push('없는 소분류 ' + s + ': ' + e.t); });
  if (!e.one || e.one.length > 90) bad.push('한 줄 답 길이: ' + e.t);
  if (e.pts.length < 2 || e.pts.length > 6) bad.push('핵심 개수: ' + e.t);
  if (!e.e) bad.push('이모지 없음: ' + e.t);
});
console.log('총 ' + ctx.DATA.length + '개', JSON.stringify(cnt));
console.log(bad.length ? bad.join('\n') : 'OK');
process.exit(bad.length ? 1 : 0);
