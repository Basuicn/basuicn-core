import { useState, useMemo, useRef, useEffect } from "react";
import { cn } from "@lib/utils/cn";
import { X } from "@components/icons";
import {
    Select,
    Label,
    Button,
    SelectValue,
    Popover,
    ListBox,
    ListBoxItem,
    TagGroup,
    TagList,
    Tag,
    Group,
    DialogTrigger,
    type SelectProps,
    type Key,
    type Selection,
    SearchField,
    Dialog,
    Input
} from "react-aria-components";
import { tv } from "tailwind-variants";

// Định nghĩa cấu trúc của một Option
export interface SelectOption {
    label: string | number;
    value: string | number;
}

// Cấu hình tailwind-variants chung cho Select
const selectStyles = {
    trigger: tv({
        base: "flex items-center justify-between w-full bg-white border border-gray-300 rounded-lg outline-none group",
        variants: {
            variant: {
                primary: "focus:border-primary focus:ring-2 focus:ring-primary/20",
                secondary: "focus:border-secondary focus:ring-2 focus:ring-secondary/20",
                danger: "focus:border-danger focus:ring-2 focus:ring-danger/20",
                success: "focus:border-success focus:ring-2 focus:ring-success/20",
                warning: "focus:border-warning focus:ring-2 focus:ring-warning/20"
            },
            type: {
                custom: "px-4 py-2.5 text-sm hover:bg-gray-50 data-pressed:bg-gray-100 data-disabled:opacity-50 data-disabled:cursor-not-allowed",
                autocomplete: "px-3 py-2.5 hover:border-gray-400 text-sm",
            }
        },
        defaultVariants: {
            variant: "primary",
            type: "custom"
        }
    }),
    groupTrigger: tv({
         base: "group relative flex flex-wrap items-center gap-2 p-1.5 bg-white border border-gray-300 rounded-lg  transition-all focus-within:ring-2",
         variants: {
             variant: {
                 primary: "focus-within:border-primary focus-within:ring-primary/20",
                 secondary: "focus-within:border-secondary focus-within:ring-secondary/20",
                 danger: "focus-within:border-danger focus-within:ring-danger/20",
                 success: "focus-within:border-success focus-within:ring-success/20",
                 warning: "focus-within:border-warning focus-within:ring-warning/20",
             }
         },
         defaultVariants: {
            variant: "primary"
         }
    }),
    listBoxItem: tv({
        base: "group flex items-center justify-between px-3 py-2 text-sm rounded-md outline-none cursor-pointer",
        variants: {
            variant: {
                primary: "data-focused:bg-primary/10 data-focused:text-primary data-selected:bg-primary/10 data-selected:text-primary",
                secondary: "data-focused:bg-secondary/10 data-focused:text-secondary data-selected:bg-secondary/10 data-selected:text-secondary",
                danger: "data-focused:bg-danger/10 data-focused:text-danger data-selected:bg-danger/10 data-selected:text-danger",
                success: "data-focused:bg-success/10 data-focused:text-success data-selected:bg-success/10 data-selected:text-success",
                warning: "data-focused:bg-warning/10 data-focused:text-warning data-selected:bg-warning/10 data-selected:text-warning"
            },
            type: {
                custom: "text-gray-500 transition-colors hover:bg-gray-100 data-selected:font-semibold",
                multi: "text-gray-700",
                autocomplete: "text-gray-700 transition-colors hover:bg-gray-100 data-focused:bg-gray-100 data-selected:font-semibold rounded-lg"
            }
        },
        defaultVariants: {
            variant: "primary",
            type: "custom"
        }
    }),
    icon: tv({
        base: "shrink-0",
        variants: {
            variant: {
                primary: "text-primary",
                secondary: "text-secondary",
                danger: "text-danger",
                success: "text-success",
                warning: "text-warning"
            }
        },
         defaultVariants: {
             variant: "primary"
         }
    }),
    tag: tv({
        base: "flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-md border outline-none",
        variants: {
             variant: {
                primary: "bg-primary/10 text-primary border-primary/20",
                secondary: "bg-secondary/10 text-secondary border-secondary/20",
                danger: "bg-danger/10 text-danger border-danger/20",
                success: "bg-success/10 text-success border-success/20",
                warning: "bg-warning/10 text-warning border-warning/20",
             }
        },
         defaultVariants: {
             variant: "primary"
         }
    }),
    tagButton: tv({
        base: "p-0.5 rounded-full transition-colors outline-none",
        variants: {
            variant: {
               primary: "hover:bg-primary/20",
               secondary: "hover:bg-secondary/20",
               danger: "hover:bg-danger/20",
               success: "hover:bg-success/20",
               warning: "hover:bg-warning/20",
            }
       },
        defaultVariants: {
            variant: "primary"
        }
    }),
    textAction: tv({
        base: "text-xs font-semibold cursor-pointer transition-colors",
        variants: {
            variant: {
               primary: "text-primary hover:opacity-80",
               secondary: "text-secondary hover:opacity-80",
               danger: "text-danger hover:opacity-80",
               success: "text-success hover:opacity-80",
               warning: "text-warning hover:opacity-80",
            }
        },
        defaultVariants: {
             variant: "primary"
        }
    }),
    checkbox: tv({
        base: "w-4 h-4 border rounded flex items-center justify-center transition-colors shrink-0 ml-2",
         variants: {
             variant: {
                primary: "bg-primary border-primary",
                secondary: "bg-secondary border-secondary",
                danger: "bg-danger border-danger",
                success: "bg-success border-success",
                warning: "bg-warning border-warning",
             },
             isSelected: {
                 false: "border-gray-300 bg-white"
             }
         },
         defaultVariants: {
             variant: "primary",
             isSelected: false
         }
    }),
    searchContainer: tv({
        base: "flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full focus-within:ring-2 transition-all focus-within:bg-white",
        variants: {
            variant: {
                 primary: "focus-within:border-primary focus-within:ring-primary/10",
                 secondary: "focus-within:border-secondary focus-within:ring-secondary/10",
                 danger: "focus-within:border-danger focus-within:ring-danger/10",
                 success: "focus-within:border-success focus-within:ring-success/10",
                 warning: "focus-within:border-warning focus-within:ring-warning/10",
            }
        },
        defaultVariants: {
             variant: "primary"
        }
    })
};

// Mở rộng các props mặc định của Select để nhận thêm cấu hình riêng
interface CustomSelectProps<T extends object> extends Omit<SelectProps<T>, "children"> {
    label?: string;
    options: SelectOption[];
    placeholder?: string;
    className?: string; // Để có thể ghi đè CSS wrapper từ bên ngoài
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
}

interface MultiSelectProps {
    label?: string;
    options: SelectOption[];
    placeholder?: string;
    selectedKeys?: Key[];
    onChange?: (keys: Key[]) => void;
    className?: string;
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
}

function CustomSelect<T extends object>({
    label,
    options,
    placeholder = "Vui lòng chọn...",
    className = "",
    variant = 'primary',
    ...props
}: CustomSelectProps<T>) {
    const [selectedKey, setSelectedKey] = useState<Key | null>(props.selectedKey || props.defaultSelectedKey || null);

    const handleSelectionChange = (key: Key | null) => {
        setSelectedKey(key);
        props.onChange?.(key as Key);
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setSelectedKey(null);
        props.onChange?.(null as unknown as Key);
    };

    return (
        <div className={cn(className || "w-full")}>
            <Select
                {...props}
                selectedKey={selectedKey}
                onChange={handleSelectionChange}
                placeholder={placeholder}
                className="flex flex-col gap-1.5"
            >

                {/* Chỉ render Label nếu được truyền vào */}
                {label && (
                    <Label className="text-sm font-medium text-gray-700 cursor-default">
                        {label}
                    </Label>
                )}

                <Button className={selectStyles.trigger({ variant, type: 'custom' })}>
                    <SelectValue className="text-gray-900 truncate data-placeholder:text-gray-500" />
                    <div className="flex items-center gap-1">
                        {selectedKey ? (
                            <div
                                onClick={handleClear}
                                onPointerDown={(e) => e.stopPropagation()}
                                className="p-0.5 cursor-pointer rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors pointer-events-auto"
                                role="button"
                                aria-label="Clear selection"
                            >
                                <X className="w-3.5 h-3.5" />
                            </div>
                        ) : (
                            <span aria-hidden="true" className="pl-1">
                                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        )}

                    </div>
                </Button>

                <Popover className="w-(--trigger-width) bg-white border border-gray-200 rounded-xl shadow-lg entering:animate-in entering:fade-in entering:zoom-in-95 exiting:animate-out exiting:fade-out exiting:zoom-out-95 fill-mode-forwards origin-top">
                    <ListBox
                        items={options}
                        className="p-1.5 outline-none max-h-60 overflow-y-auto"
                    >
                        {(option) => (
                            <ListBoxItem
                                key={option.value}
                                id={option.value}
                                textValue={String(option.label)}
                                className={selectStyles.listBoxItem({ variant, type: 'custom' })}
                            >
                                {({ isSelected }) => (
                                    <>
                                        <span className="truncate">{option.label}</span>
                                        {isSelected && (
                                            <svg className={cn("w-4 h-4", selectStyles.icon({ variant }))} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </>
                                )}
                            </ListBoxItem>
                        )}
                    </ListBox>
                </Popover>
            </Select>
        </div>
    );
}


function MultiSelect({
    label,
    options,
    placeholder = "Chọn nhiều mục...",
    selectedKeys: externalKeys,
    onChange,
    className = "",
    variant = 'primary'
}: MultiSelectProps) {
    const triggerRef = useRef<HTMLDivElement>(null);
    const [triggerWidth, setTriggerWidth] = useState<number>(0);
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(externalKeys || []));
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        if (!triggerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setTriggerWidth((entry.target as HTMLElement).offsetWidth);
            }
        });
        observer.observe(triggerRef.current);
        return () => observer.disconnect();
    }, []);

    const selectedArray = useMemo(() =>
        options.filter(opt => (selectedKeys as Set<Key>).has(opt.value))
        , [selectedKeys, options]);

    const handleSelectionChange = (keys: Selection) => {
        setSelectedKeys(keys);
        if (onChange) {
            onChange(Array.from(keys as Set<Key>));
        }
    };

    const removeKey = (key: Key) => {
        const newKeys = new Set(selectedKeys as Set<Key>);
        newKeys.delete(key);
        handleSelectionChange(newKeys);
    };

    const handleSelectAll = (e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        handleSelectionChange(new Set(options.map(opt => opt.value)));
    };

    const handleClearAll = (e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        handleSelectionChange(new Set());
    };

    return (
        <div className={cn("w-full flex flex-col gap-1.5", className)}>
            {label && (
                <Label className="text-sm font-medium text-gray-700 cursor-default">
                    {label}
                </Label>
            )}

            {/* 👈 Thay <div className="group..."> thành <Group> */}
            <Group aria-label={label || placeholder || "MultiSelect"} ref={triggerRef} className={selectStyles.groupTrigger({ variant })}>

                {selectedArray.length > 0 && (
                    /* 👈 Thêm className="contents" để TagGroup không phá layout flex */
                    <TagGroup aria-label="Selected items" className="contents">
                        <TagList className="flex flex-wrap gap-1.5">
                            {selectedArray.map((item) => (
                                <Tag
                                    key={item.value}
                                    id={item.value}
                                    className={selectStyles.tag({ variant })}
                                >
                                    {item.label}
                                    <Button
                                        aria-label="Xóa"
                                        slot="remove"
                                        onPress={() => removeKey(item.value)}
                                        className={selectStyles.tagButton({ variant })}
                                    >
                                        <X className="w-3 h-3" />
                                    </Button>
                                </Tag>
                            ))}
                        </TagList>
                    </TagGroup>
                )}

                {/* 👈 Điều chỉnh class của Button để nó là Trigger bao phủ phần còn lại */}
                <Button onPress={() => setOpen(!isOpen)} className="flex-1 min-w-[40px] flex items-center justify-between outline-none text-sm min-h-[28px] cursor-pointer">
                    {({ }) => (
                        <>
                            <span className={cn(
                                "truncate",
                                selectedArray.length === 0 ? "text-gray-500" : "opacity-0 w-0"
                            )}>
                                {selectedArray.length === 0 ? placeholder : ""}
                            </span>
                            <svg className={cn("w-4 h-4 text-gray-400 transition-transform ml-auto", isOpen && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </>
                    )}
                </Button>

                {/* Popover phải nằm TRONG thẻ Group */}
                <Popover isOpen={isOpen} onOpenChange={setOpen} triggerRef={triggerRef} style={{ width: triggerWidth ? `${triggerWidth}px` : undefined }} className="bg-white border border-gray-200 rounded-xl shadow-lg entering:animate-in entering:fade-in entering:zoom-in-95 exiting:animate-out exiting:fade-out exiting:zoom-out-95 origin-top z-50 overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between p-2.5 border-b border-gray-100 bg-gray-50/50 shrink-0">
                        <span
                            onClick={handleSelectAll}
                            className={selectStyles.textAction({ variant })}
                        >
                            Chọn tất cả
                        </span>
                        <span
                            onClick={handleClearAll}
                            className="text-xs font-semibold text-gray-500 hover:text-red-500 cursor-pointer transition-colors"
                        >
                            Xóa tất cả
                        </span>
                    </div>
                    <ListBox
                        items={options}
                        selectionMode="multiple"
                        selectedKeys={selectedKeys}
                        onSelectionChange={handleSelectionChange}
                        className="p-1.5 outline-none max-h-60 overflow-y-auto"
                    >
                        {(option) => (
                            <ListBoxItem
                                key={option.value}
                                id={option.value}
                                textValue={String(option.label)}
                                className={selectStyles.listBoxItem({ variant, type: 'multi' })}
                            >
                                {({ isSelected }) => (
                                    <>
                                        <span className={cn(
                                            "truncate",
                                            isSelected && "font-semibold",
                                            isSelected && selectStyles.icon({ variant })
                                        )}>
                                            {option.label}
                                        </span>
                                        <div className={selectStyles.checkbox({ variant, isSelected: isSelected || false })}>
                                            {isSelected && (
                                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                    </>
                                )}
                            </ListBoxItem>
                        )}
                    </ListBox>
                </Popover>
            </Group>
        </div>
    );
}



interface AutocompleteSelectProps {
    label?: string;
    options: SelectOption[];
    placeholder?: string;
    searchPlaceholder?: string;
    selectedKey?: Key | null;
    onChange?: (key: Key | null) => void;
    className?: string;
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
}

function AutocompleteSelect({
    label,
    options,
    placeholder = "No selected items",
    searchPlaceholder = "Search states",
    selectedKey: externalKey,
    onChange,
    className = "",
    variant = 'primary'
}: AutocompleteSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [internalKey, setInternalKey] = useState<Key | null>(null);

    // Hỗ trợ controlled state
    const currentKey = externalKey !== undefined ? externalKey : internalKey;

    // Tìm item đang được chọn để hiển thị ra nút
    const selectedItem = useMemo(() =>
        options.find(opt => opt.value === currentKey),
        [currentKey, options]);

    // Logic lọc danh sách theo từ khóa tìm kiếm
    const filteredOptions = useMemo(() => {
        if (!searchQuery) return options;
        return options.filter(opt =>
            String(opt.label).toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, options]);

    const handleSelectionChange = (keys: Selection) => {
        const key = Array.from(keys)[0] || null;
        setInternalKey(key);
        if (onChange) onChange(key as Key);

        // Chọn xong thì đóng menu và reset search
        setIsOpen(false);
        setSearchQuery("");
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setInternalKey(null);
        if (onChange) onChange(null as unknown as Key);
    };

    return (
        <div className={cn(className || "w-full ")}>
            {label && (
                <Label className="text-sm font-medium text-gray-700 cursor-default">
                    {label}
                </Label>
            )}

            {/* Dùng DialogTrigger để kiểm soát Popover */}
            <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>

                {/* 1. Nút Trigger */}
                <Button className={selectStyles.trigger({ variant, type: 'autocomplete' })}>
                    <span className={cn(
                        "truncate text-sm",
                        selectedItem ? "text-gray-900" : "text-gray-500"
                    )}>
                        {selectedItem ? selectedItem.label : placeholder}
                    </span>

                    <div className="flex items-center gap-1 shrink-0 ml-2">
                        {selectedItem ? (
                            <div
                                onClick={handleClear}
                                onPointerDown={(e) => e.stopPropagation()}
                                className="p-0.5 cursor-pointer rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors pointer-events-auto"
                                role="button"
                                aria-label="Clear selection"
                            >
                                <X className="w-3.5 h-3.5" />
                            </div>
                        ) : (
                            <span aria-hidden="true" className="pl-1">
                                <svg className={cn("w-4 h-4 text-gray-500 transition-transform duration-200", isOpen && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        )}
                    </div>
                </Button>

                {/* 2. Popover tông màu SÁNG, shadow lớn */}
                <Popover className="w-(--trigger-width) bg-white border border-gray-200 rounded-xl shadow-lg entering:animate-in entering:fade-in entering:zoom-in-95 exiting:animate-out exiting:fade-out exiting:zoom-out-95 origin-top overflow-hidden z-50">

                    {/* Bọc bằng Dialog để tùy biến nội dung bên trong */}
                    <Dialog className="outline-none flex flex-col pt-2 pb-1 ">

                        {/* Khu vực thanh Search TÔNG MÀU SÁNG, bo tròn */}
                        <div className="px-2 pb-2 border-b border-gray-100">
                            <SearchField
                                value={searchQuery}
                                onChange={setSearchQuery}
                                aria-label={searchPlaceholder}
                                autoFocus // Tự động focus ô search khi mở menu
                                className="w-full"
                            >
                                <div className={selectStyles.searchContainer({ variant })}>
                                    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <Input
                                        placeholder={searchPlaceholder}
                                        className="bg-transparent border-none outline-none text-sm text-gray-900 w-full placeholder:text-gray-400"
                                    />
                                </div>
                            </SearchField>
                        </div>

                        {/* Danh sách các Options TÔNG MÀU SÁNG */}
                        <ListBox
                            items={filteredOptions}
                            selectionMode="single"
                            selectedKeys={currentKey ? new Set([currentKey]) : new Set([])}
                            onSelectionChange={handleSelectionChange}
                            className="p-1.5 outline-none max-h-[240px] overflow-y-auto"
                            renderEmptyState={() => (
                                <div className="text-center text-sm text-gray-500 py-4 px-3">
                                    Không tìm thấy "{searchQuery}"
                                </div>
                            )}
                        >
                            {(option) => (
                                <ListBoxItem
                                    key={option.value}
                                    id={option.value}
                                    textValue={String(option.label)}
                                    className={selectStyles.listBoxItem({ variant, type: 'autocomplete' })}
                                >
                                    {({ isSelected }) => (
                                        <>
                                            <span className="truncate">{option.label}</span>
                                            {isSelected && (
                                                <svg className={cn("w-4 h-4 shrink-0", selectStyles.icon({ variant }))} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </>
                                    )}
                                </ListBoxItem>
                            )}
                        </ListBox>
                    </Dialog>
                </Popover>
            </DialogTrigger>
        </div>
    );
}

export {
    CustomSelect,
    MultiSelect,
    AutocompleteSelect
}