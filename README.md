# serve-swagger-docs
Render your OpenAPI specifications using Swagger UI 

# Parameters
- `port` The port on which the server will listen. Is `3000` by default.
- `file` The path to a local OpenAPI file to be served
- `url` The url to an online OpenAPI specification file

# Start the server
```bash
# Ways to serve a local OpenAPI file
serve-swagger-docs file=<path/to/file.json>
serve-swagger-docs --file=<path/to/file.json>

# Ways to serve a remote OpenAPI file
serve-swagger-docs url=<http(s)://path/to/file.json>
serve-swagger-docs --url=<http(s)://path/to/file.json>

# Ways to specify a port
serve-swagger-docs port=<PORT>
serve-swagger-docs --port=<PORT>
```


The server should log a message with an URL to view your documentation. Navigate to this URL on your browser to see the docs.