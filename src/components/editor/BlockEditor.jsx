import React, { useEffect } from "react";
import {
    useCreateBlockNote,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import "./BlockEditor.css";

const BlockEditor = ({ initialContent, onChange }) => {
    // Initialize the editor
    const editor = useCreateBlockNote();

    // Handle initial content load
    useEffect(() => {
        async function loadInitial() {
            if (editor && initialContent && editor.topLevelBlocks.length <= 1) {
                // Only load if current content is empty (prevents re-loading on every render)
                const isCurrentEmpty = editor.topLevelBlocks.length === 1 &&
                    (editor.topLevelBlocks[0].content === undefined ||
                        (Array.isArray(editor.topLevelBlocks[0].content) && editor.topLevelBlocks[0].content.length === 0));

                if (isCurrentEmpty) {
                    const blocks = await editor.tryParseHTMLToBlocks(initialContent);
                    editor.replaceBlocks(editor.topLevelBlocks, blocks);
                }
            }
        }
        loadInitial();
    }, [initialContent, editor]);

    // Listen for changes and notify parent
    const handleEditorChange = () => {
        // Ensure editor is ready before trying to get content
        if (!editor) {
            return;
        }
        // Generate HTML to pass back to parent
        const saveContent = async () => {
            const html = await editor.blocksToFullHTML(editor.topLevelBlocks);
            if (onChange) {
                onChange(html);
            }
        };
        saveContent();
    };

    return (
        <div className="blocknote-container py-4">
            <BlockNoteView
                editor={editor}
                onChange={handleEditorChange}
                theme="light"
            />
        </div>
    );
};

export default BlockEditor;
