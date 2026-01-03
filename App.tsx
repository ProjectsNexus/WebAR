import React, { useState } from 'react';
import { ARView } from './components/ARView';
import { SwipeBar } from './components/SwipeBar';
import { AR_MODELS } from './data/models';

const App: React.FC = () => {
  const [modelIndex, setModelIndex] = useState(0);

  const nextModel = () => {
    setModelIndex((prev) => (prev + 1) % AR_MODELS.length);
  };

  const prevModel = () => {
    setModelIndex((prev) => (prev - 1 + AR_MODELS.length) % AR_MODELS.length);
  };

  const currentModel = AR_MODELS[modelIndex];

  return (
    <div className="w-full h-full relative bg-transparent overflow-hidden">
      {/* Main AR Layer */}
      <ARView model={currentModel} />

      {/* Controls Layer */}
      <SwipeBar 
        onSwipeLeft={nextModel} 
        onSwipeRight={prevModel}
        currentLabel={`${currentModel.name} (${modelIndex + 1}/${AR_MODELS.length})`}
      />
    </div>
  );
};

export default App;