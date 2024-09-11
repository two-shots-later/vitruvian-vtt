import { applyTheme, getTheme} from "../../common/theme";

const ComponentLibrary = () => {  
  return (
    <div>
      <h1>Component Library</h1>
      <p>This page is to show all of the components</p>
      <div className="flex gap-2 p-2">
        <button className="rounded-lg border border-theme-primary p-2" onClick={() => {
          getTheme("red").then((theme) => applyTheme(theme))
        }}>Red Theme</button>
        <button className="rounded-lg border border-theme-primary p-2" onClick={() => {
          getTheme("green").then((theme) => applyTheme(theme))
        }}>Green Theme</button>
      </div>
    </div>
  )
}

export default ComponentLibrary;
