# Jist
Rendering engine for rendering js files.

## Why
Your JSON API route handlers / controllers can get cluttered with view logic(the logic that creates / builds the response JSON object). It can be nice to separate out response generation / build logic once the handler has fetched the data. **Jist** can help you transform this:
```javascript
var express = require('express');
var router = express.Router();
var myService = require('./my-service');
var _ = require('lodash');

router.get('/', function(req, res, next) {
  myService.getPeople().then(function(people) {
    return people.map(function(person) {
	  person.pick(['a', 'b', 'c']);
	  person.d = (person.a + person.b) / person.c;
    });
  }).then(res.json.bind(res));
});
```

into

```javascript
var express = require('express');
var router = express.Router();
var myService = require('./my-service');
var jist = require('jist');

router.get('/', function(req, res, next) {
  myService.getPeople().then(function(people){
    json.render('index', {
      people: people
    });
});
```
and
```javascript
// views/index.jist
var _ = require('lodash');

return people.map(function(person) {
  person.pick(['a', 'b', 'c']);
  person.d = (person.a + person.b) / person.c;
});
```
This encourages reusability of view logic as well. *Partials are coming soon.*

## Installation
```
npm install --save @rohhittt/jist
```

## Usage

### Express

In your app.js
```javascript
var express = require('express');
const app = express();

var jist = require('jist');
jist.register(app);
app.set('views', path.join(__dirname, 'views'));

```
And you are done!

Just start creating .jist files in your views directory and call `res.render(filePath, scope)`, where

**filepath**
Is the filepath of your jist template you want to render with

**scope**
Is the scope you want in your template. For eg. if you call
```javascript
res.json('index', {
  a: 1,
  b: 2,
  c: true,
  _: require('lodash')
}`
```

Inside of your template, `a`, `b`, `c`, `_` will be present as local variables.
