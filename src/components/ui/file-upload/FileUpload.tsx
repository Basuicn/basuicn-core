import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';
import { Upload, X, FileIcon, ImageIcon, FileText, FileArchive, Pencil } from 'lucide-react';

// ─── Variants ────────────────────────────────────────────────────────────────

const fileUploadVariants = tv({
  slots: {
    root: 'flex flex-col gap-3',
    dropzone: [
      'relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed',
      'cursor-pointer transition-all duration-200',
      'hover:border-primary/50 hover:bg-primary/5',
    ].join(' '),
    fillPreview: [
      'relative overflow-hidden rounded-xl border border-border group',
      'cursor-pointer transition-all duration-200',
    ].join(' '),
    fillImage: 'w-full h-full object-cover',
    fillOverlay: [
      'absolute inset-0 flex flex-col items-center justify-center gap-1',
      'bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity',
    ].join(' '),
    fillRemoveBtn: [
      'absolute top-2 right-2 z-10 p-1.5 rounded-md bg-black/60 text-white',
      'hover:bg-danger transition-colors opacity-0 group-hover:opacity-100',
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
      sm: { dropzone: 'px-4 py-6 text-xs', fillPreview: 'h-32 text-xs' },
      md: { dropzone: 'px-6 py-10 text-sm', fillPreview: 'h-48 text-sm' },
      lg: { dropzone: 'px-8 py-14 text-base', fillPreview: 'h-64 text-base' },
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
  /** Hiển thị preview thumbnail cho file ảnh */
  showPreview?: boolean;
  /** Kiểu preview: 'thumbnail' hiển thị trong danh sách, 'fill' lấp đầy khung dropzone (chỉ dùng cho single image) */
  previewVariant?: 'thumbnail' | 'fill';
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
      showPreview = false,
      previewVariant = 'thumbnail',
      size = 'md',
      className,
      children,
    },
    ref,
  ) => {
    const [isDragActive, setIsDragActive] = React.useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const rootId = React.useId();

    React.useEffect(() => {
      if (!isLightboxOpen) return;
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsLightboxOpen(false);
      };
      document.addEventListener('keydown', onKey);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', onKey);
        document.body.style.overflow = prevOverflow;
      };
    }, [isLightboxOpen]);

    const previews = React.useMemo(() => {
      if (!showPreview) return new Map<File, string>();
      const map = new Map<File, string>();
      for (const file of value) {
        if (file.type.startsWith('image/')) {
          map.set(file, URL.createObjectURL(file));
        }
      }
      return map;
    }, [value, showPreview]);

    React.useEffect(() => {
      return () => {
        previews.forEach((url) => URL.revokeObjectURL(url));
      };
    }, [previews]);

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

    const isFillMode = showPreview && previewVariant === 'fill';
    const fillFile = isFillMode ? value.find((f) => f.type.startsWith('image/')) : undefined;
    const fillUrl = fillFile ? previews.get(fillFile) : undefined;

    return (
      <div ref={ref} className={cn(styles.root(), className)}>
        {label && (
          <label htmlFor={rootId} className="text-sm font-medium text-foreground leading-none">
            {label}
          </label>
        )}

        {isFillMode && fillUrl ? (
          <div
            className={styles.fillPreview()}
            onClick={() => !disabled && setIsLightboxOpen(true)}
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
            <img src={fillUrl} alt={fillFile?.name} className={styles.fillImage()} />
            <div className={styles.fillOverlay()}>
              <ImageIcon className="h-6 w-6" />
              <p className="text-sm font-medium">Nhấn để xem ảnh</p>
            </div>
            <div className="absolute top-2 right-2 z-10 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!disabled) inputRef.current?.click();
                }}
                className="p-1.5 rounded-md bg-black/60 text-white hover:bg-primary transition-colors"
                aria-label="Change image"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (fillFile) removeFile(value.indexOf(fillFile));
                }}
                className="p-1.5 rounded-md bg-black/60 text-white hover:bg-danger transition-colors"
                aria-label={`Remove ${fillFile?.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
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
        )}

        {error && (
          <p className="text-[0.8rem] font-medium text-danger">{error}</p>
        )}

        {isFillMode && fillUrl && isLightboxOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in"
            onClick={() => setIsLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={fillFile?.name}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={fillUrl}
              alt={fillFile?.name}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {!isFillMode && value.length > 0 && (
          <div className={styles.fileList()}>
            {value.map((file, i) => {
              const Icon = getFileIcon(file.type);
              const previewUrl = previews.get(file);
              return (
                <div key={`${file.name}-${i}`} className={styles.fileItem()}>
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt={file.name}
                      className="h-10 w-10 shrink-0 rounded-lg object-cover border border-border"
                    />
                  ) : (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
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

export { FileUpload };
