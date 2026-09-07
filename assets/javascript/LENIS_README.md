# Lenis Smooth Scroll Integration

## Overview
This project now uses **Lenis** - a lightweight, robust, and performant smooth scroll library created by Studio Freight.

## What Changed
- **Replaced**: `smooth-scroll.js` (old custom implementation)
- **Added**: Lenis v1.0.42 via CDN
- **Created**: `lenis-init.js` for custom configuration

## Features
✅ Smooth and natural scrolling experience  
✅ High performance with requestAnimationFrame  
✅ GSAP ScrollTrigger integration  
✅ Anchor link smooth scrolling  
✅ Touch device optimization  
✅ Modal support (stops scroll when modals open)  

## Configuration
The Lenis instance is configured in `lenis-init.js` with the following settings:

```javascript
{
    duration: 1.2,          // Animation duration
    easing: custom,         // Smooth easing function
    direction: 'vertical',  // Scroll direction
    smooth: true,           // Enable smooth scrolling
    smoothTouch: false,     // Better performance on mobile
}
```

## Customization
You can modify the settings in `lenis-init.js`:

### Change scroll speed:
```javascript
duration: 1.5  // Slower (higher number = slower)
duration: 0.8  // Faster (lower number = faster)
```

### Change mouse wheel sensitivity:
```javascript
mouseMultiplier: 1.5  // More sensitive
mouseMultiplier: 0.5  // Less sensitive
```

### Enable smooth scrolling on touch devices:
```javascript
smoothTouch: true  // Enable (may impact performance on mobile)
```

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Disabling on Specific Elements
To prevent smooth scroll on specific elements (e.g., horizontal sliders):

```html
<div data-lenis-prevent>
    <!-- Scroll behavior won't be affected by Lenis here -->
</div>
```

## Programmatic Control
The Lenis instance is available globally:

```javascript
// Stop scrolling
window.lenis.stop();

// Start scrolling
window.lenis.start();

// Scroll to element
window.lenis.scrollTo('#section-id');

// Scroll to specific position
window.lenis.scrollTo(1000); // pixels
```

## Resources
- [Lenis GitHub](https://github.com/studio-freight/lenis)
- [Lenis Documentation](https://lenis.darkroom.engineering/)

## Rollback
If you need to revert to the old smooth scroll:
1. Replace `lenis-init.js` reference with `smooth-scroll.js` in `index.html`
2. Remove the `class="lenis"` from the `<html>` tag
3. Remove Lenis CDN script tag
