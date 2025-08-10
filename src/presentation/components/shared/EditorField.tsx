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



const EditorField: React.FC = () => {
    const theme = useTheme()


    const editor = useEditor({
        extensions: useExtensions(),
        content: "<p>Hello <b>world</b>!</p>",
    });

    const [submittedContent, setSubmittedContent] = useState("");


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

                            <MenuButtonImageUpload
                                onUploadFiles={(files) =>
                                    // For the sake of a demo, we don't have a server to upload the files
                                    // to, so we'll instead convert each one to a local "temporary" object
                                    // URL. This will not persist properly in a production setting. You
                                    // should instead upload the image files to your server, or perhaps
                                    // convert the images to bas64 if you would like to encode the image
                                    // data directly into the editor content, though that can make the
                                    // editor content very large.
                                    files.map((file) => ({
                                        src: URL.createObjectURL(file),
                                        alt: file.name,
                                    }))
                                }
                            />
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
                                    setSubmittedContent(editor!.getHTML());
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