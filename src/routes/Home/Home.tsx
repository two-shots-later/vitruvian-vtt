import { Link } from "react-router-dom"
import { Table } from "../../components/table/Table"
import TableGroup, { TableGroupRenderFunction } from "../../components/table/TableGroup"
import { Entity } from "../../types/gen/Entity"
import { Archetype, ConcreteEntity } from "../../common/entity"
import { Dice } from "../../types/gen/Dice"
import { Damage } from "../../types/gen/Damage"

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
        <TableGroup label="Damage Entities" icon="d20" archetype={["Damage"]} />
        <TableGroup label="Both" icon="warning" archetype={["Name", "Damage"]} 
          renderFunctions={{
            Name : (name : string) => <span className="text-theme-accent">{name}</span>,
            Damage : (damage : Damage) => <span className="text-red-200">{damage}</span>
          }}
          />
      </Table>
    </div>
  )
}

export default Home