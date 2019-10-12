var express = require('express');
var router = express.Router();
const axios = require('axios')
const config = require('../config/config.json');
const url = config.api;

// source: https://javascript.info/promise-api
if (!Promise.allSettled) {
  Promise.allSettled = function (promises) {
    return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
      state: 'fulfilled',
      value
    }), reason => ({
      state: 'rejected',
      reason
    }))));
  };
}

// fetch users based on searchText, perPage and page 
router.get('/:searchText/:perPage/:page', async (req, res, next) => {
  try {
    let searchString = req.params.searchText;
    let perPage = req.params.perPage;
    let page = req.params.page;
    let userDetailsArray = [];
    userDetailsArray = await searchUser(searchString, perPage, page);
    userDetailsArray = userDetailsArray.data.items.map(user => fetchUserDetails(user.login));
    let data = await Promise.allSettled(userDetailsArray);
    data = data.map(rawData => rawData.value.data);
    res.json(data);
  } catch (err) {
    res.json({
      error: "internal server error"
    });
  }
});

// search user array from git with basic details
searchUser = (searchString, perPage, page) => {
  let params = encodeURI(`search/users?q=${searchString}&per_page=${perPage}&page=${page}&type:user`);
  return axios.get(url + params, {
    auth: {
      username: config.git.userName,
      password: config.git.password
    }
  })
}

// search perticular user with all details
fetchUserDetails = (id) => {
  const params = encodeURI(`users/${id}`);
  return axios.get(url + params, {
    auth: {
      username: config.git.userName,
      password: config.git.password
    }
  })
}



module.exports = router;