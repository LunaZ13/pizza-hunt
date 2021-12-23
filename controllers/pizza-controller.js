const { Pizza } = require('../models');

const pizzaController = {
  // get all pizzas
  getAllPizza(req, res) {
      Pizza.find({})
        .then(pizzaData => res.json(pizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
  },

  // get one pizza by id
  getPizzaById({ params }, res) {
      Pizza.findOne({ _id: params.id })
      .then(pizzaData => {
          // if no pizza is found, send 404
          if (!pizzaData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
          }
          res.json(pizzaData);
      })
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
      });
  },
  // create pizza
  createPizza({ body }, res ) {
      Pizza.create(body)
        .then(pizzaData => res.json(pizzaData))
        .catch(err => res.status(400).json(err));
  },
  // update pizza by id
  updatePizza({ params, body }, res) {
      Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(pizzaData => {
            if (!pizzaData) {
                res.status(404).json({ message: 'No pizza found with this id' });
                return;
            }
            res.json(pizzaData);
        })
        .catch(err => res.status(400).json(err));
  },
  // delete a pizza
  deletePizza({ params }, res) {
      Pizza.findOneAndDelete({ _id: params.id })
        .then(pizzaData => {
            if (!pizzaData) {
                res.status(404).json({ message: 'No pizza found with this id' });
                return;
            }
            res.json(pizzaData);
        })
        .catch(err => res.status(400).json(err));
  }
};

module.exports = pizzaController;