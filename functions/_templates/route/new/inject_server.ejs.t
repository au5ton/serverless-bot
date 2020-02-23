---
inject: true
to: src/server.js
skip_if: <%= name %>
before: "hygen.generator.before"
---
app.use('/<%= name %>', require('./lib/<%= name %>/route'))