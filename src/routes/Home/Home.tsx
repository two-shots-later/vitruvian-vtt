import { Link } from "react-router-dom"
import EntityTableGroup from "../../components/entityTable/EntityTableGroup"
import EntityTable from "../../components/entityTable/EntityTable"
import { Entity } from "../../types/gen/Entity"
import { filterEntities } from "../../common/entity"
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
    Damage: "D6"
  },
  {
    Name: "Jane Doe",
    Damage: "D6"
  },
  {
    Name: "Jane Doe",
    Damage: "D6"
  },
  {
    Name: "Jane Doe",
    Damage: "D6"
  },
  {
    Name: "Jane Doe",
    Damage: "D6"
  },
  {
    Name: "Jane Doe",
    Damage: "D6"
  },
  {
    Name: "Jane Doe",
    Damage: "D6"
  }
]

const Home = () => {
  
  const filtered = filterEntities(exampleEntities, [], "Name", "Damage");
  
  return (
    <div>
      <h1>Home</h1>
      <p>Home page content</p>
      <Link to='/component-lib'>Go to Component Lib</Link>
      <EntityTableGroup entities={exampleEntities} tableName="Test Table" className="h-[400px]">
        <EntityTable
          archetype={["Name"]}
          icon="gear" 
          label="Named Entities" 
          headerLabels={{Name : "Specific Name"}}
        />
        <EntityTable label="Damage Entities" icon="d20" archetype={["Damage"]} />
        <EntityTable label="Both" icon="warning" archetype={["Name", "Damage"]} 
          renderFunctions={{
            Name : (name : string) => <span className="text-theme-accent">{name}</span>,
            Damage : (damage : Damage) => <span className="text-red-200">{damage}</span>
          }}
        />
      </EntityTableGroup>
      <EntityTable icon="filter" label="Sorted" data={filtered} archetype={["Name", "Damage"]} className="h-[200px]"/>
    </div>
  )
}

export default Home