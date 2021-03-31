import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import routes from '@/router'
import 'antd/dist/antd.less'

function App() {
  return <Router>
    <Switch>
      {
        routes.map(route =>
          <Route exact key={route.path} path={route.path} component={route.component} />
        )
      }
    </Switch>
  </Router>
}

export default App
