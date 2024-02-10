
import ItemList from './ItemList'

const Content = ({items,setItems,handleCheck,handleDelete}) => {
  
    return (
        <>
            {items.length?(
          <ItemList 
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          />
           ):(<p style={{marginTop:'2rem'}}>there is noting</p>)}
        </>
    )
}
export default Content