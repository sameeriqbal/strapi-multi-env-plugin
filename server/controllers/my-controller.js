'use strict';
const { getSulg, filterObject } = require('../utils')
module.exports = ({ strapi }) => ({
  async index(ctx) {
    try {
      const { body } = ctx.request;
      let {
        id,
        key,
        createdAt,
        createdBy,
        localizations,
        pathname,
        updatedAt,
        updatedBy,
        ...rest
      } = body;

      filterObject(rest, 'id');

      //api::apiName.serviceName
      const serviceName = getSulg(pathname);

      // get current prod entry
      const { results } = await strapi
        .service(serviceName)
        .find({
          filters: {
            key: {
              $eq: key,
            },
            env: {
              $eq: 'prod',
            },
          },
        })
      const [prodEntry] = results;

      // create new prod entry
      await strapi
        .service(serviceName)
        .create({
          data: {
            ...rest,
            key,
            env: 'prod'
          },
        })

      // delete old entry
      await strapi
        .service(serviceName)
        .delete(prodEntry.id)

      ctx.body = { status: 'ok' }
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
