import { useState, useEffect, useRef } from 'react'

import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

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

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.clear()
  } 

  const handleUsername = ({ target }) => {
    setUsername(target.value)
  }

  const handlePassword = ({ target }) => {
    setPassword(target.value)
  }

  const loginForm = () => (
    <LoginForm 
      handleLogin={handleLogin}
      username={username}
      password={password}
      handleUsername={handleUsername}
      handlePassword={handlePassword}
      message={message}
      type={msgType}
    />
  )

  const blogFormRef = useRef()

  const addBlog = (blogObject) => { 
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        showSuccessMsg(`a new blog ${ returnedBlog.title } by ${ returnedBlog.author } added`)
      })
  }

  const updateLikes = async (id, newBlog) => {
    try {
      const updatedBlog = await blogService.like(id, newBlog)
      const newBlogs = blogs.map(blog => blog.id === id ? updatedBlog : blog)
      setBlogs(newBlogs)
    } catch ({ response }) {
      showErrorMsg(response.data.error)
    } 
  }

  const removeBlog = async id => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      showSuccessMsg('blog deleted succesfully!')
    } catch ({ response }) {
      showErrorMsg(response.data.error)
    } 
  }

  const showBlogs = () => (
    <>
      <h1>blogs</h1>
      <Notification 
        message={message} 
        type={msgType}/>
      <p>
        {user.name} logged in {}
        <button onClick={handleLogOut}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" cancelLabel="cancel" ref={blogFormRef}>
        <BlogForm 
          blogs={blogs}
          setBlogs={setBlogs}
          showSuccessMsg={showSuccessMsg}
          createBlog={addBlog}
        />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog 
            key={blog.id}
            blog={blog}
            updateLikes={updateLikes}
            removeBlog={removeBlog}
            username={user.username}/>)}
    </>
  )

  return (
    <>
      {!user ? loginForm() : showBlogs()}
    </>
  )
}

export default App