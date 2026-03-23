import { cn } from '@lib/utils/cn';
import React from 'react'

interface TagProps {
    variant: "primary" | "secondary" | "danger" | "success" | "warning" | "outlinePrimary" | "outlineSecondary" | "outlineDanger" | "outlineSuccess" | "outlineWarning" | "ghostPrimary" | "ghostSecondary" | "ghostDanger" | "ghostSuccess" | "ghostWarning" | "outlineGhostPrimary" | "outlineGhostSecondary" | "outlineGhostDanger" | "outlineGhostSuccess" | "outlineGhostWarning";
    children: React.ReactNode;
}
const Tag = ({ variant, children }: TagProps) => {
    const variantStyle = {
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        danger: "bg-danger text-white",
        success: "bg-success text-white",
        warning: "bg-warning text-white",
        outlinePrimary: "border border-primary text-primary",
        outlineSecondary: "border border-secondary text-secondary",
        outlineDanger: "border border-danger text-danger",
        outlineSuccess: "border border-success text-success",
        outlineWarning: "border border-warning text-warning",
        ghostPrimary: "bg-primary/20 text-primary",
        ghostSecondary: "bg-secondary/20 text-secondary",
        ghostDanger: "bg-danger/20 text-danger",
        ghostSuccess: "bg-success/20 text-success",
        ghostWarning: "bg-warning/20 text-warning",
        outlineGhostPrimary: "border bg-primary/10 text-primary",
        outlineGhostSecondary: "border bg-secondary/10 text-secondary",
        outlineGhostDanger: "border bg-danger/10 text-danger",
        outlineGhostSuccess: "border bg-success/10 text-success",
        outlineGhostWarning: "border bg-warning/10 text-warning",
    }

    return (
        <>
            <div className={cn(variantStyle[variant], "rounded-md px-2 py-1 text-xs w-fit")}>{children}</div>
        </>
    )
}

export default Tag