# Mock Bookings Setup

## Overview
This project currently uses **mock bookings data** stored in browser localStorage for easier GitHub deployment. The json-server infrastructure remains intact but unused - you can re-enable it if needed later.

## Current Setup

### Booking Workflow
- ✅ **Booking Creation**: Always succeeds with any user input
- ✅ **Mock Payment**: Complete with one click (mock payment button)
- ✅ **Check Status**: Works with pre-loaded mock bookings or previously created ones

### Test Bookings
Two mock bookings are pre-loaded in localStorage on first visit:

| Booking Code | Name | Status | Amount |
|--------------|------|--------|--------|
| `DG-TEST-001` | John Doe | Pending Payment | ₱2,500.00 |
| `DG-TEST-002` | Jane Smith | Payment Completed | ₱5,000.00 |

**How to test check status:**
1. Go to "Check Status" page
2. Enter `DG-TEST-001` or `DG-TEST-002` as the booking code
3. See the pre-loaded booking details

## How Mock Data Works

### Files Modified
- [app/data/bookings.ts](app/data/bookings.ts) - All functions now use localStorage only, no API calls

### Key Features
1. **localStorage Persistence**: Bookings persist across page refreshes
2. **Auto-initialization**: Mock bookings auto-load on first visit
3. **Complete on Any Input**: Booking completes regardless of what user enters
4. **No Server Dependency**: Works offline, perfect for GitHub Pages deployment

## Re-enabling json-server (Optional)

If you need to use the actual json-server backend later:

1. **Start json-server**:
   ```bash
   npm run db
   ```

2. **Restore API calls** in [app/data/bookings.ts](app/data/bookings.ts):
   - The commented-out axios code shows the original API call pattern
   - You can copy the old implementation from git history

3. **Update functions** to try API first, then fall back to localStorage:
   ```typescript
   try {
     // API call to json-server
   } catch {
     // Fallback to localStorage
   }
   ```

## Testing

### Test the booking flow:
1. Fill out any booking information
2. Select packages and date
3. Review details
4. Click "Complete Mock Payment"
5. See success confirmation

### Test check status:
1. Create a new booking (will generate random booking code)
2. Note the booking code
3. Go to Check Status
4. Enter the booking code to retrieve it

## Deployment Notes

✅ **GitHub Pages compatible**: No backend required
✅ **Fully functional UI**: All features work with mock data
✅ **Easy to switch**: json-server setup still available when needed

## Notes

- Mock data is stored in browser localStorage (`dreamGateBookings` key)
- Clear localStorage in DevTools Console to reset mock bookings to defaults
- Each new booking gets a unique generated booking code
- Payment status is tracked in mock payment details
