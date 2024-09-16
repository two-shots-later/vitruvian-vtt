import { Link } from "react-router-dom"
import Icon from "../../components/Icon"
import Badge from "../../components/Badge"


const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Home page content</p>
      <Link to='/component-lib'>Go to Component Lib</Link>
      <div className="grid grid-flow-row grid-cols-4 gap-2"> 
        <Badge variant="d20" size={100}/>
        <Badge variant="d12" size={100}/>
        <Badge variant="d10" size={100}/>
        <Badge variant="d8" size={100}/>
        <Badge variant="d6" size={100}/>
        <Badge variant="d4" size={100}/>
        <Badge variant="warning" size={100}/>
        <Badge variant="check" size={100}/>
        <Badge variant="info" size={100}/>
        <Badge variant="user" size={100}/>
        <Badge variant="caret-up" size={100}/>
        <Badge variant="filter" size={100}/>
        <Badge variant="arrow-right" size={100}/>
        <Badge variant="search" size={100}/>
        <Badge variant="pen" size={100}/>
        <Badge variant="gear" size={100}/>
      </div>
    </div>
  )
}

export default Home