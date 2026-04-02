import { Textarea } from '@/components/ui'
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase'
import React from 'react'

const TextareaPage = () => {
  return (
      <div className="max-w-lg">
        <PageHeader title="Textarea" description="Trường nhập liệu với 3 variant và nhiều trạng thái." />

        <ShowcaseCard title="Variants (default / filled / flushed)">
            <div className="w-full space-y-5">
                <Textarea label="Default" placeholder="Nhập văn bản..." />
                <Textarea variant="filled" label="Filled" placeholder="Nhập văn bản..." />
            </div>
        </ShowcaseCard>

    </div>
  )
}

export default TextareaPage
