import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
  const mockHandler = jest.fn()

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
  test('upon pressing view more url, likes and username shows', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View More')
    await user.click(button)

    const url = screen.getByText(blog.url)
    const likes = await screen.findByText(`Likes: ${blog.likes}`)
    const username = screen.getByText(`Added by: ${blog.user.username}`)

    expect(url).toBeVisible()
    expect(likes).toBeVisible()
    expect(username).toBeVisible()
  })
//npm run test -- -t 'upon pressing view more url, likes and username shows'
})