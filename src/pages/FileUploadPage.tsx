import React from 'react';
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase';
import { FileUpload } from '@/components/ui/file-upload/FileUpload';
import { ImageIcon } from 'lucide-react';

const FileUploadPage = () => {
  const [files1, setFiles1] = React.useState<File[]>([]);
  const [files2, setFiles2] = React.useState<File[]>([]);
  const [files3, setFiles3] = React.useState<File[]>([]);
  const [files4, setFiles4] = React.useState<File[]>([]);
  const [files5, setFiles5] = React.useState<File[]>([]);
  const [files6, setFiles6] = React.useState<File[]>([]);
  const [error, setError] = React.useState('');
  const [previewError, setPreviewError] = React.useState('');
  const [fillError, setFillError] = React.useState('');

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="File Upload"
        description="Component tải lên file với drag-and-drop, validation kích thước và loại file."
      />

      {/* ── Basic ──────────────────────────────────────────────────── */}
      <ShowcaseCard
        title="Cơ bản"
        description="Kéo thả hoặc click để chọn file."
      >
        <div className="w-full max-w-md">
          <FileUpload
            value={files1}
            onChange={setFiles1}
            label="Tải lên tài liệu"
            description="PDF, DOC, DOCX — tối đa 10MB"
          />
        </div>
      </ShowcaseCard>

      {/* ── Multiple files ──────────────────────────────────────────── */}
      <ShowcaseCard
        title="Nhiều file"
        description="Cho phép tải nhiều file cùng lúc."
      >
        <div className="w-full max-w-md">
          <FileUpload
            multiple
            maxFiles={5}
            value={files2}
            onChange={setFiles2}
            label="Tải lên hình ảnh"
            description="PNG, JPG, GIF — tối đa 5 file, 5MB/file"
            accept="image/*"
            maxSize={5 * 1024 * 1024}
            onError={setError}
            error={error}
          />
        </div>
      </ShowcaseCard>

      {/* ── Image preview ───────────────────────────────────────────── */}
      <ShowcaseCard
        title="Xem trước hình ảnh"
        description="Bật showPreview để hiển thị thumbnail cho các file ảnh."
      >
        <div className="w-full max-w-md">
          <FileUpload
            multiple
            showPreview
            maxFiles={5}
            value={files5}
            onChange={setFiles5}
            label="Tải lên hình ảnh"
            description="PNG, JPG, GIF — tối đa 5 file, 5MB/file"
            accept="image/*"
            maxSize={5 * 1024 * 1024}
            onError={setPreviewError}
            error={previewError}
          />
        </div>
      </ShowcaseCard>

      {/* ── Fill preview ────────────────────────────────────────────── */}
      <ShowcaseCard
        title="Ảnh fill vào khung"
        description="previewVariant='fill' — ảnh lấp đầy khung dropzone, click để thay đổi."
      >
        <div className="w-full max-w-md">
          <FileUpload
            showPreview
            previewVariant="fill"
            value={files6}
            onChange={setFiles6}
            label="Ảnh bìa"
            description="PNG, JPG — tối đa 5MB"
            accept="image/*"
            maxSize={5 * 1024 * 1024}
            onError={setFillError}
            error={fillError}
          />
        </div>
      </ShowcaseCard>

      {/* ── Sizes ───────────────────────────────────────────────────── */}
      <ShowcaseCard
        title="Kích thước"
        description="Ba kích thước: sm, md, lg."
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <FileUpload
            size="sm"
            value={[]}
            onChange={() => {}}
            label="Small"
          />
          <FileUpload
            size="md"
            value={[]}
            onChange={() => {}}
            label="Medium"
          />
          <FileUpload
            size="lg"
            value={[]}
            onChange={() => {}}
            label="Large"
          />
        </div>
      </ShowcaseCard>

      {/* ── Custom content ──────────────────────────────────────────── */}
      <ShowcaseCard
        title="Tuỳ chỉnh nội dung"
        description="Truyền children để thay đổi giao diện dropzone."
      >
        <div className="w-full max-w-md">
          <FileUpload
            accept="image/*"
            value={files3}
            onChange={setFiles3}
            label="Ảnh đại diện"
          >
            <div className="flex flex-col items-center gap-3 py-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border-2 border-dashed border-primary/30">
                <ImageIcon className="h-7 w-7 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">Chọn ảnh đại diện</p>
                <p className="text-xs text-muted-foreground mt-1">JPG, PNG — tối đa 2MB</p>
              </div>
            </div>
          </FileUpload>
        </div>
      </ShowcaseCard>

      {/* ── Disabled + Error ────────────────────────────────────────── */}
      <ShowcaseCard
        title="Disabled & Error"
        description="Trạng thái vô hiệu và lỗi."
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload
            disabled
            value={[]}
            onChange={() => {}}
            label="Disabled"
            description="Không thể tải lên"
          />
          <FileUpload
            value={files4}
            onChange={setFiles4}
            label="Có lỗi"
            error="File vượt quá kích thước cho phép (10MB)"
          />
        </div>
      </ShowcaseCard>
    </div>
  );
};

export default FileUploadPage;
