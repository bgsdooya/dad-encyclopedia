/* 백과사전 데이터 도우미
   A(분야, 소분류, 이모지, 제목, 검색어, 한 줄 답, [핵심], 왜 그럴까, 어른용, {옵션})
   옵션: tip 💡 / life·lt·ln 수명 / kr 우리나라 / danger 위험 / dsub 위험 분류 */
window.DATA = [];
window.A = function (c, sub, e, t, k, one, pts, why, adult, o) {
  var x = o || {};
  window.DATA.push({
    c: c.split(','), sub: sub ? sub.split(',') : [], e: e, t: t, k: k || '',
    one: one, pts: pts || [], why: why || '', adult: adult || '',
    tip: x.tip || '', life: x.life, lt: x.lt || '', ln: x.ln || '',
    kr: !!x.kr, danger: !!x.danger, dsub: x.dsub || ''
  });
};
