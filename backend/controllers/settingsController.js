const express = require('express');
const UserSettings = require('../models/UserSettings');

exports.getSetting =  async (req, res) => {
  try {
    const settings = await UserSettings.findOne({ userId: req.user.userId });
    console.log(settings)
    res.status(200).json(settings || {});
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.postSetting = async (req, res) => {
  try {
    const { name, currency, notifications } = req.body;
    const settings = await UserSettings.findOneAndUpdate(
      { userId: req.user.userId },
      { name, currency, notifications },
      { upsert: true, new: true }
    );
    res.status(200).json(settings);
    console.log(settings)
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
