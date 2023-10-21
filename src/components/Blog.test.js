import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('Blog testing', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Man',
    url: 'www.test.com',
    likes: 420,
    user: {
      username: 'testerman',
      name: 'Riku',
    }
  }

  let container

  beforeEach(() => {
    container = render(
      <Blog
        key={blog.id}
        blog={blog}
        username={blog.user.username}
      />
    )
  })

  test('title by author renders', async () => {
    const titleAndAuthor = screen.getByText(`${blog.title} by ${blog.author}`)
    const url = screen.getByText(blog.url)
    const likes = await screen.findByText(`Likes: ${blog.likes}`)

    expect(titleAndAuthor).toBeDefined()
    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()
  })
})