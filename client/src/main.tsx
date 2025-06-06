import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Error from './pages/Error';
import Wishlist from './pages/Wishlist.js';
import Calendar from './pages/Calendar.js';
import Library from './pages/Library.js';
import Followers from './pages/Followers.js';
import GameCollections from './pages/GameCollections.js';
import Playlist from './pages/Playlist.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/me',
        element: <Profile />,
        children: [
              {
                  path: 'wishlist',
                  element: <Wishlist/>
              }, {
                  path: 'calendar',
                  element: <Calendar month={6} year={2025}/>
              }, {
                  path: 'library',
                  element: <Library/>
              }, {
                  path: 'followers',
                  element: <Followers/>
              }, {
                  path: 'gamecollection',
                  element: <GameCollections/>
              }, {
                  path: 'playlist',
                  element: <Playlist/>
              }
            ],
          }, {
          path: 'profiles/:profileId',
          element: <Profile />,
          children: [
                    {
                      path: 'wishlist',
                      element: <Wishlist/>
                    }, {
                      path: 'calendar',
                      element: <Calendar month={6} year={2025}/>
                    }, {
                      path: 'library',
                      element: <Library/>
                    }, {
                      path: 'followers',
                      element: <Followers/>
                    }, {
                      path: 'gamecollection',
                      element: <GameCollections/>
                    }, {
                      path: 'playlist',
                      element: <Playlist/>
                    }
              ]
        }
    ]
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
