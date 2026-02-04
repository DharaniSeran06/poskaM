# OneDrive Build Error Fix

## Issue
When building Next.js projects in OneDrive folders on Windows, you may encounter:
```
[Error: EINVAL: invalid argument, readlink '...\.next\...']
```

This happens because OneDrive uses placeholder files/symlinks that conflict with Node.js file system operations.

## Solutions

### Option 1: Exclude `.next` from OneDrive Sync (Recommended)

1. Right-click the project folder in File Explorer
2. Select "OneDrive" → "Free up space" or "Always keep on this device"
3. Or exclude `.next` folder from OneDrive sync:
   - Open OneDrive settings
   - Go to "Sync and backup" → "Advanced settings"
   - Add `.next` to excluded folders

### Option 2: Move Project Outside OneDrive

Move your project to a local folder (e.g., `C:\Projects\`) instead of OneDrive.

### Option 3: Use Build Script with Cleanup

Add this to `package.json`:
```json
{
  "scripts": {
    "build:clean": "if exist .next rmdir /s /q .next && npm run build"
  }
}
```

Then use: `npm run build:clean`

### Option 4: Disable OneDrive for This Folder

1. Right-click the project folder
2. Select "Properties"
3. Uncheck "Always available on this device" if checked
4. Or pause OneDrive sync temporarily during builds

## Quick Fix

Before each build, delete the `.next` directory:
```powershell
Remove-Item -Recurse -Force .next
npm run build
```

Or use the provided cleanup script.
