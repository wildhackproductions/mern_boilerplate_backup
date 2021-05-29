import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import StringInput from './Components/StringInput'
import Item from './Components/Item'

const List = () => {

  const [listData, setListData] = useState({
    itemsArray: [],
  })

  useEffect(() => {
    updateItems()
  }, [])

  const updateItems = () => {
    Axios.get("/api/items").then(
      (res) => {
        setListData({itemsArray: res.data})
      }
    )
  }

  const deleteItem = (itemId) => {
    Axios.delete("/api/items/"+itemId).then(
      (res) => {
        updateItems()
      }
    )
  }

  const updateItem = (itemId, newName) => {
    Axios.put("/api/items/"+itemId, { name: newName}).then(
      (res) => {
        updateItems()
      }
    )
  }

  const displayList = () => {
    return listData.itemsArray.map(item => {
      return (
        <Item
          item={item}
          deleteItem={deleteItem}
          updateItem={updateItem}
        />
      )
    })
  }

  return (
    <div>
      <h1>List Component</h1>
      <StringInput
        updateItems={updateItems}
      />
      {displayList()}
    </div>
  )
}

export default List
