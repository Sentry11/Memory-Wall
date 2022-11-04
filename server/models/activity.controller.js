const Activity = require("../models/activity.model");


const getActivities = async (req, res) => {
    try {
      const activities = await Activity.find();
      res.status(200).json(activities);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  const addActivity = async (req, res) => {
    const activity = new Activity(req.body);
  
    try {
      const newActivity = await activity.save();
      res.status(201).json(newActivity);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  module.exports = {
    getActivities,
    addActivity,
  };