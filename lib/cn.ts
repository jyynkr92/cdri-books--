import { createCn } from 'cn/config';

/**
 * app/globals.css 의 @theme 에서 정의한 폰트 토큰들.
 * tailwind-merge 는 모르는 `text-*` 를 색상으로 간주해 색상 클래스를 지워버린다.
 * (예: `text-caption` 이 `text-palette-white` 를 덮어써 버튼 글자색이 사라졌다)
 * font-size 그룹으로 등록해 색상과 충돌하지 않게 한다.
 *
 * ⚠️ globals.css 에 `--text-*` 토큰을 추가하면 아래 목록에도 반드시 넣는다.
 * 빠뜨려도 빌드와 린트는 통과하고, 그 토큰을 쓴 요소의 색상만 조용히 사라진다.
 */
const FONT_SIZE_TOKENS = [
  'title-1',
  'title-2',
  'title-3',
  'body-1',
  'menu',
  'body-2',
  'body-2-bold',
  'caption',
  'small',
  'count',
  'detail-title',
  'detail-section',
  'detail-body',
  'detail-author',
  'price-label',
];

/** globals.css 의 `--font-weight-*` 커스텀 토큰. font-family 로 오인되지 않게 등록한다. */
const FONT_WEIGHT_TOKENS = ['350'];

export const cn = createCn({
  extend: {
    classGroups: {
      'font-size': [{ text: FONT_SIZE_TOKENS }],
      'font-weight': [{ font: FONT_WEIGHT_TOKENS }],
    },
  },
});
