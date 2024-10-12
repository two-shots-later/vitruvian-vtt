import { Link } from "react-router-dom"
import EntityTableGroup from "../../components/entityTable/EntityTableGroup"
import EntityTable from "../../components/entityTable/EntityTable"
import { Entity } from "../../types/gen/Entity"
import EntityTableHeader from "../../components/entityTable/EntityTableHeader"
import Modal from "../../components/Modal"
import { useState } from "react"
import Icon from "../../components/Icon"

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
  
  const [modalActive, setModalActive] = useState(false);
  
  return (
    <div>
      <h1>Home</h1>
      <p>Home page content</p>
      <Link to='/component-lib'>Go to Component Lib</Link>
      <EntityTableGroup entities={exampleEntities} tableName="Test Table" className="h-[400px]">
        <EntityTable icon="filter" label="Sorted" data={exampleEntities}>
          <EntityTableHeader component="Name"/>
          <EntityTableHeader 
            component="Damage" 
            renderer={damage => <div className="text-red-500">{damage}</div>}
          />
        </EntityTable>
          <EntityTable icon="filter" label="Sorted" data={exampleEntities}>
            <EntityTableHeader component="Name"/>
            <EntityTableHeader 
              component="Damage" 
              renderer={damage => <div className="text-red-500">{damage}</div>}
            />
          </EntityTable>
            <EntityTable icon="filter" label="Sorted" data={exampleEntities}>
              <EntityTableHeader component="Name"/>
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
          width="hug"
        />
      </EntityTable>
      <EntityTable icon="filter" label="Sorted" data={exampleEntities} className="h-[150px]">
        <EntityTableHeader component="Name"/>
        <EntityTableHeader 
          component="Damage" 
          renderer={damage => <div className="text-red-500">{damage}</div>}
          width="hug"
        />
      </EntityTable>
      <EntityTable icon="filter" label="Sorted" data={exampleEntities} className="h-[150px]">
        <EntityTableHeader component="Name"/>
        <EntityTableHeader 
          component="Damage" 
          renderer={damage => <div className="text-red-500">{damage}</div>}
          width="hug"
        />
      </EntityTable>
      <button className="h-8 rounded-lg bg-theme-primary" onClick={() => setModalActive(true)}>Open Modal</button>
      <Modal active={modalActive} setActive={setModalActive}>
        {(close) => (
          <div className="w-[80vw] h-[80vh] bg-theme-background rounded-lg border flex justify-center items-center relative">
            <h1 className="text-3xl">Test Modal</h1>
            <button className="absolute top-2 right-2" onClick={close}><Icon variant="info" className="bg-theme-primary fill-theme-primary"/></button>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Home