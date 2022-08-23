'use strict';

module.exports = ({ strapi }) => {
  // registeration phase
  // Iterating on every content-types
  Object.values(strapi.contentTypes).forEach(contentType => {
    // If this is an api content-type
    if (contentType.uid.includes('api::')) {
      // Add tasks property to the content-type
      const config = {
        "pluginOptions": {
          "i18n": {
            "localized": false
          }
        },
        "type": "enumeration",
        "enum": [
          "test",
          "prod"
        ],
        "required": true,
        "default": "test"
      }
      contentType.__schema__.attributes.env = config;
      contentType.attributes.env = config;
    }
  });
};

