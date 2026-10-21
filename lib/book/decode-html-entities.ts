const ENTITY_MAP: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
  '&nbsp;': ' ',
};

/**
 * 카카오 API 의 텍스트에 섞여 오는 HTML 엔티티를 사람이 읽는 문자로 되돌린다.
 * DOM 에 의존하지 않아 서버에서도 동작한다.
 */
export const decodeHtmlEntities = (text: string) =>
  text
    .replace(/&[a-z]+;|&#\d+;/gi, (entity) => {
      const mapped = ENTITY_MAP[entity.toLowerCase()];
      if (mapped) return mapped;

      const numeric = /^&#(\d+);$/.exec(entity);
      if (numeric) return String.fromCharCode(Number(numeric[1]));

      return entity;
    })
    .trim();
