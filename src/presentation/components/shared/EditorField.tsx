import React, { useState } from "react";
import { useEditor } from "@tiptap/react";
import {
    MenuButtonBold,
    MenuButtonItalic,
    MenuButtonUnderline,
    MenuSelectFontFamily,
    MenuButtonSubscript,
    MenuButtonSuperscript,
    MenuButtonStrikethrough,
    MenuButtonHorizontalRule,
    MenuButtonBulletedList,
    MenuButtonOrderedList,
    MenuControlsContainer,
    MenuButtonTextColor,
    MenuButtonHighlightColor,
    MenuButtonEditLink,
    MenuDivider,
    MenuSelectHeading,
    RichTextEditorProvider,
    MenuButtonCodeBlock,
    MenuButtonCode,
    RichTextField,
    MenuButtonUndo,
    MenuButtonRedo,
    MenuButtonIndent,
    MenuButtonUnindent,
    MenuButtonAddTable,
    MenuSelectFontSize,
    MenuSelectTextAlign,
    MenuButtonImageUpload,
    MenuButtonRemoveFormatting,
    LinkBubbleMenu,
    TableBubbleMenu,
    RichTextReadOnly
} from "mui-tiptap";
import { Button, Stack, useTheme } from "@mui/material";
import useExtensions from "../utils/editorExtension";

interface EditorFieldProps {
    value: string | null,
    onSubmit: (newValue: string) => void
}


const EditorField: React.FC<EditorFieldProps> = ({
    value,
    onSubmit
}) => {
    const theme = useTheme()


    const editor = useEditor({
        extensions: useExtensions(),
        content: value,
    });

    const [submittedContent, setSubmittedContent] = useState("");

    const handleSubmit = (editor: string) => {
        setSubmittedContent(editor)
        onSubmit(editor)
    }


    return (
        <>
            <RichTextEditorProvider editor={editor}>
                <RichTextField
                    controls={
                        <MenuControlsContainer>
                            <MenuSelectFontFamily
                                options={[
                                    { label: "Comic Sans", value: "Comic Sans MS, Comic Sans" },
                                    { label: "Cursive", value: "cursive" },
                                    { label: "Monospace", value: "monospace" },
                                    { label: "Serif", value: "serif" },
                                ]}
                            />
                            <MenuSelectHeading />
                            <MenuDivider />
                            <MenuSelectFontSize />

                            <MenuDivider />
                            <MenuButtonBold />
                            <MenuButtonItalic />
                            <MenuButtonUnderline />
                            <MenuButtonStrikethrough />
                            <MenuButtonSubscript />
                            <MenuButtonSuperscript />
                            <MenuDivider />

                            <MenuButtonTextColor
                                defaultTextColor={theme.palette.text.primary}
                                swatchColors={[
                                    { value: "#000000", label: "Black" },
                                    { value: "#ffffff", label: "White" },
                                    { value: "#888888", label: "Grey" },
                                    { value: "#ff0000", label: "Red" },
                                    { value: "#ff9900", label: "Orange" },
                                    { value: "#ffff00", label: "Yellow" },
                                    { value: "#00d000", label: "Green" },
                                    { value: "#0000ff", label: "Blue" },
                                ]}
                            />
                            <MenuButtonHighlightColor
                                swatchColors={[
                                    { value: "#595959", label: "Dark grey" },
                                    { value: "#dddddd", label: "Light grey" },
                                    { value: "#ffa6a6", label: "Light red" },
                                    { value: "#ffd699", label: "Light orange" },
                                    // Plain yellow matches the browser default `mark` like when using Cmd+Shift+H
                                    { value: "#ffff00", label: "Yellow" },
                                    { value: "#99cc99", label: "Light green" },
                                    { value: "#90c6ff", label: "Light blue" },
                                    { value: "#8085e9", label: "Light purple" },
                                ]}
                            />
                            <MenuDivider />

                            <MenuButtonEditLink />
                            <MenuDivider />

                            <MenuSelectTextAlign />
                            <MenuDivider />
                            <MenuButtonOrderedList />
                            <MenuButtonBulletedList />

                            <MenuDivider />

                            <MenuButtonCodeBlock />
                            <MenuButtonCode />
                            <MenuDivider />

                            {/* <MenuButtonImageUpload
                                onUploadFiles={(files) =>

                                    files.map((file) => ({
                                        src: URL.createObjectURL(file),
                                        alt: file.name,
                                    }))
                                }
                            /> */}
                            <MenuDivider />

                            <MenuButtonHorizontalRule />
                            <MenuButtonIndent />
                            <MenuButtonUnindent />
                            <MenuDivider />
                            <MenuButtonAddTable />


                            <MenuDivider />
                            <MenuButtonRemoveFormatting />
                            <MenuDivider />
                            <MenuButtonUndo />
                            <MenuButtonRedo />

                        </MenuControlsContainer>
                    }
                    footer={
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                                borderTopStyle: "solid",
                                borderTopWidth: 1,
                                borderTopColor: (theme) => theme.palette.divider,
                                py: 1,
                                px: 1.5,
                            }}
                        >


                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => {
                                    handleSubmit(editor!.getHTML());
                                }}
                            >
                                Save
                            </Button>
                        </Stack>
                    }
                />

                <LinkBubbleMenu />
                <TableBubbleMenu />

            </RichTextEditorProvider>

            {/* <pre style={{ marginTop: 10, overflow: "auto", maxWidth: "100%" }}>
                <code>{submittedContent}</code>
            </pre>

            <RichTextReadOnly
                content={submittedContent}
                extensions={useExtensions()}
            /> */}
        </>
    )
}

export default EditorField