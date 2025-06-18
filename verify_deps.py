#!/usr/bin/env python3
"""
Verify that all local dependencies are working correctly
"""
import http.server
import socketserver
import os
import sys
from pathlib import Path

def start_server():
    """Start a simple HTTP server"""
    PORT = 8080
    os.chdir(Path(__file__).parent)
    
    Handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at http://localhost:{PORT}")
        httpd.serve_forever()

def verify_dependencies():
    """Check that all dependency files exist and are not empty"""
    libs_dir = Path("js/libs")
    required_files = [
        "prism-tomorrow.min.css",
        "prism-core.min.js", 
        "prism-python.min.js",
        "prism-javascript.min.js", 
        "prism-bash.min.js",
        "mermaid.min.js"
    ]
    
    print("Verifying local dependencies...")
    all_good = True
    
    for file in required_files:
        file_path = libs_dir / file
        if not file_path.exists():
            print(f"❌ Missing: {file}")
            all_good = False
        elif file_path.stat().st_size == 0:
            print(f"❌ Empty: {file}")
            all_good = False
        else:
            size_kb = file_path.stat().st_size // 1024
            print(f"✅ {file} ({size_kb}KB)")
    
    if all_good:
        print("\n🎉 All dependencies verified successfully!")
        print("\nTo test the site:")
        print("1. Run: python3 server.py")
        print("2. Open: http://localhost:8000")
        print("3. Check browser console for any errors")
    else:
        print("\n❌ Some dependencies are missing or corrupted")
        sys.exit(1)

if __name__ == "__main__":
    verify_dependencies()
