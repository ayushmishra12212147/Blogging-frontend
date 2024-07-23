import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Auth, Editor, Home, Settings } from './Pages'
import axios from 'axios'
import { useEffect } from 'react'
import { AuthRoute, GuestRoute, Navbar } from './components'

const App = () => {
  useEffect(() => {

    const jwt = window.localStorage.getItem('jwtToken');

    if (jwt)  {

    const parsedJwt = JSON.parse(atob(jwt));
    console.log('parsedJwt', { parsedJwt })
    axios.defaults.headers.Authorization = `Token ${parsedJwt.token}`}

  }, []);
  return (
    <Router>
      <div>
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<GuestRoute />}>
              <Route path='/register' element={<Auth key='Register' />} />
            </Route>
            <Route path='/Login' element={<GuestRoute />}>
              <Route path='/Login' element={<Auth key='Login' />} />
            </Route>
            {/* <Route path='/login' element={<h1>login</h1>} /> */}

            <Route path='/settings' element={<AuthRoute />}>
              <Route path='/settings' element={<Settings />} />
            </Route>
            {/* <Route path='/settings' element={<h1>settings</h1>} /> */}
            <Route path='/editor' element={<Editor/>} />
            <Route path='/editor/:slug' element={<h1>editor</h1>} />
            <Route path='/article/:slug' element={<h1>article</h1>} />
            <Route path='/profile/:username' element={<h1>profile</h1>} />
            <Route path='/@:username' element={<AuthRoute />}>
              <Route path='/@:username' element={<h1>profile</h1>} />
            </Route>


          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
