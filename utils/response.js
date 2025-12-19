'use strict';

exports.success = function(res, data = undefined) {
  const response = {
    success: true,
    message: 'Success',
    data
  };
  
  res.json(response);
  res.end();
};

exports.failed = function(res, message = 'Failed') {
  const response = {
    success: false,
    message
  };
  
  res.json(response);
  res.end();
};
