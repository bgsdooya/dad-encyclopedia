/* 아빠표 백과사전 — 화면/검색/라우팅. 내용은 data/*.js 에 있어요. */
(function () {
'use strict';

/* ===== 분야 ===== */
var CATS = [
  { id: 'animal', emo: '🐾', name: '동물', color: 'var(--c-peach)', desc: '포유류, 새, 곤충, 바다 생물, 공룡까지',
    why: '왜 그럴까?', prompt: '오늘 본 동물은 어디서 살고 뭘 먹을까?',
    subs: ['포유류', '새', '파충류·양서류', '곤충', '벌레·갑각류', '바다 생물', '공룡·옛 동물', '반려동물', '동물 상식'] },
  { id: 'plant', emo: '🌻', name: '식물·버섯', color: 'var(--c-lime)', desc: '꽃, 나무, 버섯 (독 있는 것도!)',
    why: '왜 그럴까?', prompt: '집 근처에서 식물을 세 가지 찾아볼까?',
    subs: ['꽃·나무', '채소·열매·곡식', '식물 상식', '버섯'] },
  { id: 'body', emo: '🫀', name: '우리 몸', color: 'var(--pink)', desc: '심장, 뼈, 뇌, 감각… 내 몸 설명서',
    why: '왜 그럴까?', prompt: '오늘 내 몸이 “고마워!” 할 일은 무엇일까?',
    subs: ['몸속 기관', '감각', '몸의 신기한 일'] },
  { id: 'health', emo: '🩺', name: '건강·운동', color: 'var(--c-teal)', desc: '병, 응급처치, 운동, 영양, 수면',
    why: '왜 그럴까?', prompt: '오늘 건강을 위해 우리 가족이 할 수 있는 일은?',
    subs: ['질병·증상', '응급처치', '운동·자세', '영양·식사', '잠·마음 건강'] },
  { id: 'earth', emo: '🌍', name: '지구·날씨', color: 'var(--sky)', desc: '날씨, 땅과 바다, 환경',
    why: '왜 그럴까?', prompt: '오늘 하늘에서 어떤 것을 하나 찾아볼까?',
    subs: ['날씨', '땅과 바다', '환경·에너지'] },
  { id: 'space', emo: '🚀', name: '우주', color: 'var(--lavender)', desc: '달, 태양, 행성, 별, 우주선',
    why: '왜 그럴까?', prompt: '오늘 밤 하늘에서 달이나 별을 찾아볼까?',
    subs: ['달·태양·지구', '행성·별', '우주 탐험'] },
  { id: 'science', emo: '🔬', name: '과학', color: 'var(--c-teal)', desc: '물리, 화학, 생활 속 과학, 발명',
    why: '왜 그럴까?', prompt: '집에서 해볼 수 있는 간단한 실험이 뭐가 있을까?',
    subs: ['힘과 에너지', '물질', '빛·소리·전기', '생활 속 과학', '발명·발견'] },
  { id: 'tech', emo: '🤖', name: '기계·기술·IT', color: 'var(--yellow)', desc: '탈것, 집 안 물건, 컴퓨터, 인터넷, AI',
    why: '어떻게 움직일까?', prompt: '집에서 움직이거나 소리 나는 물건을 하나 찾아볼까?',
    subs: ['탈것', '집 안 물건', '컴퓨터·인터넷', '건물·도로'] },
  { id: 'history', emo: '📜', name: '역사', color: 'var(--c-sand)', desc: '세계사와 한국사, 위인',
    why: '더 알아보기', prompt: '옛날 사람들은 이걸 어떻게 했을까?',
    subs: ['한국사', '세계사', '인물'] },
  { id: 'world', emo: '🗺️', name: '세계·지리', color: 'var(--mint)', desc: '대륙, 나라, 수도, 유명한 곳',
    why: '더 알아보기', prompt: '지구본에서 가보고 싶은 나라를 찾아볼까?',
    subs: ['지구의 모습', '아시아', '유럽', '아메리카', '아프리카·오세아니아', '세계의 명소'] },
  { id: 'korea', emo: '🇰🇷', name: '대한민국', color: 'var(--c-coral)', desc: '지리, 명절, 음식, 전통, 한글',
    why: '더 알아보기', prompt: '우리 가족이 좋아하는 명절 음식은 뭘까?',
    subs: ['나라 상식', '지리·지역', '명절·풍습', '음식', '전통·문화'] },
  { id: 'math', emo: '➗', name: '수학', color: 'var(--orange-soft)', desc: '숫자, 도형, 시간, 측정',
    why: '왜 그럴까?', prompt: '오늘 집에서 도형이나 숫자를 다섯 개 찾아볼까?',
    subs: ['수와 계산', '도형', '시간·측정'] },
  { id: 'language', emo: '📖', name: '글과 말', color: 'var(--lavender)', desc: '한글, 속담, 사자성어, 영어 기본',
    why: '더 알아보기', prompt: '오늘 새로 알게 된 낱말을 하나 말해 볼까?',
    subs: ['한글·낱말', '속담·사자성어', '영어 기본'] },
  { id: 'life', emo: '🏠', name: '생활·경제·사회', color: 'var(--c-sand)', desc: '돈, 직업, 법, 요리, 예절',
    why: '더 알아보기', prompt: '우리 동네에는 어떤 일을 하는 사람들이 있을까?',
    subs: ['돈·경제', '직업', '사회·법', '요리·음식', '집안일·살림', '예절·관계'] },
  { id: 'safety', emo: '🚨', name: '안전', color: 'var(--c-coral)', desc: '119, 재난, 길 잃었을 때, 인터넷 안전',
    why: '왜 그럴까?', prompt: '도움이 필요할 때 누구에게 말할 수 있을까?',
    subs: ['신고·도움', '재난·사고', '나를 지키는 법'] },
  { id: 'culture', emo: '🎨', name: '예술·음악·운동경기', color: 'var(--pink)', desc: '그림, 악기, 올림픽, 스포츠 규칙',
    why: '더 알아보기', prompt: '오늘 들어 본 노래 중 제일 좋은 건 뭐야?',
    subs: ['미술', '음악', '스포츠', '책·영화'] }
];
var CAT = {};
CATS.forEach(function (c) { CAT[c.id] = c; });

var DANGER_NOTE = '⚠️ 여기에 없다고 안전한 게 아니에요! 모르는 동물·풀·열매·버섯은 함부로 만지거나 먹지 말고, 어른한테 먼저 물어봐요.';

/* ===== 데이터 준비 ===== */
var DATA = window.DATA || [];
var BY = {};
DATA.forEach(function (e, i) {
  e.i = i;
  BY[e.t] = e;
  e.hay = (e.t + ' ' + e.k + ' ' + e.one + ' ' + e.pts.join(' ') + ' ' + e.tip + ' ' + e.lt).toLowerCase();
  e.th = e.t.toLowerCase();
});

/* ===== 도구 ===== */
var app = document.getElementById('app');
var toastEl = document.getElementById('toast');
var toastTimer, speaking = false;

function esc(v) {
  return String(v).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
}
function enc(s) { return encodeURIComponent(s); }
function href(path) { return '#/' + path; }
function eHref(t) { return '#/e/' + enc(t); }
function toast(m) {
  toastEl.textContent = m; toastEl.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2400);
}
function lsGet(k, d) { try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }
function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* 저장 못 해도 괜찮아요 */ } }

var SEEN = lsGet('abba-seen', {});
var FAV = lsGet('abba-fav', []);
function bump(t) { SEEN[t] = (SEEN[t] || 0) + 1; lsSet('abba-seen', SEEN); }
function isFav(t) { return FAV.indexOf(t) > -1; }
function toggleFav(t) {
  var k = FAV.indexOf(t);
  if (k > -1) FAV.splice(k, 1); else FAV.push(t);
  lsSet('abba-fav', FAV);
  return k === -1;
}
function favItems() { return FAV.map(function (t) { return BY[t]; }).filter(Boolean); }
function recentItems() {
  return DATA.filter(function (e) { return SEEN[e.t]; }).sort(function (a, b) { return SEEN[b.t] - SEEN[a.t]; }).slice(0, 12);
}
function inCat(e, cat) { return e.c.indexOf(cat) > -1; }
function catItems(cat, sub) {
  return DATA.filter(function (e) { return inCat(e, cat) && (!sub || e.sub.indexOf(sub) > -1); });
}
function todayItem() {
  var d = new Date(), day = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);
  var pool = DATA.filter(function (e) { return e.c.indexOf('safety') < 0 && !e.danger && e.pts.length >= 3 && e.why; });
  if (pool.length < 20) pool = DATA.filter(function (e) { return !e.danger && e.pts.length >= 3; });
  return pool[(day * 7 + d.getFullYear()) % pool.length];
}

/* ===== 검색 ===== */
var STOP = ['왜', '뭐', '뭐야', '뭔가', '무엇', '어떻게', '어떤', '알려줘', '알려', '궁금해', '란', '이란', '은', '는', '이', '가', '에', '의', '좀', '그', '저', '것', '거', '해', '해요', '쳐', '와', '과', '도', '를', '을'];
var PARTICLES = ['이란', '에서', '으로', '에게', '이랑', '이야', '이에요', '예요', '인가', '은', '는', '이', '가', '을', '를', '의', '에', '도', '로', '랑', '와', '과', '야'];
function tokens(q) {
  var out = [];
  q.toLowerCase().replace(/[?.!,~]/g, ' ').split(/\s+/).forEach(function (w) {
    if (!w || STOP.indexOf(w) > -1) return;
    out.push(w);
    for (var i = 0; i < PARTICLES.length; i++) {
      var p = PARTICLES[i];
      if (w.length > p.length + 1 && w.slice(-p.length) === p) { out.push(w.slice(0, -p.length)); break; }
    }
  });
  return out;
}
var SYN = {
  '아파': ['아픔', '아프', '아플', '통증'], '아픈': ['아픔', '아프', '통증'], '아플': ['아픔', '아프', '통증'], '아파요': ['아픔', '아프', '통증'],
  '모으기': ['저축', '용돈'], '모으는': ['저축'], '모아': ['저축'], '뜨거워': ['화상', '온도'], '뜨거운': ['화상', '온도'],
  '졸려': ['잠', '수면'], '못자': ['잠', '수면'], '배고': ['꼬르륵', '식사'], '무서워': ['무서울', '불안'], '무섭': ['무서울', '불안'],
  '똥': ['변', '똥'], '오줌': ['소변', '콩팥'], '이빨': ['치아', '이빨', '충치'], '치아': ['이빨', '충치'], '살빼': ['비만', 'BMI'],
  '뚱뚱': ['비만', 'BMI'], '키크': ['성장', '키'], '키가': ['성장', '키'], '도둑': ['112', '경찰'], '불이': ['소방', '화재', '불이'],
  '화나': ['화날', '분노'], '짜증': ['화날', '분노'], '친구': ['친구', '사과', '놀림'], '왕따': ['따돌림', '괴롭힘', '놀림']
};
function hasWord(str, w) { return (' ' + str.toLowerCase() + ' ').indexOf(' ' + w + ' ') > -1; }
function search(q) {
  var toks = tokens(q);
  if (!toks.length) return [];
  var terms = [];
  toks.forEach(function (t) { terms.push(t); if (SYN[t]) SYN[t].forEach(function (x) { terms.push(x.toLowerCase()); }); });
  var res = [];
  DATA.forEach(function (e) {
    var sc = 0;
    terms.forEach(function (t) {
      if (e.th === t) sc += 20;
      else if (t.length < 2) { if (hasWord(e.k, t)) sc += 4; }
      else if (e.th.indexOf(t) > -1) sc += 10;
      else if (e.k.toLowerCase().indexOf(t) > -1) sc += 6;
      else if (e.hay.indexOf(t) > -1) sc += 2;
    });
    if (sc) res.push([sc, e]);
  });
  res.sort(function (a, b) { return b[0] - a[0] || a[1].i - b[1].i; });
  return res.map(function (r) { return r[1]; });
}

/* ===== 조각 ===== */
function searchForm(compact, value) {
  var rec = window.SpeechRecognition || window.webkitSpeechRecognition;
  return '<form class="search-form' + (compact ? ' search-compact' : '') + '" data-search role="search">' +
    '<input id="searchInput" type="search" autocomplete="off" value="' + esc(value || '') + '" placeholder="예: 번개는 왜 쳐?" aria-label="궁금한 것 검색">' +
    (rec ? '<button class="voice-button" type="button" data-action="voice" aria-label="말로 찾기">🎙</button>' : '') +
    '<button class="search-submit" type="submit" aria-label="검색하기">⌕</button></form>';
}
function badges(e) {
  return (e.kr ? '<span class="badge">🇰🇷</span>' : '') + (e.danger ? '<span class="badge warn">⚠️</span>' : '');
}
function card(e) {
  var c = CAT[e.c[0]];
  return '<a class="mini-card" href="' + eHref(e.t) + '" style="--card-color:' + c.color + '">' +
    '<span class="mini-emoji" aria-hidden="true">' + e.e + '</span>' +
    '<span class="mini-heading">' + esc(e.t) + badges(e) + '</span>' +
    '<span class="mini-copy">' + esc(e.one) + '</span></a>';
}
function catCard(c) {
  var n = catItems(c.id).length;
  return '<a class="cat-card" href="' + href('c/' + c.id) + '">' +
    '<span class="cat-art" style="--cat-color:' + c.color + '" aria-hidden="true"><span>' + c.emo + '</span></span>' +
    '<span class="cat-copy"><span class="cat-heading">' + c.name + '<small class="cat-count">' + n + '</small></span>' +
    '<span class="cat-description">' + c.desc + '</span></span></a>';
}
function viewHead(title, sub, count, emoji) {
  return '<div class="view-hero"><div><a class="back-link" href="#/">← 처음으로</a>' +
    '<h1 class="view-title">' + (emoji ? emoji + ' ' : '') + title + '</h1>' +
    (sub ? '<p class="view-subtitle">' + sub + '</p>' : '') + '</div>' +
    (count != null ? '<span class="count-stamp">' + count + '개</span>' : '') + '</div>';
}
function searchStrip(v) { return '<div class="search-strip"><span aria-hidden="true">🔎</span>' + searchForm(true, v) + '</div>'; }
function grid(items) {
  return items.length ? '<div class="card-grid">' + items.map(card).join('') + '</div>' : '';
}
function empty(msg) {
  return '<section class="empty-card"><div class="empty-art" aria-hidden="true">🔎</div><h2>아직 못 찾았어</h2><p>' + msg + '</p><a class="button-ink" href="#/">처음으로 가기</a></section>';
}

/* ===== 화면 ===== */
var SUGGEST = ['번개', '공룡', '방귀', '달', '고구려', '독버섯', '119', '구구단', '무지개', '화산'];

function vHome() {
  var t = todayItem();
  var favs = favItems(), rec = recentItems();
  var chips = (favs.length ? favs : rec).slice(0, 5).map(function (e) { return '<span class="treasure-chip" title="' + esc(e.t) + '">' + e.e + '</span>'; }).join('') ||
    '<span class="treasure-chip" aria-hidden="true">✦</span><span class="treasure-chip" aria-hidden="true">?</span><span class="treasure-chip" aria-hidden="true">♡</span>';
  var lifeN = DATA.filter(function (e) { return e.life != null; }).length;
  var krN = DATA.filter(function (e) { return e.kr; }).length;
  var dgN = DATA.filter(function (e) { return e.danger; }).length;
  var rc = CATS[Math.floor(Math.random() * CATS.length)];
  return '<section class="home-top"><div class="hero-note"><p class="eyebrow">오늘도 한 가지 발견!</p>' +
    '<h1 class="hero-title">궁금한 건<br><span class="warm-mark">여기서 다 찾아!</span></h1>' +
    '<p class="hero-copy">' + CATS.length + '개 분야, ' + DATA.length + '가지 이야기.<br>아이는 쉽게, 어른은 자세히.</p>' +
    searchForm(false, '') +
    '<div class="suggest">' + SUGGEST.map(function (s) { return '<a href="' + href('q/' + enc(s)) + '">' + s + '</a>'; }).join('') + '</div></div>' +
    '<aside class="today-card"><p class="tiny-label">✦ 오늘의 발견 카드</p><div class="today-card-inner">' +
    '<div class="today-emoji" aria-hidden="true">' + t.e + '</div><h2>' + esc(t.t) + '</h2><p>' + esc(t.one) + '</p></div>' +
    '<a class="button-ink" href="' + eHref(t.t) + '">오늘의 발견 열기 <span aria-hidden="true">→</span></a></aside></section>' +
    '<section class="content-flow"><div class="flow-main"><div class="section-head"><div><h2>어떤 게 궁금해?</h2><p>분야를 누르면 이야기가 펼쳐져요.</p></div></div>' +
    '<div class="category-trail">' + CATS.map(catCard).join('') + '</div></div>' +
    '<div class="side-stack">' +
    '<aside class="treasure-card"><h3>나의 보물함</h3><p>' + (favs.length ? '♡ ' + favs.length + '개 모았어요.' : rec.length ? '최근 ' + rec.length + '개를 봤어요.' : '♡를 누르면 여기 모여요.') + '</p>' +
    '<div class="treasure-list">' + chips + '</div><a class="button-paper" href="#/fav">보물함 열기 <span aria-hidden="true">→</span></a></aside>' +
    '<aside class="more-card"><h3>모아보기</h3><div class="more-links">' +
    '<a href="#/az"><span>가</span>가나다순 전체 목록</a>' +
    (krN ? '<a href="#/kr"><span>🇰🇷</span>우리나라 친구들 <small>' + krN + '</small></a>' : '') +
    (lifeN ? '<a href="#/life"><span>⏳</span>수명 비교 <small>' + lifeN + '</small></a>' : '') +
    (dgN ? '<a href="#/danger"><span>⚠️</span>조심! 독·위험 <small>' + dgN + '</small></a>' : '') +
    '<a href="#/random"><span>🎲</span>아무거나 하나</a></div></aside>' +
    '<aside class="family-prompt"><span class="talk-mark" aria-hidden="true">☻</span><h3>같이 이야기해요</h3><p>' + rc.prompt + '</p><a class="text-button" href="#/guide">함께 보는 법 →</a></aside>' +
    '</div></section>';
}

function vCategory(id, sub) {
  var c = CAT[id];
  if (!c) return empty('없는 분야예요.');
  var all = catItems(id), items = sub ? catItems(id, sub) : all;
  var chips = '<div class="chips"><a class="chip' + (!sub ? ' on' : '') + '" href="' + href('c/' + id) + '">전체 <small>' + all.length + '</small></a>' +
    c.subs.map(function (s) {
      var n = catItems(id, s).length;
      return n ? '<a class="chip' + (sub === s ? ' on' : '') + '" href="' + href('c/' + id + '/' + enc(s)) + '">' + s + ' <small>' + n + '</small></a>' : '';
    }).join('') + '</div>';
  var warn = (id === 'plant' && (!sub || sub === '버섯')) ? '<p class="warn-box">⚠️ 산이나 들에서 딴 버섯은 어른도 먹지 않아요. 독버섯은 모양·색으로 구별할 수 없어요.</p>' : '';
  return viewHead(c.name, c.desc, items.length, c.emo) + searchStrip('') + chips + warn + grid(items);
}

function vSearch(q) {
  var items = search(q);
  return viewHead('찾은 이야기', '“' + esc(q) + '”와(과) 관련된 이야기예요.', items.length, '🔎') + searchStrip(q) +
    (items.length ? grid(items) : empty('다른 말로 찾아보거나, 분야에서 골라 보자.') +
      '<div class="chips">' + CATS.map(function (c) { return '<a class="chip" href="' + href('c/' + c.id) + '">' + c.emo + ' ' + c.name + '</a>'; }).join('') + '</div>');
}

function vList(title, sub, items, emoji, note) {
  return viewHead(title, sub, items.length, emoji) + searchStrip('') + (note ? '<p class="warn-box">' + note + '</p>' : '') +
    (items.length ? grid(items) : empty('아직 비어 있어요.'));
}

function vFav() {
  var f = favItems(), r = recentItems();
  var h = viewHead('나의 보물함', f.length ? '♡를 눌러 모은 이야기예요.' : '이야기 화면에서 ♡를 누르면 여기 모여요.', f.length, '♡') + searchStrip('');
  if (f.length) h += grid(f);
  if (r.length) h += '<div class="section-head sec"><div><h2>자주 본 이야기</h2></div></div>' + grid(r);
  if (!f.length && !r.length) h += empty('첫 번째 발견을 골라 볼까?');
  return h;
}

function chosung(t) {
  var CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ', c = t.charCodeAt(0);
  if (c >= 0xAC00 && c <= 0xD7A3) {
    var x = CHO.charAt(Math.floor((c - 0xAC00) / 588));
    return { 'ㄲ': 'ㄱ', 'ㄸ': 'ㄷ', 'ㅃ': 'ㅂ', 'ㅆ': 'ㅅ', 'ㅉ': 'ㅈ' }[x] || x;
  }
  return /[0-9]/.test(t.charAt(0)) ? '0-9' : '기타';
}
function vAZ() {
  var groups = {}, order = [];
  DATA.slice().sort(function (a, b) { return a.t.localeCompare(b.t, 'ko'); }).forEach(function (e) {
    var g = chosung(e.t);
    if (!groups[g]) { groups[g] = []; order.push(g); }
    groups[g].push(e);
  });
  var CHO = ['0-9', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', '기타'];
  order.sort(function (a, b) { return CHO.indexOf(a) - CHO.indexOf(b); });
  return viewHead('가나다순', '모든 이야기를 한눈에', DATA.length, '가') + searchStrip('') +
    '<div class="az-index">' + order.map(function (g) { return '<button type="button" data-az="' + g + '">' + g + '</button>'; }).join('') + '</div>' +
    order.map(function (g) {
      return '<section class="az-group" id="az-' + g + '"><h2>' + g + '</h2><div class="az-list">' +
        groups[g].map(function (e) {
          return '<a class="az-row" href="' + eHref(e.t) + '"><span class="az-e" aria-hidden="true">' + e.e + '</span><span class="az-t">' + esc(e.t) + '</span><small>' + CAT[e.c[0]].name + '</small></a>';
        }).join('') + '</div></section>';
    }).join('');
}

function vLife() {
  var items = DATA.filter(function (e) { return e.life != null; }).sort(function (a, b) { return a.life - b.life; });
  var mx = Math.sqrt(items[items.length - 1].life);
  return viewHead('누가 얼마나 오래 살까?', '짧게 사는 친구부터 오래 사는 친구까지 (길이는 제곱근으로 줄여 그렸어요)', items.length, '⏳') +
    '<div class="life-list">' + items.map(function (e) {
      var w = Math.max(3, Math.sqrt(e.life) / mx * 100);
      return '<a class="lrow' + (e.t === '사람' ? ' me' : '') + '" href="' + eHref(e.t) + '"><span class="lem">' + e.e + '</span><span class="lbody"><span class="lname">' + esc(e.ln || e.t) + '</span>' +
        '<span class="bar"><i style="width:' + w + '%"></i></span><span class="ltext">' + esc(e.lt) + '</span></span></a>';
    }).join('') + '</div>';
}

function vDetail(e) {
  var c = CAT[e.c[0]];
  var same = DATA.filter(function (x) { return x !== e && inCat(x, e.c[0]); });
  var near = same.filter(function (x) { return e.sub[0] && x.sub.indexOf(e.sub[0]) > -1; });
  var related = near.concat(same.filter(function (x) { return near.indexOf(x) < 0; })).slice(0, 6);
  var list = catItems(e.c[0], e.sub[0]);
  var p = list.indexOf(e), prev = list[p - 1], next = list[p + 1];
  var fav = isFav(e.t);
  var subs = e.sub.map(function (s) { return '<a class="chip" href="' + href('c/' + e.c[0] + '/' + enc(s)) + '">' + s + '</a>'; }).join('');
  return '<article class="detail-wrap"><div class="detail-topline"><a class="back-link" href="' + href('c/' + c.id) + '">← ' + c.name + '</a>' +
    '<a class="category-pill" href="' + href('c/' + c.id) + '" style="--detail-color:' + c.color + '">' + c.emo + ' ' + c.name + '</a></div>' +
    '<section class="detail-hero" style="--detail-color:' + c.color + '"><div class="detail-icon" aria-hidden="true">' + e.e + '</div>' +
    '<h1 class="detail-title">' + esc(e.t) + '</h1><p class="answer-line">' + esc(e.one) + '</p>' +
    (e.kr || e.danger || subs ? '<div class="detail-tags">' + (e.kr ? '<span class="badge">🇰🇷 우리나라</span>' : '') + (e.danger ? '<span class="badge warn">⚠️ 조심</span>' : '') + subs + '</div>' : '') + '</section>' +
    '<div class="detail-actions"><button class="button-paper" type="button" data-action="listen">🔊 소리로 듣기</button>' +
    '<button class="button-paper' + (fav ? ' on' : '') + '" type="button" data-action="fav" aria-pressed="' + fav + '">' + (fav ? '♥ 보물함에 있어요' : '♡ 보물함에 담기') + '</button>' +
    '<button class="button-paper" type="button" data-action="share">↗ 공유</button>' +
    '<a class="button-paper" href="#/random">🎲 다른 이야기</a></div>' +
    (e.danger ? '<p class="warn-box">' + DANGER_NOTE + '</p>' : '') +
    (e.pts.length ? '<section class="content-card"><h2>꼭 알아둘 ' + e.pts.length + '가지</h2><ol class="number-list">' + e.pts.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ol></section>' : '') +
    (e.tip ? '<p class="tip">💡 ' + esc(e.tip) + '</p>' : '') +
    (e.lt ? '<p class="life-line">⏳ 수명: <b>' + esc(e.lt) + '</b></p>' : '') +
    (e.why ? '<details class="fact-details" open><summary>' + c.why + '</summary><div class="details-body">' + e.why + '</div></details>' : '') +
    '<section class="talk-card"><h2>가족과 이렇게 이야기해 봐요</h2><p>“' + c.prompt + '”</p></section>' +
    (e.adult ? '<details class="fact-details adult"><summary>어른을 위한 도움말</summary><div class="details-body">' + e.adult + '</div></details>' : '') +
    (related.length ? '<section class="related-area"><div class="section-head"><div><h2>이것도 궁금할 수 있어요</h2></div></div>' + grid(related) + '</section>' : '') +
    '<div class="detail-nav">' +
    (prev ? '<a class="button-paper" href="' + eHref(prev.t) + '">← ' + esc(prev.t) + '</a>' : '<span></span>') +
    (next ? '<a class="button-ink" href="' + eHref(next.t) + '">' + esc(next.t) + ' →</a>' : '<span></span>') + '</div></article>';
}

function vGuide() {
  return viewHead('사용법', '아이의 “왜?”가 가족의 이야기 시간이 되도록.') +
    '<div class="guide-layout"><section class="guide-card wide"><h2>아이와 볼 때는 이렇게</h2>' +
    '<div class="guide-step"><span>1</span><div><strong>한 줄 답과 3가지 핵심을 먼저 읽어요.</strong><p>“왜 그럴까?”는 아이가 더 궁금해할 때만 열어요.</p></div></div>' +
    '<div class="guide-step"><span>2</span><div><strong>아이의 생각을 먼저 물어요.</strong><p>“너는 왜 그렇다고 생각해?”라고 물으면 정답 찾기가 아니라 탐험이 돼요.</p></div></div>' +
    '<div class="guide-step"><span>3</span><div><strong>생활 속에서 한 번 찾아봐요.</strong><p>창밖의 구름, 주방의 자석, 심장 뛰는 소리처럼 작은 관찰이면 충분해요.</p></div></div></section>' +
    '<section class="guide-card" style="background:var(--mint)"><h2>어른이 볼 때는</h2><p>‘어른을 위한 도움말’에 더 정확한 설명과 주의할 점이 있어요. 건강·안전 이야기는 참고용이고, 아프면 꼭 병원에서 확인하세요.</p></section>' +
    '<section class="guide-card" style="background:var(--sky)"><h2>찾는 방법</h2><p>검색창에 “번개는 왜 쳐?”처럼 써도 돼요. 마이크 버튼으로 말해도 되고, 가나다순 · 분야별 · 수명 비교로도 찾을 수 있어요.</p>' +
    '<h3>보물함</h3><p>♡를 누르면 보물함에 모여요. 이 기기에만 저장돼요.</p></section></div>';
}

/* ===== 라우터 ===== */
var navByClick = false, scrollMem = {}, curHash = '';
function parse() {
  var h = (location.hash || '#/').replace(/^#\/?/, ''), parts = h.split('/').map(function (s) { try { return decodeURIComponent(s); } catch (e) { return s; } });
  return parts;
}
var curEntry = null;
function route() {
  var p = parse(), r = p[0] || '', html = '', navKey = 'home', title = '아빠표 백과사전';
  curEntry = null;
  if (r === 'random') { var e = DATA[Math.floor(Math.random() * DATA.length)]; location.replace(eHref(e.t)); return; }
  if (r === 'today') { location.replace(eHref(todayItem().t)); return; }
  if (r === 'c') { html = vCategory(p[1], p[2]); navKey = 'cat'; title = (CAT[p[1]] ? CAT[p[1]].name + ' · ' : '') + title; }
  else if (r === 'e') {
    var en = BY[p[1]];
    if (en) { html = vDetail(en); curEntry = en; bump(en.t); navKey = 'e'; title = en.t + ' · ' + title; }
    else html = empty('없는 이야기예요.');
  }
  else if (r === 'q') { html = vSearch(p[1] || ''); navKey = 'search'; }
  else if (r === 'fav') { html = vFav(); navKey = 'fav'; }
  else if (r === 'az') { html = vAZ(); navKey = 'az'; }
  else if (r === 'kr') { html = vList('우리나라 친구들', '우리나라에서 만날 수 있거나 우리나라와 관련 있어요', DATA.filter(function (e) { return e.kr; }), '🇰🇷'); navKey = 'cat'; }
  else if (r === 'danger') { html = vList('조심! 독·위험', '만지거나 먹으면 안 되는 친구들', DATA.filter(function (e) { return e.danger; }), '⚠️', DANGER_NOTE); navKey = 'cat'; }
  else if (r === 'life') { html = vLife(); navKey = 'cat'; }
  else if (r === 'guide') { html = vGuide(); navKey = 'guide'; }
  else html = vHome();
  stopSpeak();
  app.innerHTML = html;
  document.title = title;
  document.querySelectorAll('.mobile-dock a').forEach(function (a) { a.classList.toggle('is-active', a.dataset.nav === navKey); });
  var y = navByClick ? 0 : (scrollMem[location.hash] || 0);
  navByClick = false;
  window.scrollTo(0, y);
}
window.addEventListener('hashchange', function () { scrollMem[curHash] = window.__lastY || 0; curHash = location.hash; route(); });
window.addEventListener('scroll', function () { window.__lastY = window.scrollY; }, { passive: true });
document.addEventListener('click', function (ev) {
  var a = ev.target.closest('a[href^="#/"]');
  if (a) navByClick = true;
});

/* ===== 동작 ===== */
function stopSpeak() { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); speaking = false; }
function listen() {
  if (!curEntry || !('speechSynthesis' in window)) { toast('이 기기에서는 소리 읽기를 쓸 수 없어요.'); return; }
  if (speaking) { stopSpeak(); toast('읽기를 멈췄어요.'); return; }
  var u = new SpeechSynthesisUtterance(curEntry.t + '. ' + curEntry.one + ' ' + curEntry.pts.join(' '));
  u.lang = 'ko-KR'; u.rate = 0.9;
  u.onend = u.onerror = function () { speaking = false; };
  speaking = true; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);
  toast('읽어 줄게요. 다시 누르면 멈춰요.');
}
function share() {
  if (!curEntry) return;
  var url = location.href, text = curEntry.t + ' — ' + curEntry.one;
  if (navigator.share) { navigator.share({ title: curEntry.t, text: text, url: url }).catch(function () {}); return; }
  if (navigator.clipboard) { navigator.clipboard.writeText(text + ' ' + url).then(function () { toast('링크를 복사했어요.'); }, function () { toast('복사할 수 없어요.'); }); }
  else toast('주소창의 링크를 복사해 주세요.');
}
function voice() {
  var R = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!R) { toast('이 브라우저에서는 말로 찾기를 지원하지 않아요.'); return; }
  var r = new R(); r.lang = 'ko-KR'; r.interimResults = false; r.maxAlternatives = 1;
  r.onresult = function (ev) {
    var s = ev.results[0][0].transcript.replace(/[?.!]/g, '').trim();
    if (s) { navByClick = true; location.hash = '#/q/' + enc(s); }
  };
  r.onerror = function () { toast('잘 못 들었어요. 한 번 더 말해 볼까?'); };
  try { r.start(); toast('듣고 있어요…'); } catch (e) { /* 이미 듣는 중 */ }
}
function setTheme() {
  var root = document.documentElement, next = root.dataset.theme === 'night' ? '' : 'night';
  if (next) root.dataset.theme = next; else delete root.dataset.theme;
  var b = document.getElementById('themeToggle');
  b.textContent = next ? '☀' : '☾'; b.setAttribute('aria-pressed', String(!!next));
  b.setAttribute('aria-label', next ? '밝은 모드로 바꾸기' : '밤하늘 모드로 바꾸기');
  try { localStorage.setItem('abba-theme', next); } catch (e) { /* 저장 못 해도 괜찮아요 */ }
}

document.addEventListener('submit', function (ev) {
  if (!ev.target.matches('[data-search]')) return;
  ev.preventDefault();
  var v = ev.target.querySelector('input').value.trim();
  if (!v) { toast('궁금한 말을 하나 적어 볼까?'); return; }
  navByClick = true; location.hash = '#/q/' + enc(v);
});
document.addEventListener('click', function (ev) {
  var b = ev.target.closest('[data-action],[data-az]');
  if (!b) return;
  if (b.dataset.az) { var t = document.getElementById('az-' + b.dataset.az); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
  var a = b.dataset.action;
  if (a === 'toggle-theme') setTheme();
  else if (a === 'listen') listen();
  else if (a === 'share') share();
  else if (a === 'voice') voice();
  else if (a === 'fav' && curEntry) {
    var on = toggleFav(curEntry.t);
    b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on));
    b.textContent = on ? '♥ 보물함에 있어요' : '♡ 보물함에 담기';
    toast(on ? '보물함에 담았어요 ♡' : '보물함에서 뺐어요.');
  }
});

(function init() {
  try { history.scrollRestoration = 'manual'; } catch (e) { /* 지원 안 되면 그대로 */ }
  var b = document.getElementById('themeToggle');
  if (document.documentElement.dataset.theme === 'night') { b.textContent = '☀'; b.setAttribute('aria-pressed', 'true'); b.setAttribute('aria-label', '밝은 모드로 바꾸기'); }
  curHash = location.hash;
  route();
})();
})();
