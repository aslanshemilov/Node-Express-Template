/*
 * config
 */

var config = {
  ENV: 'production',
  
  // Database config
  admin: 'mongodb://nokey:458318331@localhost:27017/admin',
  db_myapp: 'mongodb://nokey1:nokey1@localhost:27017/myapp',
  db_startup: 'mongodb://nokey:458318331@localhost:27017/chinastartup',
  db_cctvnews: 'mongodb://nokey:458318331@localhost:27017/cctvnews',

  // Pagination
  news_num_per_page: 9
};

module.exports = config;