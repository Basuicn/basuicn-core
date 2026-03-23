import { useEffect } from 'react';
import { ModalOverlay, type ModalOverlayProps, Modal as RACModal, Heading } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import * as Icons from '@components/icons';
import Button from '../button/Buton';

export interface ResponsiveWidth {
  xs?: string | number;
  sm?: string | number;
  md?: string | number;
  lg?: string | number;
  xl?: string | number;
  default?: string | number;
}

export interface CustomModalProps extends ModalOverlayProps {
  width?: string | number | ResponsiveWidth;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  showCloseButton?: boolean;
  handleClose: () => void;
  handleConfirm?: () => void;
}

const overlayStyles = tv({
  base: 'fixed z-50 w-screen h-screen bg-black/50 inset-0 flex items-center justify-center text-center backdrop-blur-xs',
  variants: {
    isEntering: {
      true: 'animate-in fade-in duration-200 ease-out'
    },
    isExiting: {
      true: 'animate-out fade-out duration-200 ease-in'
    }
  }
});

const modalStyles = tv({
  base: 'font-sans w-full flex flex-col overflow-hidden rounded-2xl h-[calc(var(--visual-viewport-height)*.9)] bg-white dark:bg-neutral-800/70 dark:backdrop-blur-2xl dark:backdrop-saturate-200 forced-colors:bg-[Canvas] text-left align-middle text-neutral-700 dark:text-neutral-300 shadow-2xl bg-clip-padding border border-black/10 dark:border-white/10 max-w-[var(--modal-w,min(90vw,450px))] sm:max-w-[var(--modal-w-sm,var(--modal-w,min(90vw,450px)))] md:max-w-[var(--modal-w-md,var(--modal-w-sm,var(--modal-w,min(90vw,450px))))] lg:max-w-[var(--modal-w-lg,var(--modal-w-md,var(--modal-w-sm,var(--modal-w,min(90vw,450px)))))] xl:max-w-[var(--modal-w-xl,var(--modal-w-lg,var(--modal-w-md,var(--modal-w-sm,var(--modal-w,min(90vw,450px))))))]',
  variants: {
    isEntering: {
      true: 'animate-in zoom-in-105 ease-out duration-200'
    },
    isExiting: {
      true: 'animate-out zoom-out-95 ease-in duration-200'
    }
  }
});

export function Modal(props: CustomModalProps) {
  const { handleClose, isOpen, width, title, footer, showCloseButton = true, handleConfirm, ...rest } = props;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function: Đảm bảo scroll được khôi phục khi component bị unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const widthStyles = {
    ...(typeof width === 'string' || typeof width === 'number' ? { '--modal-w': typeof width === 'number' ? `${width}px` : width } : {}),
    ...(typeof width === 'object' ? {
      ...(width.default && { '--modal-w': typeof width.default === 'number' ? `${width.default}px` : width.default }),
      ...(width.xs && { '--modal-w': typeof width.xs === 'number' ? `${width.xs}px` : width.xs }),
      ...(width.sm && { '--modal-w-sm': typeof width.sm === 'number' ? `${width.sm}px` : width.sm }),
      ...(width.md && { '--modal-w-md': typeof width.md === 'number' ? `${width.md}px` : width.md }),
      ...(width.lg && { '--modal-w-lg': typeof width.lg === 'number' ? `${width.lg}px` : width.lg }),
      ...(width.xl && { '--modal-w-xl': typeof width.xl === 'number' ? `${width.xl}px` : width.xl }),
    } : {})
  } as React.CSSProperties;
  const getFooter = () => {
    if (footer) {
      return (
        <div className="px-6 py-4 border-t border-black/5 dark:border-white/10 shrink-0 bg-neutral-50/50 dark:bg-neutral-900/20">
          {footer}
        </div>
      )
    }

    else if (footer === null) {
      return null
    }
    else {
      return (
        <div className="px-6 py-4 border-t border-black/5 dark:border-white/10 shrink-0 bg-neutral-50/50 dark:bg-neutral-900/20">
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onPress={handleClose || (() => props.onOpenChange?.(false))}>Hủy</Button>
            <Button variant="primary" size="sm" onPress={handleConfirm}>Xác nhận</Button>
          </div>
        </div>
      )
    }
  }
  return (
    <ModalOverlay isOpen={isOpen} {...rest} className={overlayStyles}>
      <RACModal
        {...rest}
        className={modalStyles}
        style={(renderProps) => ({
          ...widthStyles,
          ...(typeof rest.style === 'function' ? rest.style(renderProps) : rest.style)
        })}
      >
        {(renderProps) => (
          <div className="flex flex-col h-full max-h-full overflow-hidden px-4">
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between py-4 border-b border-black/5 dark:border-white/10 shrink-0 min-h-[64px]">
                <Heading slot="title" className="text-xl font-bold text-neutral-800 dark:text-white truncate pr-4">
                  {title}
                </Heading>
                {showCloseButton && (
                  <Button
                    variant="ghost"
                    size="xs"
                    onPress={() => props.onOpenChange?.(false)}
                    className="rounded-md w-8 h-8 p-0"
                  >
                    <Icons.X className="w-5 h-5 text-neutral-500 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-white" />
                  </Button>
                )}
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-2 scroll-smooth">
              {typeof props.children === 'function' ? props.children(renderProps) : props.children}
            </div>

            <div >
              {getFooter()}
            </div>
          </div>
        )}
      </RACModal>
    </ModalOverlay>
  );
}
