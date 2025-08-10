import { useMemo } from "react";
import StarterKit from "@tiptap/starter-kit";
import {
    LinkBubbleMenuHandler,
    TableImproved,
    FontSize,
    ResizableImage,
} from "mui-tiptap";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";
import { Underline } from "@tiptap/extension-underline";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Link } from "@tiptap/extension-link";
import { TextAlign } from "@tiptap/extension-text-align";
import { Placeholder } from "@tiptap/extension-placeholder";


const CustomLinkExtension = Link.extend({
    inclusive: true,
});

export default function useExtensions(
) {
    return useMemo(() => {
        return [
            StarterKit,
            Underline,
            Subscript,
            Superscript,
            FontFamily,
            Color,
            ResizableImage,
            CustomLinkExtension.configure({
                autolink: true,
                linkOnPaste: true,
                openOnClick: false,
            }),
            LinkBubbleMenuHandler,
            Highlight.configure({ multicolor: true }),
            TextAlign.configure({
                types: ["heading", "paragraph", "image"],
            }),
            FontSize,
            TextStyle,
            TableImproved.configure({
                resizable: true,
            }),
            Placeholder.configure({
                placeholder: 'Enter text here',
            }),
            TableRow,
            TableHeader,
            TableCell,
        ];
    }, []);
}
