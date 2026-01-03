// Fix: Add global type definitions for A-Frame elements to resolve JSX errors
import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-entity': any;
      'a-camera': any;
      'a-marker': any;
      'a-light': any;
      'a-assets': any;
      'a-asset-item': any;
      'a-box': any;
      'a-sky': any;
      'a-cursor': any;
    }
  }
}
