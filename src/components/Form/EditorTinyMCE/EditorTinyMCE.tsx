import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { tinymceConfig } from './tinymceConfig';
import tinymceApiKey from './tinymceApiKey';
import './styles.css';

interface EditorTinyMCEProps {
    initialValue?: string;
    handleEditorContentChange: (value: string) => void;
    disableBorder?: boolean;
}

const EditorTinyMCE: React.FC<EditorTinyMCEProps> = ({ handleEditorContentChange, disableBorder = false }) => {
    const editorRef = useRef<any>(null); 

    const editorClass = disableBorder ? 'no-border' : '';

    return (
        <div className={editorClass}>
            <Editor
                apiKey={tinymceApiKey}
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={tinymceConfig}
                onEditorChange={(content) => handleEditorContentChange(content)}
            />
        </div>
    );
};

export default EditorTinyMCE;
