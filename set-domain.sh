#!/usr/bin/env bash
# Changes the site's public URL everywhere it appears.
# Usage:  ./set-domain.sh https://your-real-domain.com
set -euo pipefail
[ $# -eq 1 ] || { echo "usage: $0 https://your-domain.com"; exit 1; }
NEW="${1%/}"
OLD=$(grep -oE 'https?://[^<]+' sitemap.xml | head -1 | sed 's:/*$::')
echo "Replacing $OLD  ->  $NEW"
for f in index.html robots.txt sitemap.xml; do
  sed -i.bak "s|${OLD}|${NEW}|g" "$f" && rm -f "$f.bak"
  echo "  updated $f"
done
echo "Done. Commit and push (or re-upload) to publish."
