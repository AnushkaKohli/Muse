import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blogs from './pages/Blogs';
import Settings from './pages/Settings';
import Editor from './pages/Editor';
import UserBlogs from './pages/UserBlogs';
import Blog from './pages/Blog';
import User from './pages/User';

function App () {
  const isLoggedIn = localStorage.token !== undefined && localStorage.token !== "";
  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route
              path="/signup"
              element={<Signup />} />
            <Route
              path="/signin"
              element={<Signin />} />
            <Route
              path="*"
              element={<Navigate to="/signin" />}
            />
          </>
        ) : (
          <>
            <Route
              path="/"
              element={<Blogs />} />
            <Route
              path="/blogs"
              element={<Blogs />} />
            <Route
              path="/settings"
              element={<Settings />} />
            <Route
              path="/write"
              element={<Editor edit={false} />} />
            <Route
              path="/your-blogs"
              element={<UserBlogs />} />
            <Route
              path="/edit/:id"
              element={<Editor edit={true} />} />
            <Route
              path="/blog/:id"
              element={<Blog />} />
            <Route
              path="/user/:id"
              element={<User />} />
            <Route
              path="*"
              element={<Navigate to="/" />}
            />
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
