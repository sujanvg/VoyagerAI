#!/usr/bin/env python3
"""
Simple script to generate secret keys for deployment
Run this before deploying to get your SECRET_KEY and JWT_SECRET_KEY
"""
import secrets

print("=" * 60)
print("🔐 Secret Keys for VoyagerAI Deployment")
print("=" * 60)
print()
print("Copy these values to your Railway environment variables:")
print()
print(f"SECRET_KEY={secrets.token_urlsafe(32)}")
print()
print(f"JWT_SECRET_KEY={secrets.token_urlsafe(32)}")
print()
print("=" * 60)
print("✅ Done! Copy these to Railway → Variables → Add Variable")
print("=" * 60)

