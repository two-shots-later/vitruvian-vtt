import { ReactElement, Suspense, useState } from "react";
import { getAvailableThemes, getTheme, setCurrentTheme} from "../../common/theme";

const ComponentLibrary = () => {  
  
  const [list, setList] = useState<ReactElement>()
  
  getAvailableThemes().then(themes => {
    let list = themes.map(item => <li>{item}</li>)
    setList(<ul>{list}</ul>)
  })
  
  return (
    <div>
      <h1>Component Library</h1>
      <p>This page is to show all of the components</p>
      <Suspense fallback={<p>loading</p>}>
        {list}
      </Suspense>
      <div className="flex gap-2 p-2">
        <button className="rounded-lg border border-theme-primary p-2" onClick={() => {
          getTheme("red").then((theme) => setCurrentTheme(theme))
        }}>Red Theme</button>
        <button className="rounded-lg border border-theme-primary p-2" onClick={() => {
          getTheme("green").then((theme) => setCurrentTheme(theme))
        }}>Green Theme</button>
      </div>
    </div>
  )
}

export default ComponentLibrary;
