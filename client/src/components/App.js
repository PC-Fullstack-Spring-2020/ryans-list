import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Home from "./Home"
import Category from "./Category"
import Post from "./Post"
import CreatePost from "./CreatePost"

export default props => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posting/:id" component={Post} />
          <Route exact path="/:slug/create" component={CreatePost} />
          <Route exact path="/:slug" component={Category} />
        </Switch>
      </div>
    </Router>
  )
}
