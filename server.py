#!/usr/bin/env python3
"""
Simple static file server for AI article site
Usage: python server.py [port]
"""
import http.server
import socketserver
import os
import sys
import signal
import socket
from pathlib import Path

class GracefulTCPServer(socketserver.TCPServer):
    """TCP Server that handles shutdown gracefully and reuses addresses"""
    
    def __init__(self, *args, **kwargs):
        # Allow address reuse to prevent "Address already in use" errors
        self.allow_reuse_address = True
        super().__init__(*args, **kwargs)
    
    def server_bind(self):
        # Set socket options for better port reuse
        self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        # On macOS, also set SO_REUSEPORT if available
        if hasattr(socket, 'SO_REUSEPORT'):
            try:
                self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEPORT, 1)
            except OSError:
                pass  # Not all systems support SO_REUSEPORT
        super().server_bind()

def find_free_port(start_port=8000, max_attempts=10):
    """Find a free port starting from start_port"""
    for port in range(start_port, start_port + max_attempts):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('', port))
                return port
        except OSError:
            continue
    return None

def signal_handler(signum, frame, httpd=None):
    """Handle interrupt signals gracefully"""
    print(f"\n📥 Received signal {signum}")
    if httpd:
        print("🛑 Shutting down server gracefully...")
        httpd.shutdown()
        httpd.server_close()
    print("👋 Server stopped cleanly")
    sys.exit(0)

def main():
    requested_port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    
    # Change to the directory containing this script
    os.chdir(Path(__file__).parent)
    
    # Try to find a free port
    port = find_free_port(requested_port)
    if port is None:
        print(f"❌ Could not find a free port starting from {requested_port}")
        print("💡 Try specifying a different port: python server.py 3000")
        sys.exit(1)
    
    if port != requested_port:
        print(f"⚠️  Port {requested_port} is busy, using port {port} instead")
    
    # Use custom handler
    handler = http.server.SimpleHTTPRequestHandler
    
    try:
        # Create server with graceful shutdown capabilities
        with GracefulTCPServer(("", port), handler) as httpd:
            # Set up signal handlers for graceful shutdown
            signal.signal(signal.SIGINT, lambda s, f: signal_handler(s, f, httpd))
            signal.signal(signal.SIGTERM, lambda s, f: signal_handler(s, f, httpd))
            
            print(f"🚀 Server running at http://localhost:{port}/")
            print(f"📁 Serving files from: {os.getcwd()}")
            print("🔄 Server will automatically find free ports if busy")
            print("⏹️  Press Ctrl+C to stop the server")
            print("-" * 50)
            
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print("\n🛑 Shutting down server...")
                httpd.shutdown()
                httpd.server_close()
                print("👋 Server stopped cleanly")
                
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Port {port} is still in use")
            print("💡 Try killing the process with:")
            print(f"   lsof -ti:{port} | xargs kill -9")
            print("   Or use a different port: python server.py 3000")
        else:
            print(f"❌ Server error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
