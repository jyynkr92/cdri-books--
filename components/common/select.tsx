'use client';

import { Select as RadixSelect } from 'radix-ui';
import { ChevronIcon } from '@/components/icon/chevron-icon';
import { cn } from '@/lib/utils';

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
          'border-palette-gray text-caption text-palette-black group flex w-full cursor-pointer items-center justify-between gap-2 border-b bg-transparent py-2 outline-none',
          'data-[state=open]:border-palette-primary focus-visible:border-palette-primary',
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
          sideOffset={4}
          className="border-palette-gray bg-palette-white z-20 overflow-hidden rounded-lg border shadow-lg"
        >
          <RadixSelect.Viewport className="p-1">
            {options.map((option) => (
              <RadixSelect.Item
                key={option.value}
                value={option.value}
                className="text-caption text-text-subtitle data-[highlighted]:bg-palette-light-gray data-[state=checked]:text-palette-black cursor-pointer rounded-sm px-3 py-2 outline-none select-none"
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
