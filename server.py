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
import threading
from pathlib import Path

class GracefulHTTPServer(socketserver.TCPServer):
    """HTTP Server with improved shutdown handling"""
    
    def __init__(self, *args, **kwargs):
        self.allow_reuse_address = True
        super().__init__(*args, **kwargs)
        self._shutdown_event = threading.Event()
    
    def server_bind(self):
        # Enable address reuse
        self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        # On macOS, also set SO_REUSEPORT if available
        if hasattr(socket, 'SO_REUSEPORT'):
            try:
                self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEPORT, 1)
            except OSError:
                pass
        super().server_bind()
    
    def shutdown(self):
        """Enhanced shutdown method"""
        self._shutdown_event.set()
        super().shutdown()

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

# Global server instance for signal handling
server_instance = None

def signal_handler(signum, frame):
    """Handle shutdown signals"""
    global server_instance
    print(f"\n📥 Received signal {signum}")
    if server_instance:
        print("🛑 Shutting down server...")
        try:
            server_instance.shutdown()
            server_instance.server_close()
        except Exception as e:
            print(f"⚠️  Error during shutdown: {e}")
    print("👋 Server stopped")
    sys.exit(0)

def main():
    global server_instance
    
    requested_port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    
    # Change to the directory containing this script
    os.chdir(Path(__file__).parent)
    
    # Find a free port
    port = find_free_port(requested_port)
    if port is None:
        print(f"❌ Could not find a free port starting from {requested_port}")
        print("💡 Try: python server.py 3000")
        sys.exit(1)
    
    if port != requested_port:
        print(f"⚠️  Port {requested_port} is busy, using port {port} instead")
    
    # Set up signal handlers
    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)
    
    try:
        # Create and start server
        handler = http.server.SimpleHTTPRequestHandler
        server_instance = GracefulHTTPServer(("", port), handler)
        
        print(f"🚀 Server running at http://localhost:{port}/")
        print(f"📁 Serving files from: {os.getcwd()}")
        print("🔄 Server will automatically find free ports if busy")
        print("⏹️  Press Ctrl+C to stop the server")
        print("-" * 50)
        
        # Start server in a separate thread for better signal handling
        server_thread = threading.Thread(target=server_instance.serve_forever)
        server_thread.daemon = True
        server_thread.start()
        
        # Wait for shutdown
        try:
            while server_thread.is_alive():
                server_thread.join(1)  # Check every second
        except KeyboardInterrupt:
            print("\n� Keyboard interrupt received")
            
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Port {port} is still in use")
            print("💡 Try: lsof -ti:{port} | xargs kill -9")
        else:
            print(f"❌ Server error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        sys.exit(1)
    finally:
        # Final cleanup
        if server_instance:
            try:
                server_instance.shutdown()
                server_instance.server_close()
            except:
                pass
        print("🧹 Cleanup complete")

if __name__ == "__main__":
    main()
