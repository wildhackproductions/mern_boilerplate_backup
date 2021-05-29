const express = require('express')
const router = express.Router()

const Item = require('../../models/Item')

// @route   GET api/items/test
// @desc    Test item routes are connected
// @access  Public
router.get('/test', async (req, res) => {
  try {
    return res.json({test: 'success'})
  } catch (err) {
    return res.json({error: 'err'})
  }
})

// @route   Get api/items
// @desc    Get all items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const items = await Item.find()
    res.json(items)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

// @route   GET api/items/:id
// @desc    Get item by id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const items = await Item.find({ _id: req.params.id })
    res.json(items)
  } catch (err) {
    res.status(500).send(err)
  }
})

// @route   POST api/item
// @desc    Post a new item
// @access  Public
router.post('/', async (req, res) => {
  console.log("In item POST route");
  console.log(req.body);
  try {
    const newItem = new Item({
      name: req.body.name
    })
    const item = newItem.save()
    res.json(item)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

// @route   PUT api/item/:id
// @desc    Update an item
// @access  Public
router.put('/:id', async (req, res) => {

  try {
    const item = await Item.findById(req.params.id)

    console.log(item);

    item.name = req.body.name

    await item.save()

    return res.json(item)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route   DELETE api/item/:id
// @desc    Delete an item
// @access  Public
router.delete('/:id', async (req, res) => {
  console.log("In item delete");
  try {
    const item = await Item.findById(req.params.id)
    item.deleteOne({ _id: req.params.id }).then(
      item => {return res.json(item)}
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
