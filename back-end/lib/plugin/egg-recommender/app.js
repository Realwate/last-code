'use strict';

const Recommender = require('../../recommender');

function createRecommender(config,app){
    let r = new Recommender(config)
    r.setLogger(app.logger);
    app.recommender = r;
}

module.exports = app => {
    // app.addSingleton('recommender', createRecommender);
    createRecommender(app.config.recommender,app);
    app.coreLogger.info('recommender initlize success...')
  };
