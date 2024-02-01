import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './tiny.css'

export default function TinyMCE(props) {
  const [content, setContent] = useState('')
  const [initContent, setInitContent] = useState('')
  const editorRef = useRef(null);
  const {apiKey, csrfToken, objectId} = props // Tiny.cloud dashboard
  const performLookup = useCallback(async (objectId) => {
      const getOptions = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
      const response = await fetch(`/landing-pages/${objectId}/`, getOptions)
      if (response.ok) {
        const newData = await response.json()
        const {content} = newData
        if (content) {
          setInitContent(content)
        }
      }
      
    
  }, [])

  useEffect(()=>{
    if (objectId){
      performLookup(objectId)
    }
  }, [objectId])

  const handleChange = useCallback(() => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent())
    }
  }, [editorRef])

  const handleSubmit = useCallback(async () => {
    if (editorRef.current) {
      const data = {content: editorRef.current.getContent()}
      if (objectId) {
        data['object_id'] = objectId
      }
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
        if (id && !objectId) {
          window.location.href = `/landing-pages/${id}/`
        }
      }
      
    }
  }, [editorRef, csrfToken, objectId])

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
          initialValue={initContent}
          init={{
            height: "80vh",
            menubar: false,
            browser_spellcheck: true,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'emoticons',
              'tinymcespellchecker',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'pageembed', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'pageembed spellcheckdialog emoticons code wordcount | ' + 
            'undo redo | blocks | ' +
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