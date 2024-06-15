import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/word_paste.min.js";
import "froala-editor/js/plugins/table.min.js";
import "froala-editor/js/plugins/track_changes.min.js";
import "froala-editor/js/plugins/special_characters.min.js";
import "froala-editor/js/plugins/paragraph_style.min.js";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/line_height.min.js";
import "froala-editor/js/plugins/line_breaker.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
const MyEditor = ({ editorState, setEditorState }) => {

    const config = {
        placeholderText: "Edit Your Content Here!",
        charCounterCount: false,
        tooltips: false,
        attribution: false
    }

    return (
        <div id="editor">
            <FroalaEditor
                tag="textarea"
                config={config}
                model={editorState}
                onModelChange={setEditorState}

            />
        </div>
    )
}
export default MyEditor