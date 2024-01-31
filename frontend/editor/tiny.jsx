import React, { useRef, useState, useCallback } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './tiny.css'

export default function TinyMCE(props) {
  const [content, setContent] = useState('')
  const editorRef = useRef(null);
  const {apiKey, csrfToken} = props // Tiny.cloud dashboard
  console.log('csrfToken', csrfToken)
  const handleChange = useCallback(() => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent())
    }
  }, [editorRef])

  const handleSubmit = useCallback(async () => {
    if (editorRef.current) {
      const data = {content: editorRef.current.getContent()}
      const jsonData = JSON.stringify(data)
      const postOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken
        },
        body: jsonData
      }
      const response = await fetch('/landing-pages/create/', postOptions)
      if (response.ok) {
        const newData = await response.json()
        const {id} = newData
        if (id) {
          window.location.href = `/landing-pages/${id}/`
        }
      }
      
    }
  }, [editorRef, csrfToken])

  const handleOnInit = (evt, editor) => {
    editorRef.current = editor
    handleChange()
  }
  return (
    <div className="side-by-side">
    
      <div>
        <Editor
          apiKey={apiKey}
          onEditorChange={handleChange}
          onInit={handleOnInit}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
        <button onClick={handleSubmit}>Save</button>
    </div>
    <div>{content ? <div dangerouslySetInnerHTML={{__html:content}}></div> : null}</div>
  </div>
  );
}