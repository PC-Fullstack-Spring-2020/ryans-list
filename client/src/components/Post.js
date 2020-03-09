import React, { useEffect } from "react"
import { usePosts } from "../hooks"

export default props => {
  const { get, post } = usePosts()

  useEffect(() => {
    get(props.match.params.id)
  }, [props.match.params])

  return (
    <div>
      <p>Name: {post.name}</p>
      <p>Posting: {post.posting}</p>
    </div>
  )
}
