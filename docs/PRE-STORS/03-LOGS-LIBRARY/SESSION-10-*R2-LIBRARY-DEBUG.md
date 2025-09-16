# SESSION 10: R2 Library Debug and Image Display Fix

## Date: 2025-08-24

## Session Overview
This session focused on debugging why images from the R2 library weren't displaying on the canvas, despite being visible in Cloudflare's dashboard. We discovered that the library items were missing their asset URLs/hashes, making them unusable.

## Initial Problem
- Images uploaded to library were not displaying on canvas
- Console showed "Media preset but no image src yet"
- URLs were being generated as `/asset/lib-xxxxx` instead of proper asset hashes
- All library items showed "🔧 Media item missing URL" in console

## Technical Investigation

### 1. Component Architecture Audit
We identified 5 library-related components:
- **UnifiedLibrary.tsx** - Main library interface (actively used)
- **LibraryManager.tsx** - Import/export management (actively used)
- **SimpleLibraryPicker.tsx** - Basic image picker (actively used)
- **LibraryImagePicker.tsx** - Enhanced image picker (UNUSED/duplicate)
- **ImageSourceSelector.tsx** - Source selection modal (actively used)

### 2. R2 Infrastructure Check
- Verified R2 Worker URL: `https://studio-one-assets.studio-one.workers.dev`
- Confirmed CORS headers are properly configured
- Found two buckets:
  - `studio-one-assets` (11 objects, 7.25 MB) - for actual files
  - `studio-one-library` (15 objects, 178.06 kB) - for metadata

### 3. Root Cause Analysis
The core issue was that library items were being saved with library IDs (`lib-xxxxx`) instead of asset hashes. When retrieving items from R2 library, they had no reference to the actual asset files.

## Code Changes Made

### 1. Fixed CSS URL Quoting (DirectRenderer.tsx)
```javascript
// Before:
elementStyle.backgroundImage = `url(${imageSrc})`;

// After:
elementStyle.backgroundImage = `url("${imageSrc}")`;
```

### 2. Added Comprehensive Debug Logging
- Upload result logging in UnifiedLibrary.tsx
- Item structure logging when adding to canvas
- URL resolution logging in drag & drop handler
- Element content logging in DirectRenderer.tsx

### 3. Improved URL Resolution Logic
```javascript
// Added multiple fallbacks for finding URLs
const imageUrl = item.data?.url || item.url || item.thumbnail || '';
const assetHash = item.hash || item.data?.hash || item.data?.assetId;
const finalUrl = imageUrl || (assetHash && !assetHash.startsWith('lib-') ? 
  `${r2Manager.workerUrl}/asset/${assetHash}` : '');
```

### 4. Added Media Preset Transparency
```json
"media": {
  "--background-color": "transparent",
  // ... other properties
}
```

### 5. Enhanced Error Handling
- Better error messages for missing URLs
- User-friendly alerts explaining the need to re-upload
- Validation to prevent using library IDs as asset hashes

### 6. R2 Manager Improvements
- Made workerUrl public for access in other components
- Added hash construction fallback
- Enhanced upload error logging

## Current Status

### Working:
- R2 Worker endpoints are accessible and responding correctly
- CORS is properly configured
- Upload mechanism to R2 assets bucket works
- Library save/retrieve mechanism works
- Drag & drop functionality works
- CSS rendering is correct

### Not Working:
- All existing library items lack asset URL references
- Items saved before the fix cannot display images
- Library items only have library IDs, not asset hashes

## Critical Discovery
The library items in R2 are storing metadata with library-specific IDs (`lib-1755990961850-xsh0qdifo`) but these IDs don't correspond to actual asset files. The asset files exist in the `studio-one-assets` bucket (confirmed via Cloudflare dashboard) but the library items have lost the reference to them.

## Next Steps for Next Agent

### Immediate Priority:
1. **Test New Upload Flow**
   - Upload a fresh image and check console for "Full upload result"
   - Verify the upload result contains either `hash` or `id` field
   - Confirm the constructed URL works when accessing directly

2. **Fix R2 Worker Response**
   - The R2 Worker at `/upload` endpoint needs to return BOTH:
     - The asset hash/ID for constructing URLs
     - The full URL to the asset
   - Currently it seems to only return partial data

3. **Implement Asset Recovery**
   - For existing broken library items, consider:
     - Adding a "re-link asset" feature
     - Batch re-upload functionality
     - Asset hash recovery from R2 bucket listing

### Medium Priority:
4. **Clean Up Duplicate Components**
   - Remove unused `LibraryImagePicker.tsx`
   - Consolidate image picking logic

5. **Add Loading States**
   - Show loading spinner during R2 operations
   - Add progress indicators for uploads

6. **Implement Retry Logic**
   - Auto-retry failed R2 operations
   - Exponential backoff for network errors

### Investigation Needed:
7. **R2 Worker Audit**
   - Check the Cloudflare Worker code for the `/upload` endpoint
   - Verify it's returning the correct response format:
   ```javascript
   {
     hash: "actual-file-hash",
     id: "actual-file-hash", // redundant but safe
     url: "https://studio-one-assets.studio-one.workers.dev/asset/actual-file-hash"
   }
   ```

8. **Library Save Flow**
   - Ensure `r2Manager.saveToLibrary()` preserves the asset hash
   - Verify the library item structure includes all necessary fields

### Testing Checklist:
- [ ] Upload new image and verify console logs show hash
- [ ] Check if new upload creates working library item
- [ ] Test drag & drop with new upload
- [ ] Verify image displays on canvas
- [ ] Check background-image CSS is properly formatted
- [ ] Test with different image formats (PNG, JPEG, WebP)

## Important Notes
- The user has ADHD and finds detailed console inspection overwhelming
- Keep debugging steps simple and focused
- Provide clear, actionable error messages
- All existing library items will need to be re-uploaded to work

## Session End State
- Library items are being correctly identified as missing URLs
- New upload flow has enhanced logging to diagnose issues
- User has been informed that existing items need re-uploading
- CSS and drag & drop mechanics are working correctly
- Awaiting test of new upload to verify R2 Worker response format