'use client';

import { Select as RadixSelect } from 'radix-ui';
import { ChevronIcon } from '@/components/icon/chevron-icon';
import { cn } from '@/lib/cn';

interface Option<T extends string> {
  value: T;
  label: string;
}

interface Props<T extends string> {
  value: T;
  options: readonly Option<T>[];
  label: string;
  onValueChange: (value: T) => void;
  /** 드롭다운이 열리고 닫힐 때. 바깥 레이어의 dismiss 와 충돌을 막는 데 쓴다. */
  onOpenChange?: (isOpen: boolean) => void;
  className?: string;
  /** Portal 대신 이 컨테이너 안에 펼친다. 팝오버 내부에서 바깥 클릭 판정이 깨지지 않게 한다. */
  container?: HTMLElement | null;
}

export const Select = <T extends string>({
  value,
  options,
  label,
  onValueChange,
  onOpenChange,
  className,
  container,
}: Props<T>) => {
  return (
    <RadixSelect.Root
      value={value}
      onValueChange={onValueChange}
      onOpenChange={onOpenChange}
    >
      <RadixSelect.Trigger
        aria-label={label}
        className={cn(
          'border-palette-gray text-body-2 text-text-primary group flex w-full cursor-pointer items-center justify-between gap-2 border-b bg-transparent py-2 outline-none',
          'data-[state=open]:border-palette-primary focus-visible:border-palette-primary transition-colors duration-150',
          className,
        )}
      >
        <RadixSelect.Value />
        <RadixSelect.Icon asChild>
          {/* data-state 는 Trigger 에 붙으므로 group 으로 받아야 회전한다. */}
          <ChevronIcon className="size-3.5 group-data-[state=open]:rotate-180 motion-safe:transition-transform" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal container={container ?? undefined}>
        <RadixSelect.Content
          position="popper"
          sideOffset={6}
          // trigger 와 같은 너비로 맞춘다.
          className="bg-palette-white shadow-select z-20 w-[var(--radix-select-trigger-width)] overflow-hidden"
        >
          <RadixSelect.Viewport>
            {options.map((option) => (
              <RadixSelect.Item
                key={option.value}
                value={option.value}
                // 이미 선택된 항목은 목록에서 숨긴다. Radix 가 값을 해석하려면 Item 자체는 남아 있어야 한다.
                className="text-body-2 text-text-subtitle data-[highlighted]:bg-palette-light-gray cursor-pointer px-3 py-2 outline-none select-none data-[state=checked]:hidden"
              >
                <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};
