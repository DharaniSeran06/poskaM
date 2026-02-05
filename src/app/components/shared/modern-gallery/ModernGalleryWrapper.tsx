'use client';

import React from 'react';
import ModernGallery from './index';
import type { GalleryItem } from './index';

interface ModernGalleryWrapperProps {
  items: GalleryItem[];
  title?: string;
  description?: string;
  className?: string;
}

const ModernGalleryWrapper: React.FC<ModernGalleryWrapperProps> = (props) => {
  return <ModernGallery {...props} />;
};

export default ModernGalleryWrapper;
