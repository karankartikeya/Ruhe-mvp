#!/bin/bash

echo "🚀 Setting up Friendbook Development Environment"
echo "==============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Copy environment file if it doesn't exist
if [ ! -f ".env.local" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env.local
        echo "✅ Created .env.local from .env.example"
        echo "⚠️  Please update .env.local with your actual Appwrite configuration"
    else
        echo "❌ .env.example file not found"
        exit 1
    fi
else
    echo "✅ .env.local already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
if command -v yarn &> /dev/null; then
    yarn install
elif command -v pnpm &> /dev/null; then
    pnpm install
else
    npm install
fi

echo "✅ Dependencies installed successfully"

# Check if Appwrite CLI is available globally
if ! command -v appwrite &> /dev/null; then
    echo "⚠️  Appwrite CLI not found globally. You can install it with:"
    echo "   npm install -g appwrite-cli"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your Appwrite configuration"
echo "2. Set up your Appwrite project and collections"
echo "3. Run 'npm run dev' to start the development server"
echo ""
echo "For detailed setup instructions, see the README.md file"
