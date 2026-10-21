'use client';

import { type RefObject, useEffect, useRef } from 'react';

interface Params {
  /**
   * false 면 닫기 동작을 멈춘다.
   * 내부에 자체 dismiss 를 가진 레이어(Radix Select 등)가 열려 있을 때 쓴다.
   */
  isEnabled?: boolean;
  /** 트리거까지 포함하는 바깥 영역 기준 ref */
  ref: RefObject<HTMLElement | null>;
  /** ref 바깥을 눌렀을 때. 포커스는 건드리지 않는다. */
  onPointerOutside: () => void;
  /** Escape 를 눌렀을 때. 보통 트리거로 포커스를 되돌린다. */
  onEscape: () => void;
}

/** 바깥 클릭과 Escape 로 닫는 공통 동작. */
export const useDismiss = ({
  isEnabled = true,
  ref,
  onPointerOutside,
  onEscape,
}: Params) => {
  // 콜백이 매 렌더 새로 만들어져도 리스너를 다시 달지 않는다.
  const handlersRef = useRef({ onPointerOutside, onEscape });

  useEffect(() => {
    handlersRef.current = { onPointerOutside, onEscape };
  }, [onPointerOutside, onEscape]);

  useEffect(() => {
    if (!isEnabled) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (ref.current?.contains(event.target as Node)) return;

      handlersRef.current.onPointerOutside();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // 안쪽 레이어가 이미 처리한 Escape 는 다시 소비하지 않는다.
      if (event.key !== 'Escape' || event.defaultPrevented) return;

      handlersRef.current.onEscape();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEnabled, ref]);
};
