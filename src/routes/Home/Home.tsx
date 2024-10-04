import { Link } from "react-router-dom"
import EntityTableGroup from "../../components/entityTable/EntityTableGroup"
import EntityTable from "../../components/entityTable/EntityTable"
import { Entity } from "../../types/gen/Entity"
import { filterEntities } from "../../common/entity"
import { Damage } from "../../types/gen/Damage"
import EntityTableHeader from "../../components/entityTable/EntityTableHeader"

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
        <EntityTable icon="filter" label="Sorted" data={exampleEntities}>
          <EntityTableHeader component="Name" hug/>
          <EntityTableHeader 
            component="Damage" 
            renderer={damage => <div className="text-red-500">{damage}</div>}
          />
        </EntityTable>
          <EntityTable icon="filter" label="Sorted" data={exampleEntities}>
            <EntityTableHeader component="Name" hug/>
            <EntityTableHeader 
              component="Damage" 
              renderer={damage => <div className="text-red-500">{damage}</div>}
            />
          </EntityTable>
            <EntityTable icon="filter" label="Sorted" data={exampleEntities}>
              <EntityTableHeader component="Name" hug/>
              <EntityTableHeader 
                component="Damage" 
                renderer={damage => <div className="text-red-500">{damage}</div>}
              />
            </EntityTable>
      </EntityTableGroup>
      <EntityTable icon="filter" label="Sorted" data={exampleEntities} className="h-[150px]">
        <EntityTableHeader component="Name"/>
        <EntityTableHeader 
          component="Damage" 
          renderer={damage => <div className="text-red-500">{damage}</div>}
        />
      </EntityTable>
    </div>
  )
}

export default Home