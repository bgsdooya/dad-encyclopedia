# 아빠표 백과사전

아이는 쉽게, 어른은 자세히 — 궁금한 걸 한곳에서 찾는 백과사전이에요. GitHub Pages로 올리면 바로 열려요.

## 구성

```text
index.html          화면 틀
styles.css          디자인
app.js              검색 · 화면 · 보물함 (분야 목록도 여기 있어요)
data/_core.js       항목 등록 도우미
data/<분야>.js      내용 (animal, plant, body, health, earth, space, science, tech,
                       history, world, korea, math, language, life, safety, culture)
tools/check-data.js 내용 검사
```

## 항목 추가하기

`data/<분야>.js` 맨 아래에 한 줄을 추가해요.

```js
A("분야 id", "소분류", "이모지", "제목", "검색어 (띄어쓰기로)", "한 줄 답 (쉬운 말, 90자 이내)",
  ["꼭 알아둘 것 1", "꼭 알아둘 것 2", "꼭 알아둘 것 3"],
  "왜 그럴까 (아이용 설명)", "어른을 위한 도움말 (정확한 설명, 병원에 가야 할 때 등)",
  { tip: "💡 한마디", kr: true, danger: true, life: 20, lt: "약 15~20년" });
```

- 마지막 `{}` 옵션은 모두 선택이에요: `kr`(우리나라 모아보기), `danger`(독·위험 모아보기), `life`+`lt`(수명 비교).
- 따옴표 안에 큰따옴표(`"`)는 쓰지 말고 ‘ ’ “ ”를 써요.
- 새 분야·소분류를 만들려면 `app.js` 맨 위의 `CATS`에 추가하고, 새 분야 파일은 `index.html`의 `<script>` 목록에도 넣어요.
- 추가 후 `node tools/check-data.js`로 빠진 칸, 중복 제목, 없는 소분류를 확인해요.

## 내 컴퓨터에서 보기

```bash
python3 -m http.server 8000   # 그다음 브라우저에서 http://localhost:8000
```

## 참고

- 보물함(♡)과 최근 본 항목은 이 기기의 브라우저에만 저장돼요.
- 건강·응급처치 내용은 참고용이에요. 아프면 병원에서 확인하세요.
