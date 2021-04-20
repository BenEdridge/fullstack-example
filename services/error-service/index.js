const bunyan = require('bunyan');
const log = bunyan.createLogger({name: "bad-backend"});

const { NodeTracerProvider } = require('@opentelemetry/node');
const opentelemetry = require("@opentelemetry/api");

// Logging middleware
const morgan = require('morgan');

// const { AsyncHooksContextManager } = require("@opentelemetry/context-async-hooks");
// const contextAsyncHooks = require("@opentelemetry/context-async-hooks");


// See this
// https://github.com/open-telemetry/opentelemetry-js/issues/1236

const provider = new NodeTracerProvider({
  // config: {
    plugins: {
      dns: {
        enabled: false,
        // You may use a package name or absolute path to the file.
        path: '@opentelemetry/plugin-dns',
        // dns plugin options
        ignoreHostnames: ['localhost', 'jaeger', 'kong']
      },
      // http: {
      //   enabled: true,
      //   path: '@opentelemetry/plugin-http',
      // },
      // https: {
      //   enabled: true,
      //   path: '@opentelemetry/plugin-https',
      // }
    }
  // }
});

const { ConsoleSpanExporter, SimpleSpanProcessor, BatchSpanProcessor } = require('@opentelemetry/tracing');
// const consoleExporter = new ConsoleSpanExporter();
// provider.addSpanProcessor(new SimpleSpanProcessor(consoleExporter));

const options = {
  serviceName: 'error-service   ',
  tags: [], // optional
  // You can use the default UDPSender
  // host: 'localhost', // optional
  // port: 6832, // optional
  // OR you can use the HTTPSender as follows
  endpoint: process.env.JAEGER_ENDPOINT,
  maxPacketSize: 65000 // optional
}

const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const jaegerExporter = new JaegerExporter(options);
provider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter));

// ZIPKIN Exporter

// const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin');
// /* ... */
// const zipkinExporter = new ZipkinExporter({
//     url: 'http://localhost:9411/api/v2/spans',
//     serviceName: 'service-hello'
// });
// const zipkinProcessor = new SimpleSpanProcessor(zipkinExporter)
// provider.addSpanProcessor(zipkinProcessor)

provider.register();

opentelemetry.trace.setGlobalTracerProvider(provider);
const tracer = opentelemetry.trace.getTracer('basic')

const http = require('http');
const dns = require('dns');
const fetch = require('node-fetch');

// const tracer = initTracer("api");

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// app.use(function (req, res, next) {
//   const span = tracer.startSpan(`${req.method} ${req.url}`);
//   // span.log({ event: req.url });
//   res.locals.span = span; 
//   next()
// });

app.use(express.json());

let books = [];

// const span = (name, event) => {
//   const span = tracer.startSpan(name);
//   span.log({ event: JSON.stringify(event) });
//   span.finish();
// };

app.get('/secret/book', function (req, res, next) {
  if (!req.headers.authorization) {
    res.status(403).json({ error: 'No credentials sent!' });
    return next();
  } else {
    if (req.headers.authorization === 'password') {
      res.status(200).json({
        secret_book: {
          text: 'I am a secret book'
        }
      });
      return next();
    } else {
      res.status(401).json({ error: 'Password is wrong!' });
      return next();
    }
  }
});

app.get('/', (req, res, next) => {


  // const currentSpan = tracer.getCurrentSpan();
  // console.log('TraceId', currentSpan.context().traceId);

  // const span = tracer.startSpan('Google Request', {
  //   parent: currentSpan,
  //   kind: 1, // server
  //   attributes: { key: 'value' },
  // });

  // const options = {
  //   host: 'www.google.com',
  // };

  // http.get(options, (response) => {
  //   console.log('Google is loaded:', JSON.stringify(response.headers));
  //   res.send(`You loaded google and this is a ${requestName(req)} request!`);
  //   // span.end();
  //   return next();
  // });

  fetch('https://github.com/')
    .then(res => console.log(JSON.stringify(res.headers)))
    .then(body => {
      console.log(JSON.stringify({message: 'GitHub Success'}));
      res.send(`Success!`);
      next();
    });
});

app.get('/book/:id', (req, res, next) => {
  const book = books[req.params.id];
  if (!book) {
    res.send(`No book found with id ${req.params.id}`)
  } else {
    res.json(books[req.params.id]);
  }
  next();
});

app.put('/book/:id', (req, res, next) => {
  const book = books[req.params.id];
  if (!book) {
    res.send(`No book found with id ${req.params.id}`)
  } else {
    const book = {
      id: req.params.id,
      ...req.body
    };

    books[req.params.id] = book;
    res.status(201).send(`Book updated (Love you Zoe): ${JSON.stringify(book)}`)
  }
  next();
});

app.delete('/book/:id', (req, res, next) => {
  const book = books[req.params.id];
  if (!book) {
    res.send(`No book found with id ${req.params.id}`)
  } else {
    delete books[req.params.id];
  }
  next();
});

app.get('/books', (req, res, next) => {
  res.json(books);
  next();
});

app.delete('/books', (req, res, next) => {
  books = [];
  res.send('All books deleted');
  next();
});

app.post('/', (req, res, next) => {
  res.send(`This is a ${requestName(req)} request!`)
  next();
});

app.post('/book', (req, res, next) => {
  const book = {
    id: books.length,
    ...req.body
  };

  books.push(book);
  res.status(201).send(`Book created: ${JSON.stringify(book)}`)
  next();
});

app.put('/', (req, res, next) => {
  res.send(`This is a ${requestName(req)} request!`)
  next();
});

app.delete('/', (req, res, next) => {
  res.send(`This is a ${requestName(req)} request!`)
  next();
});

// app.use(function (req, res, next) {
//   if (res.locals.span) {
//     res.locals.span.finish();
//   }
//   next();
// });

const requestName = (req) => {
  return req.method;
};

app.use((req, res, next) => {
  log.info({
    req
  })
  next();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
