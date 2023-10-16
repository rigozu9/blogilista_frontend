import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  
  const [message, setMessage] = useState(null)
  const [msgType, setMsgType] = useState(true)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showSuccessMsg = (successMsg) => {
    setMessage(successMsg)
    setMsgType(true)
    setTimeout(() => {setMessage(null)}, 5000)
  }

  const showErrorMsg = (ErrorMsg) => {
    setMessage(ErrorMsg)
    setMsgType(false)
    setTimeout(() => {setMessage(null)}, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <Notification message={message} type={msgType}/>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      
    } catch ({ response }) {
      showErrorMsg(response.data.error)
  }
  }
  
  const addBlog = async (event) => {
    event.preventDefault()
  
    const blogObject = {
      title,
      author,
      url,
    }
  
    try {
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      showSuccessMsg(`a new blog ${ createdBlog.title } by ${ createdBlog.author } added`)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      console.error('Error creating blog:', error)
    }
  }
  

  const blogForm = () => (
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
        <div><button type="submit">create</button></div>
        </form>  
    </>
  )

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.clear()
  } 

  const showBlogs = () => (
    <>
      <h1>blogs</h1>
      <Notification message={message} type={msgType}/>
      <p>
        {user.name} logged in {}
        <button onClick={handleLogOut}>logout</button>
      </p>
      <>{blogForm()}</>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )

  return (
    <>
      {!user ? loginForm() : showBlogs()}
    </>
  )
}

export default App