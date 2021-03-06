// <%= name %>-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';

export default function (app: Application) {
  const modelName = '<%= camelName %>';
  const mongooseClient = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({
  <% if(authentication.strategies.indexOf('local') !== -1) { %>
    email: { type: String, unique: true, lowercase: true },
    password: { type: String },
  <% } %>
  <% authentication.oauthProviders.forEach(provider => { %>
    <%= provider %>Id: { type: String },
  <% }); %>
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
}
