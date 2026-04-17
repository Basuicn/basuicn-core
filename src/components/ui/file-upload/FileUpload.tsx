import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';
import { Upload, X, FileIcon, ImageIcon, FileText, FileArchive } from 'lucide-react';

// ─── Variants ────────────────────────────────────────────────────────────────

const fileUploadVariants = tv({
  slots: {
    root: 'flex flex-col gap-3',
    dropzone: [
      'relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed',
      'cursor-pointer transition-all duration-200',
      'hover:border-primary/50 hover:bg-primary/5',
    ].join(' '),
    fileList: 'flex flex-col gap-2',
    fileItem: [
      'flex items-center gap-3 rounded-lg border border-border bg-background p-3',
      'transition-colors hover:bg-muted/50 group',
    ].join(' '),
    removeBtn: [
      'shrink-0 p-1 rounded-md text-muted-foreground',
      'hover:text-danger hover:bg-danger/10 transition-colors',
      'opacity-0 group-hover:opacity-100',
    ].join(' '),
  },
  variants: {
    size: {
      sm: { dropzone: 'px-4 py-6 text-xs' },
      md: { dropzone: 'px-6 py-10 text-sm' },
      lg: { dropzone: 'px-8 py-14 text-base' },
    },
    isDragActive: {
      true: { dropzone: 'border-primary bg-primary/10 scale-[1.01]' },
      false: { dropzone: 'border-border' },
    },
    isError: {
      true: { dropzone: 'border-danger bg-danger/5' },
    },
    disabled: {
      true: { dropzone: 'opacity-50 cursor-not-allowed hover:border-border hover:bg-transparent' },
    },
  },
  defaultVariants: {
    size: 'md',
    isDragActive: false,
  },
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function getFileIcon(type: string) {
  if (type.startsWith('image/')) return ImageIcon;
  if (type.includes('pdf') || type.includes('document')) return FileText;
  if (type.includes('zip') || type.includes('archive') || type.includes('rar')) return FileArchive;
  return FileIcon;
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface FileUploadProps extends VariantProps<typeof fileUploadVariants> {
  /** Accepted file types (e.g. "image/*,.pdf") */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Max file size in bytes */
  maxSize?: number;
  /** Max number of files */
  maxFiles?: number;
  /** Current files (controlled) */
  value?: File[];
  /** Called when files change */
  onChange?: (files: File[]) => void;
  /** Called on validation error */
  onError?: (message: string) => void;
  /** Disable the dropzone */
  disabled?: boolean;
  /** Error message */
  error?: string;
  /** Label */
  label?: string;
  /** Description */
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

// ─── Component ───────────────────────────────────────────────────────────────

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      accept,
      multiple = false,
      maxSize,
      maxFiles,
      value = [],
      onChange,
      onError,
      disabled = false,
      error,
      label,
      description,
      size = 'md',
      className,
      children,
    },
    ref,
  ) => {
    const [isDragActive, setIsDragActive] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const rootId = React.useId();

    const styles = fileUploadVariants({
      size,
      isDragActive,
      isError: !!error,
      disabled,
    });

    const validateFiles = React.useCallback(
      (fileList: File[]): File[] => {
        const valid: File[] = [];
        for (const file of fileList) {
          if (maxSize && file.size > maxSize) {
            onError?.(`"${file.name}" exceeds ${formatFileSize(maxSize)} limit`);
            continue;
          }
          valid.push(file);
        }
        if (maxFiles && value.length + valid.length > maxFiles) {
          onError?.(`Maximum ${maxFiles} file${maxFiles > 1 ? 's' : ''} allowed`);
          return valid.slice(0, maxFiles - value.length);
        }
        return valid;
      },
      [maxSize, maxFiles, onError, value.length],
    );

    const addFiles = React.useCallback(
      (newFiles: File[]) => {
        const validated = validateFiles(newFiles);
        if (validated.length === 0) return;
        onChange?.(multiple ? [...value, ...validated] : [validated[0]]);
      },
      [validateFiles, onChange, multiple, value],
    );

    const removeFile = React.useCallback(
      (index: number) => {
        const next = [...value];
        next.splice(index, 1);
        onChange?.(next);
      },
      [value, onChange],
    );

    const handleDrop = React.useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragActive(false);
        if (disabled) return;
        const files = Array.from(e.dataTransfer.files);
        addFiles(files);
      },
      [disabled, addFiles],
    );

    const handleDragOver = React.useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        if (!disabled) setIsDragActive(true);
      },
      [disabled],
    );

    const handleDragLeave = React.useCallback(() => {
      setIsDragActive(false);
    }, []);

    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        addFiles(files);
        e.target.value = '';
      },
      [addFiles],
    );

    return (
      <div ref={ref} className={cn(styles.root(), className)}>
        {label && (
          <label htmlFor={rootId} className="text-sm font-medium text-foreground leading-none">
            {label}
          </label>
        )}

        <div
          className={styles.dropzone()}
          onClick={() => !disabled && inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={inputRef}
            id={rootId}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleInputChange}
            disabled={disabled}
            className="sr-only"
          />

          {children ?? (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Upload className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">
                  Drop files here or <span className="text-primary">browse</span>
                </p>
                {description && (
                  <p className="mt-1 text-muted-foreground text-xs">{description}</p>
                )}
              </div>
            </>
          )}
        </div>

        {error && (
          <p className="text-[0.8rem] font-medium text-danger">{error}</p>
        )}

        {value.length > 0 && (
          <div className={styles.fileList()}>
            {value.map((file, i) => {
              const Icon = getFileIcon(file.type);
              return (
                <div key={`${file.name}-${i}`} className={styles.fileItem()}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(i);
                    }}
                    className={styles.removeBtn()}
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);

FileUpload.displayName = 'FileUpload';

export { FileUpload, fileUploadVariants };
