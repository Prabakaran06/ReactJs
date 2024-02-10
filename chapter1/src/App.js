import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState,useEffect } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';

function App() {
  const [items, setItems] = useState([ {
    id: 1,
    checked: false,
    item: "one half poundbag ofcocoa"
  },
  {
    id: 2,
    checked: true,
    item: "item2   "
  },
  {
    id: 3,
    checked: true,
    item: "item3"
  },
  ])
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] =useState('')
  const[fetchError,setFetchError]=useState(null)
  const [isLoading,setIsLoading]=useState(null)
  
useEffect(()=>{
  const fetchItems = async()=>{
    try{
      const response=await fetch('api')
      if(!response.ok) throw Error(`did not receive`)
      //const listitems =await response.json()
    //setItems(listitems)
    setFetchError(null)
    }
    catch{
      //setFetchError(err.message)
    }
    finally{
      setIsLoading(false)
    }
  }
  setTimeout(()=>{
    (async ()=> await fetchItems ())()
  },2000)
},[])

// useEffect(()=>{
//   setItems(),[items]
// })
//   useEffect(()=>{
//     console.log('update')
//   },[items])

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item }
    const listItems = [...items, myNewItem]
    setItems(listItems)

    // const postOption={
    //   method:'POST',
    //   headers :{
    //     'content-Type':'application/json'
    //   },
    //   body:JSON.stringify(myNewItem)
    // }
    // const result = await apiRequest(API_URL,postOption)
    // if(result) setFetchError(result)
    
  }

  const handleCheck =async (id) => {
    const listItems = items.map((item) =>
      (item.id === id ? { ...item, checked: !item.checked } : (item)))
    setItems(listItems)
  
  const myItem =listItems.filter((item)=>item.id===id)
  const updateOptiion ={
    method:'PATCH',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({checked:myItem[0].checked})
  }
 // const reqUrl =`${API_URL}/${id}`
  // const result =await apiRequest({reqUrl,updateOptions})
  // if (result) setFetchError(result)
}


  const handleDelete =  async (id) => {
    const listItems = items.filter((item) => (item.id !== id))
    setItems(listItems)
   
    const deleteOption ={
      method : 'Delete'
    }
    // reqUrl =`${API_URL}/${id}`
    // const result =await apiRequest(reqUrl,deleteOption)
    // if (result) setFetchError(result)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newItem) return
    addItem(newItem)
    setNewItem('')

  }

  return (
    <div className="App">
      <Header />
      <SearchItem 
      search={search}
      setSearch={setSearch} />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <>
      {isLoading && <p>Loading Item..</p>}
      {fetchError && <p style={{color:'red'}}>{`Error :${fetchError}`}</p>}
      {!fetchError && !isLoading &&
      <Content
        items={items.filter(item=> ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        setItems={setItems}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
    }
      </>
      <Footer
        length={items.length} />
    </div>
  );
}

export default App;
