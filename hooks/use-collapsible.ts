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

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const toggle = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    setIsMounted(true);
    frameRef.current = requestAnimationFrame(() => setIsOpen(true));
  };

  return { isOpen, isMounted, toggle };
};
