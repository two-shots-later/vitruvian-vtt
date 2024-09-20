import { Link } from "react-router-dom"
import { Table } from "../../components/table/Table"
import TableGroup from "../../components/table/TableGroup"
import { Entity } from "../../types/gen/Entity"

const exampleEntities : Entity[] = [
  {
    Name: "John Doe",
    Damage: "D12"
  },
  {
    Name: "Dilf Laungrin",
    Damage: "D100"
  },
  {
    Name: "Jane Doe",
  },
  {
    Damage: "D6"
  }
]

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Home page content</p>
      <Link to='/component-lib'>Go to Component Lib</Link>
      <Table entities={exampleEntities} tableName="Test Table">
        <TableGroup 
          archetype={["Name"]} 
          disallow={["Damage"]} 
          icon="gear" 
          label="Named Entities" 
          headerLabels={{Name : "Specific Name"}}
        />
        <TableGroup label="Damage Entities" icon="d20" archetype={["Damage"]}/>
        <TableGroup label="Both" icon="warning" archetype={["Name", "Damage"]}/>
      </Table>
    </div>
  )
}

export default Home