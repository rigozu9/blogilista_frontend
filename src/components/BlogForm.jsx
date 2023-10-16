import { useState } from 'react'
import blogService from '../services/blogs.js'
import Blog from './Blog'

const BlogForm  = ({ blogs, setBlogs, showSuccessMsg }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const blogObject = await 
      
      blogService
        .create({
          title,
          author,
          url
        })
      setBlogs(blogs.concat(blogObject))
      showSuccessMsg(`a new blog ${ blogObject.title } by ${ blogObject.author } added`)
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
        value={title}
        name="title"
        onChange={({ target }) => {setTitle(target.value)}}
      />
    </div>
    <div>
      author: {}
      <input 
        type="text"
        value={author}
        name="author"
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
      url: {}
      <input 
        type="text"
        value={url}
        name="url"
        onChange={({ target }) => setUrl(target.value)}
      />
    </div>
    <div>
      <button type="submit">create</button>
    </div>
    {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </form>  
  </>
)
}

export default BlogForm