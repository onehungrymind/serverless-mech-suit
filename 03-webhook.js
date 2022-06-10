'use strict';

const axios = require('axios').default;

const zap = async (task) => {
  const { data } = await axios.post(process.env.ZAP_URL, { task });
  return data;
};
