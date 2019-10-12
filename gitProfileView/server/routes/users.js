var express = require('express');
var router = express.Router();
const axios = require('axios')
const config = require('../config/config.json');
const url = config.api;


/* GET user details */
router.get('/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    let user = await fetchUserDetails(id);
    let repos = await fetchUserRepos(id);
    user.data.repos = repos.data;
    res.json(user.data);
  } catch (error) {
    res.json({
      "error": "internal server error"
    });
  }
});

// fetch user from gitHub
fetchUserDetails = (id) => {
  const params = encodeURI(`users/${id}`);
  return axios.get(url + params, {
    auth: {
      username: config.git.userName,
      password: config.git.password
    }
  })
}

// fetch user's repo from gitHub
fetchUserRepos = (id) => {
  return axios.get(url + encodeURI(`users/${id}/repos`), {
    auth: {
      username: config.git.userName,
      password: config.git.password
    }
  })
}

module.exports = router;