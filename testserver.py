import http.server
import socketserver
 
PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler
 
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("Serving At Localhost PORT", PORT)
    httpd.serve_forever()
