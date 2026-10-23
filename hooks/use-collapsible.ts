'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * 펼침/접힘 상태와 함께, 열린 적이 있을 때만 내용을 마운트하도록 관리한다.
 * 마운트와 동시에 1fr 로 바꾸면 transition 이 실행되지 않으므로 다음 프레임에 연다.
 */
export const useCollapsible = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const frameRef = useRef<number | null>(null);

  const cancelPendingOpen = () => {
    if (frameRef.current === null) return false;

    cancelAnimationFrame(frameRef.current);
    frameRef.current = null;

    return true;
  };

  useEffect(() => {
    // 언마운트 정리. 헬퍼를 의존성에 넣지 않도록 여기서는 직접 취소한다.
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const toggle = () => {
    // 아직 열리지 않은 "열기 요청" 이 대기 중이면, 그걸 취소하는 것이 곧 닫기다.
    // 여기서 다시 열면 한 프레임 안에 두 번 눌렀을 때 닫히지 않는다.
    if (cancelPendingOpen()) return;

    if (isOpen) {
      setIsOpen(false);
      return;
    }

    setIsMounted(true);
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      setIsOpen(true);
    });
  };

  return { isOpen, isMounted, toggle };
};
