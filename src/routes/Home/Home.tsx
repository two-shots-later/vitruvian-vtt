import { Link } from "react-router-dom"
import Icon from "../../components/Icon"
import Badge from "../../components/Badge"


const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Home page content</p>
      <Link to='/component-lib'>Go to Component Lib</Link>
      <Icon variant="d12" size={100}/>
      <Badge variant="d12" size={100}/>
    </div>
  )
}

export default Home