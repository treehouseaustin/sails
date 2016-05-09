/**
 * Module dependencies.
 */

const _ = require('lodash');
const winston = require('winston');
var buildShipFn = require('./ship');


module.exports = function(sails) {


  /**
   * Expose `logger` hook definition
   */

  return {


    defaults: {
      log: {
        level: 'info'
      }
    },


    configure: function() {

    },


    /**
     * Initialize is fired when the hook is loaded,
     * but after waiting for user config.
     */

    initialize: function(cb) {

      // Get basic log functions
      var log = new winston.Logger(_.merge(sails.config.log, {
        transports: [
          new (winston.transports.Console)()
        ]
      }))

      // Mix in log.ship() method
      log.ship = buildShipFn(
        sails.version ? ('v' + sails.version) : '',
        log.info
      );

      // Expose log on sails object
      sails.log = log;

      return cb();
    }

  };
};
