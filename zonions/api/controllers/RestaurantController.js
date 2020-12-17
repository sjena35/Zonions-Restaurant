/**
 * RestaurantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */




module.exports = {


  /**
   * `RestaurantController.create()`
   * for creating restaurant 
   */
  create: async function (req, res) {
    try {

      let { name, address, opening, closing, phone,menu } = req.allParams();

      if (!name) {
        return res.badRequest({ err: 'title field is required' });
      }

      const restaurantDetail = await RestaurantDetail.create({
        address, opening, closing, phone,menu
      }).fetch();

      const restaurant = await Restaurant.create({
        name, restaurantDetail: restaurantDetail.id
      }).fetch();

      return res.ok(restaurant)
    }
    catch (err) {
      res.serverError(err)
    }
  },

  /**
   * `JobController.find()`
   * to find all data
   */
  find: async function (req, res) {
    try {
      const restaurants = await Restaurant.find({}).populate('restaurantDetail')
      return res.ok(restaurants);
    }
    catch (err) {
      return res.serverError(err);
    }
  },

  /**
   * `RestaurantController.update()`
   * to update specified data
   */
  update: async function (req, res) {
    try {
      let param = req.allParams();
      let attribute = {};
      let attribute1 = {};
      if (param.name)
        attribute.name = param.name;

      if (param.address)
        attribute1.address = param.address;

      if (param.opening)
        attribute1.opening = param.opening;

      if (param.closing)
        attribute1.closing = param.closing;

      if (param.phone)
        attribute1.phone = param.phone;

      if(param.menu)
        attribute1.menu=param.menu


      /* const result = await Restaurant.update({
          id: req.params.id
      }, attribute); */

      const restaurant = await Restaurant.findOne({ id: req.params.id });
      
      const restaurantDetail = await RestaurantDetail.findOne({ id: restaurant.restaurantDetail })

      const result = await Restaurant.update({
        id: req.params.id
      }, attribute);

      const result1 = await RestaurantDetail.update({
        id: restaurantDetail.id
      }, attribute1)

      return res.ok(restaurantDetail)

    }
    catch (err) {
      res.serverError(err);
    }
  },

  /**
   * `RestaurantController.delete()`
   */
  delete: async function (req, res) {
    try {
      const restaurant = await Restaurant.findOne({
        id: req.params.id
      });

      const results = await Restaurant.destroy({
        id: req.params.id
      })

      const results1=await RestaurantDetail.destroy({
        id:restaurant.restaurantDetail
      })
      console.log(restaurant.restaurantDetail)
      res.ok(restaurant.restaurantDetailId);
    }
    catch (err) {
      res.serverError(err)
    }

  },




  /**
   * `RestaurantController.findById()`
   */
  findById: async function (req, res) {
    try {

      const restaurant = await Restaurant.findOne({
        id: req.params.id
      });
      return res.ok(restaurant);
    }
    catch (err) {
      return res.serverError(err);
    }
  },

  /**
   * `RestaurantController.findByName()`
   */
  findByName: async function (req, res) {
    return res.json({
      todo: 'findByName() is not implemented yet!'
    });
  }

};

