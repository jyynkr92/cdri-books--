/** 저자 목록을 한 줄로 합친다. 저자가 없으면 빈 문자열을 돌려준다. */
export const formatAuthors = (authors: string[]) => authors.join(', ');
