const setJwtCookie = (token) => {
  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + 30)
  document.cookie = `jwtToken=${token}; path=/; expires=${expirationDate.toUTCString()}`
}

const getJwtCookie = () => {
  const cookies = document.cookie.split(';')
  const jwtCookie = cookies.find((cookie) =>
    cookie.trim().startsWith('jwtToken=')
  )
  if (jwtCookie) {
    return jwtCookie.split('=')[1]
  }
  return null
}

const useStorage = () => {
  const saveToken = (token, rememberMe) => {
    if (rememberMe) {
      setJwtCookie(token)
    } else {
      sessionStorage.setItem('jwtToken', token)
    }
  }

  const getToken = () => {
    const cookieToken = getJwtCookie('jwtToken')
    if (cookieToken) {
      return cookieToken
    }
    return sessionStorage.getItem('jwtToken')
  }

  const removeToken = () => {
    document.cookie = `jwtToken=; path=/`
    sessionStorage.removeItem('jwtToken')
  }

  return { saveToken, getToken, removeToken }
}

export default useStorage
