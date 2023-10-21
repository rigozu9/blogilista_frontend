import { useState } from 'react'

const BlogForm  = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      createBlog({
        title,
        author,
        url
      })
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      console.error('Error creating blog:', error)
    }
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
      title: {}
          <input
            type="text"
            placeholder= 'title'
            value={title}
            name="title"
            onChange={({ target }) => {setTitle(target.value)}}
          />
        </div>
        <div>
      author: {}
          <input
            type="text"
            placeholder= 'author'
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
      url: {}
          <input
            type="text"
            placeholder = 'url'
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </>
  )
}

export default BlogForm