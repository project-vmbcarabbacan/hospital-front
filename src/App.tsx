import React, { useRef } from 'react';
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './presentation/pages/Login';
import Main from './presentation/pages/Main';
import { currentUser } from './app/store/slices/authSlice';
import { ProtectedRoute } from './presentation/routes/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './app/store/hooks';
import { selectThemeSettings } from './app/store/theme/themeSelectors';
import { createMuiThemeFromSettings } from './core/theme/ThemeFactory';
import { ThemeProvider } from '@emotion/react';
// import { loadTheme } from './app/store/slices/themeSlice';


const App: React.FC = () => {
  const dispatch = useDispatch()
  const hasDispatched = useRef(false)

  const { is_rendered, is_auth } = useAppSelector(state => state.auth)
  const settings = useAppSelector(selectThemeSettings)

  useEffect(() => {
    if (!hasDispatched.current) {
      hasDispatched.current = true
      dispatch(currentUser())
      // dispatch(loadTheme())
    }
  }, [dispatch])

  const myTheme = createMuiThemeFromSettings(settings)

  if (!is_rendered)
    return <div>Loading...</div>



  return (
    <ThemeProvider theme={myTheme}>
      <BrowserRouter>
        <Routes>
          {!is_auth ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Main />
                  </ProtectedRoute>
                }
              />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;