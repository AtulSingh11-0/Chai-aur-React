import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import config from '../../config/config'
import contentStyleCss from './contentStyle.css?inline';

export default function RTE({ name, control, label, defaultValue = '' }) {
  return (
    <div className='w-full'>
      {label && (
        <div className='mb-4'>
          <label className='block text-sm font-semibold text-slate-700 mb-1'>{label}</label>
          <p className='text-xs text-slate-500'>Write your blog content using the rich text editor below</p>
        </div>
      )}
      <Controller
        name={name || 'content'}
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className='rounded-xl overflow-hidden border-2 border-slate-200 hover:border-indigo-300 transition-colors duration-200 shadow-md bg-white'>
            <Editor
              apiKey={config.tinymceApiKey}
              value={value ?? defaultValue}
              cloudChannel='5-stable'
              init={{
                height: 500,
                initialValue: defaultValue,
                menu: {
                  favs: { title: '⭐', items: 'code visualaid | searchreplace | emoticons' }
                },
                menubar: 'favs file edit view insert format tools table help',
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'emoticons'
                ],
                toolbar: 'undo redo | styles | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | link image media | blockquote code | removeformat | help',
                toolbar_mode: 'sliding',
                content_style: contentStyleCss,
                skin: 'oxide',
                icons: 'thin',
                toolbar_sticky: true,
                toolbar_sticky_offset: 0,
              }}
              onEditorChange={onChange}
            />
          </div>
        )}
      />
    </div>
  )
}
