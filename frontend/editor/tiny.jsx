import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './tiny.css'
import './prism.css'

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
  const defaultTemplate = `<h4 style="text-align: center;">Merge Tags</h4>
  <h1 style="text-align: center;">Hello {{username}}</h1>
  <p>&nbsp;</p>
  <p>{{username}} {{request.build_absolute_uri}} {{request.path}}</p>`

  const templateList = [
    {
      id: '1',
      title: 'My Category',
      items: [
        {
          id: '2',
          title: "Template to use",
          content: defaultTemplate
        }
      ]
    }
  ]

  const handleAdvtemplateList = () => {
    return new Promise((resolve, reject)=>{resolve(templateList)})
  }

  const handleGetTemplate = (id) => {
    const items = templateList[0].items
    const template = items.filter(id=>id)[0]
    // fetch
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(template);
      }, 1000);
    });
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
            mergetags_list: [
              {
                title: 'Django Tags',
                menu: [
                  {
                    value: "username",
                    label: "Django user"
                  },
                  {
                    value: "request.build_absolute_uri",
                    label: "URI"
                  },
                  {
                    value: "request.path",
                    label: "Path"
                  },

                ]
              }

            ],
            advtemplate_list: handleAdvtemplateList,
            advtemplate_get_template: handleGetTemplate,
            plugins: [
              'advlist', 
              'advtemplate', 
              'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'emoticons',
              'tinymcespellchecker',
              'anchor', 'searchreplace', 'visualblocks', 'codesample', 'code', 'fullscreen',
              'insertdatetime', 'media', 'pageembed', 'table', 'help', 'wordcount', 'mergetags'
            ],
            toolbar: 'inserttemplate mergetags code |' + 
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