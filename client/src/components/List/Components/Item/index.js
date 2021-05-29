import React, {Fragment, useState} from 'react'

const Item = (props) => {
  const [itemData, setItemData] = useState (
    {
      name:'',
      update: false,
      newName: ''
    }
  )

  const onChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value })
    console.log(itemData.newName);
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(e.target);
    props.updateItem(props.item._id, itemData.newName)
    setItemData({ update: false })
  }

  const displayUpdateInput = (item) => {
    return (
      <form onSubmit={() => {props.updateItem(props.item)}}>
        <input
          type="name"
          placeholder="Update Item"
          name="name"
          value={itemData.name}
          onChange={onChange}
        />
      </form>
    )
  }

  const {newName} = itemData

  return (
    <div className="item-list">
      <div>
        {props.item.name}
      </div>
      <div className="item-list-right">
        <div>
          <button onClick={() => {props.deleteItem(props.item._id)}}>Delete</button>
        </div>
        <div>
          {
            itemData.update
            ?
            <div className="new-name-form">
              <div>
                <form onSubmit={onSubmit}>
                  <input
                    type="newName"
                    placeholder="Change Name"
                    name="newName"
                    value={newName}
                    onChange={onChange}
                  />
                  <input type="submit" value="Update Name" />
                </form>
              </div>
              <button onClick={() => {setItemData({update: false})}}>X</button>
            </div>
            :
            <div>
              <button onClick={() => {setItemData({update: true})}}>Update</button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Item
