import React, { useRef } from 'react';
import {
    Bold, Italic, Underline, List, Link as LinkIcon,
    AlignLeft, AlignCenter, AlignRight, Code as CodeIcon
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ToolbarButton = ({ icon: Icon, onClick, active }) => (
    <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
            "h-7 w-7 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded",
            active && "bg-slate-200 text-slate-900"
        )}
        onClick={onClick}
    >
        <Icon size={14} />
    </Button>
);

const Separator = () => (
    <div className="w-px h-4 bg-slate-300 mx-1" />
);

const TextEditor = ({
    value,
    onChange,
    placeholder,
    className,
    rows = 5,
    ...props
}) => {
    const textareaRef = useRef(null);

    const applyFormat = (format) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end) || "text";

        let prefix = "";
        let suffix = "";

        switch (format) {
            case 'bold':
                prefix = "**";
                suffix = "**";
                break;
            case 'italic':
                prefix = "_";
                suffix = "_";
                break;
            case 'underline':
                prefix = "<u>";
                suffix = "</u>";
                break;
            case 'code':
                if (selectedText.includes('\n')) {
                    prefix = "```\n";
                    suffix = "\n```";
                } else {
                    prefix = "`";
                    suffix = "`";
                }
                break;
            case 'list':
                prefix = "\n- ";
                suffix = "";
                break;
            case 'link': {
                const rawSelected = value.substring(start, end);

                // Check if selected text looks like a URL
                const looksLikeUrl = /^(https?:\/\/|www\.)|(\.[a-z]{2,}(\/|$))/i.test(rawSelected);

                let insertText;
                let selectStart, selectEnd;

                if (looksLikeUrl && rawSelected) {
                    // Selected text IS a URL → use Markdown autolink format <url> (clean, no repetition)
                    insertText = `<${rawSelected}>`;
                    selectStart = start + insertText.length;
                    selectEnd = selectStart;
                } else {
                    // Selected text is regular text (or empty) → use as display text, placeholder for URL
                    const linkText = rawSelected || "link text";
                    insertText = `[${linkText}](url)`;
                    // Auto-select "url" so user can immediately type the URL
                    selectStart = start + linkText.length + 3; // after "[linkText]("
                    selectEnd = selectStart + 3; // length of "url"
                }

                const newValue = value.substring(0, start) + insertText + value.substring(end);
                onChange({ target: { value: newValue } });

                setTimeout(() => {
                    textarea.focus();
                    textarea.setSelectionRange(selectStart, selectEnd);
                }, 0);
                return;
            }
            default:
                return;
        }

        const newValue = value.substring(0, start) + prefix + selectedText + suffix + value.substring(end);
        onChange({ target: { value: newValue } });

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + prefix.length, end + prefix.length);
        }, 0);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const textarea = textareaRef.current;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            // Get current line up to cursor
            const valueBeforeCursor = value.substring(0, start);
            const currentLineStart = valueBeforeCursor.lastIndexOf('\n') + 1;
            const currentLine = valueBeforeCursor.substring(currentLineStart);

            // Regex to match list pattern: indentation + (bullet or number) + space
            // Matches: "- ", "* ", "1. ", "10. "
            const listMatch = currentLine.match(/^(\s*)([-*]|\d+\.)\s/);

            if (listMatch) {
                // If text is selected (range), standard Enter behavior might be safer or need complex handling.
                // For simplicity, we only auto-list if cursor is collapsed (selectionStart === selectionEnd)
                // or we just overwrite selection. Let's overwrite.

                e.preventDefault(); // Prevent default newline

                const [fullMatch, indent, marker] = listMatch;

                // Case 1: Empty list item (User pressed Enter on a line with just "- ")
                // Action: Remove the list marker (End list)
                if (currentLine.trim() === fullMatch.trim()) {
                    // Remove the current line's content (the marker)
                    const newValue = value.substring(0, currentLineStart) + value.substring(end);
                    onChange({ target: { value: newValue } });

                    setTimeout(() => {
                        textarea.selectionStart = currentLineStart;
                        textarea.selectionEnd = currentLineStart;
                    }, 0);
                    return;
                }

                // Case 2: Content exists, create next list item
                let nextMarker = marker;
                // Check if it's a number
                if (/^\d+\.$/.test(marker)) {
                    const num = parseInt(marker);
                    nextMarker = `${num + 1}.`;
                }

                const insertion = `\n${indent}${nextMarker} `;
                const newValue = value.substring(0, start) + insertion + value.substring(end);

                onChange({ target: { value: newValue } });

                setTimeout(() => {
                    const newCursorPos = start + insertion.length;
                    textarea.selectionStart = newCursorPos;
                    textarea.selectionEnd = newCursorPos;
                }, 0);
            }
        }
    };

    return (
        <div className={cn(
            "border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all bg-white relative",
            className
        )}>
            {/* Toolbar */}
            <div className="bg-slate-50 border-b border-slate-200 p-1 flex items-center gap-0.5 sticky top-0 z-10 overflow-x-auto">
                <ToolbarButton icon={Bold} onClick={() => applyFormat('bold')} />
                <ToolbarButton icon={Italic} onClick={() => applyFormat('italic')} />
                <ToolbarButton icon={Underline} onClick={() => applyFormat('underline')} />
                <Separator />
                <ToolbarButton icon={CodeIcon} onClick={() => applyFormat('code')} />
                <Separator />
                <ToolbarButton icon={List} onClick={() => applyFormat('list')} />
                <ToolbarButton icon={LinkIcon} onClick={() => applyFormat('link')} />
                <Separator />
                {/* Visual only alignment buttons - since Markdown alignment is not standard for plain text block */}
                <ToolbarButton icon={AlignLeft} />
                <ToolbarButton icon={AlignCenter} />
                <ToolbarButton icon={AlignRight} />
            </div>

            <Textarea
                ref={textareaRef}
                rows={rows}
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none shadow-none focus-visible:ring-0 resize-none p-4 text-base min-h-[100px] leading-relaxed rounded-none focus-visible:outline-none font-sans"
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
};

export { TextEditor };
