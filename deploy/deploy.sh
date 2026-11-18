#!/bin/bash
# ==========================================
# Fundev.uz Quick Deploy / Update Script
# Usage: ./deploy/deploy.sh
# ==========================================

set -e

echo "🚀 Starting fundev.uz deployment..."

cd /var/www/fundev

# Activate virtualenv
source /var/www/fundev/venv/bin/activate

# Pull latest code
echo "📥 Pulling latest code from Git..."
git pull origin main

# Install / update requirements
echo "📦 Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Run database migrations
echo "🗄️ Running migrations..."
python manage.py migrate --noinput

# Collect static files
echo "🎨 Collecting static files..."
python manage.py collectstatic --noinput

# Restart Gunicorn service
echo "🔄 Restarting Gunicorn service..."
sudo systemctl restart fundev

# Reload Nginx
echo "🌐 Reloading Nginx..."
sudo systemctl reload nginx

echo "✅ Deployment finished successfully!"
