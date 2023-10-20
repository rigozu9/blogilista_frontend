const Notification = ({ message, type }) => {
  if (!message) {
    return null
  }

  return (
    <div className={type ? 'success' : 'error'}>
      {message}
    </div>
  )
}

export default Notification