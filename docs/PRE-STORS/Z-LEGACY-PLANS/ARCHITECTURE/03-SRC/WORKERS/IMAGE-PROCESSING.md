# Image Processing

## 🎯 Quick Summary
> **Purpose**: Automatic image resizing and optimization using Cloudflare's edge network  
> **Type**: Edge Image Transformation  
> **Location**: Integrated in `/src/workers/asset-worker.js`  
> **Related**: [ASSET-WORKER](./ASSET-WORKER.md), [R2-STORAGE](./R2-STORAGE.md), [ROUTING](./ROUTING.md)

---

## 🔄 Simple Explanation

Image Processing provides **on-demand image transformation** at the edge:

1. **Automatic variants** - Generates thumb, small, medium, large
2. **Dynamic resizing** - Resize via URL parameters
3. **Format optimization** - Best format for browser
4. **Edge processing** - Transform at CDN level
5. **Cache results** - Store transformed versions

```
Request image?w=800 → Cloudflare edge → Resize on-the-fly → Cache → Serve
```

---

## 📋 Technical Specification

### Variant Generation

| Variant | Parameters | Use Case |
|---------|------------|----------|
| **thumb** | 150x150, cover | Thumbnails |
| **small** | 400px width | Cards |
| **medium** | 800px width | Content |
| **large** | 1200px width | Full view |

### URL Parameters
```
/asset/{hash}?w=800&h=600&fit=cover
```

| Param | Purpose | Values |
|-------|---------|--------|
| **w** | Width | Pixels |
| **h** | Height | Pixels |
| **fit** | Resize mode | cover, scale-down, pad |

### Cloudflare Integration
```javascript
headers['CF-Resizing-Options'] = JSON.stringify({
  width: 800,
  height: 600,
  fit: 'scale-down'
})
```

---

## 🔗 Integration

### Processing Flow
```
Original upload → Store full size → Generate variants on request → Cache variants
```

### Variant URLs
```javascript
{
  thumb: `/asset/${hash}?w=150&h=150&fit=cover`,
  small: `/asset/${hash}?w=400`,
  medium: `/asset/${hash}?w=800`,
  large: `/asset/${hash}?w=1200`
}
```

### Performance
- First request: Generate and cache
- Subsequent: Serve from cache
- Global edge locations
- Automatic WebP/AVIF

---

## 📊 Quick Reference

### Supported Formats
- Input: JPEG, PNG, GIF, WebP
- Output: Original or optimized
- Auto WebP conversion
- Quality preservation

### Benefits
- No pre-processing
- Storage savings
- Bandwidth optimization
- Responsive images
- Fast delivery

### Limits
- Max dimensions vary by plan
- Automatic quality adjustment
- Format negotiation
- Cache duration control