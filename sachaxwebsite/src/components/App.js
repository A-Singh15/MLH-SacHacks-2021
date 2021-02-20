import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import './App.scss'

import Home from './home/home'
import Search from './search/search'


/**
 * ANCHOR: APP
 * 
 */

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


/**
 * ANCHOR: ROUTES
 * 
 */

// {
//   to: '/ourvision',
//   children: <div className='nav-vision'>Our Vision</div>,
//   component: <Solutions />,
//   navbar: true
// },

const routes = [
  {
    to: '/search',
    children: <div className='nav-search'>Search</div>,
    component: <Search />,
    navbar: true
  },
  {
    to: '/',
    children: <div className='nav-home'>Home</div>,
    component: <Home />,
    navbar: true
  }
]


/** 
 * ANCHOR: CUSTOMLINK
*/

export function CustomLink(props) {
  let history = useHistory();

  function handleClick() {
    history.push(props.to);
  }
  return (
    <div {...props}
      onClick={handleClick}
    >
      {props.children}
    </div>
  )
}