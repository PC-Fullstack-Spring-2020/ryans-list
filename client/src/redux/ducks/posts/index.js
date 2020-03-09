import { useDispatch, useSelector } from "react-redux"
import axios from "axios"

const GET = "posts/GET"

const initialState = {
  post: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET:
      return { ...state, post: action.payload }
    default:
      return state
  }
}

function getPost(id) {
  return dispatch => {
    axios.get("/api/posts/" + id).then(resp => {
      dispatch({
        type: GET,
        payload: resp.data[0]
      })
    })
  }
}

function createPost(slug, name, post, cb) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/post", { slug, name, post })
      .then(resp => {
        resolve(resp.data.id)
      })
      .catch(e => {
        reject()
      })
  })
}

export function usePosts() {
  const dispatch = useDispatch()
  const create = (slug, name, post) => createPost(slug, name, post)
  const get = id => dispatch(getPost(id))
  const post = useSelector(appState => appState.postState.post)

  return { post, create, get }
}
