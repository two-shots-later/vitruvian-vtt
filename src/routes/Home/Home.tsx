import { Link } from "react-router-dom"


const Home = () => {
  return (
    <div>
      <h1 className='bg-primary'>Home</h1>
      <p>Home page content</p>
      <Link to='/component-lib'>Go to Component Lib</Link>
    </div>
  )
}

export default Home