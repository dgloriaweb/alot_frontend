#!/bin/bash
# Development startup script for ALOT project
# This starts both frontend and backend servers

echo "🚀 Starting ALOT Development Servers..."
echo ""

# Check if backend exists
if [ -d "/var/www/html/alot_backend" ]; then
    echo "📦 Starting Laravel Backend API on http://127.0.0.1:8000..."
    cd /var/www/html/alot_backend
    php artisan serve --port=8000 &
    BACKEND_PID=$!
    echo "   Backend PID: $BACKEND_PID"
else
    echo "⚠️  Backend not found at /var/www/html/alot_backend"
    echo "   Please clone/create the Laravel backend project"
fi

echo ""
echo "🎨 Starting Vue Frontend on http://localhost:3000..."
cd /var/www/html/alot_frontend
npm run dev &
FRONTEND_PID=$!
echo "   Frontend PID: $FRONTEND_PID"

echo ""
echo "✅ Development servers started!"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://127.0.0.1:8000"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo ''; echo '🛑 Servers stopped'; exit" INT
wait

