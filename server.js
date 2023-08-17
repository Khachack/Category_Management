// Import express
const express = require('express');
require('./db/db');
const Category = require('./model/category.model');

  
    
// Create an instance of express
const app = express();


app.use(express.json());


// Get all categories
app.get('/api/v1/category', async(req, res) => {
    // Find all categories from the database
    const category = await Category.find();
      res.status(200).json(category);
    });
  



// Create a new category
app.post('/api/v1/category', async (req, res) => {
    // Get the data from the request body
    const data = req.body;
    // Create a new category instance with the data
    const category = new Category(data);
    console.log("category:",category)
    // Save the category to the database
    try {
      const savedCategory = await category.save();
      // Send back a success message
      res.json({ msg: 'Category created successfully' });
    } catch (err) {
      // Handle errors
      res.status(500).json({ msg: 'Server error' });
    }
  });



// Get a specific category by id
app.get('/api/v1/category/:id', async(req, res) => {
    // Get the id from the request parameters
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        res.status(200).json(category);
        console.log(category);
      } catch(error) {
        res.status(404).json({ message: error.message});
      }
 });

// Update a specific category by id
app.patch('/api/v1/category/:id', async(req, res) => {
    // Get the id from the request parameters
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
      }
    
      const { id } = req.params;
      await Category.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
          if (!data) {
              res.status(404).send({
                  message: 'Category not found'
              });
          }else{
              res.send({ message: "Category updated successfully." })
          }
      }).catch(err => {
          res.status(500).send({
              message: err.message
          });
      });
    });


// delete category  by id
app.delete('/api/v1/category/:id', async(req, res) => {
    // Get the id from the request parameters
      await Category.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: 'Category not found'
          });
        } else {
          res.send({
            message: "Category deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
  });


// Define a port number
const port = 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});