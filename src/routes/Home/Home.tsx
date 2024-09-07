import { Link } from "react-router-dom"


const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Home page content</p>
      <Link to='/component-lib'>Go to Component Lib</Link>
    </div>
  )
}

export default Home