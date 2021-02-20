import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './home/home'


export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

          {routes.map((item, index) => (
            <Route key={index} path={item.to} >
              <>
                {item.component}
                {item.navbar && <NavBar />}
              </>
            </Route>
          ))}

        </Switch>
      </Router>
    </div>
  );
}

function NavBar() {

  return (

    <div className="nav-bar">
      {routes.map((item, index) => (
        item.navbar &&
        <CustomLink key={index} to={item.to} className="nav-item">
          {item.children && item.children}
        </CustomLink>

      ))}

    </div>
  )
}

const routes = [

  {
    to: '/ourvision',
    children: <div className='nav-vision'>Our Vision</div>,
    component: <Solutions />,
    navbar: true
  },
  {
    to: '/about',
    children: <div className='nav-about'>About</div>,
    component: <About />,
    navbar: true
  },
  {
    to: '/login',
    children: <div className='nav-login'>Sign In/ Sign Up</div>,
    component: <Login />,
    navbar: true
  },
  {
    to: '/dashboard',
    component: <Dashboard />,
    navbar: false
  },
  {
    to: '/',
    children: pillrlogo,
    component: <Home />,
    navbar: true
  },
]
