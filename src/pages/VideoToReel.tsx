import React, { useState } from 'react';
import { VideoSettings } from '../components/video-to-reel/VideoSettings';
import { ReelSettings } from '../components/video-to-reel/ReelSettings';
import { CreateReel } from '../components/video-to-reel/CreateReel';

export const VideoToReel: React.FC = () => {
  const [step, setStep] = useState(1);
  const [settings, setSettings] = useState({
    projectName: '',
    videoUrl: '',
    language: 'English',
    reelLength: 'Auto',
    addSubtitles: true,
    addHeadline: true,
    numberOfClips: 10,
    keywords: ''
  });

  const handleVideoUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setSettings(prev => ({ ...prev, videoUrl: url }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <VideoSettings
            projectName={settings.projectName}
            videoUrl={settings.videoUrl}
            onProjectNameChange={(name) => setSettings(prev => ({ ...prev, projectName: name }))}
            onVideoUrlChange={(url) => setSettings(prev => ({ ...prev, videoUrl: url }))}
            onVideoUpload={handleVideoUpload}
            onNext={() => setStep(2)}
          />
        );
      case 2:
        return (
          <ReelSettings
            {...settings}
            onLanguageChange={(lang) => setSettings(prev => ({ ...prev, language: lang }))}
            onReelLengthChange={(length) => setSettings(prev => ({ ...prev, reelLength: length }))}
            onSubtitlesToggle={() => setSettings(prev => ({ ...prev, addSubtitles: !prev.addSubtitles }))}
            onHeadlineToggle={() => setSettings(prev => ({ ...prev, addHeadline: !prev.addHeadline }))}
            onNumberOfClipsChange={(num) => setSettings(prev => ({ ...prev, numberOfClips: num }))}
            onKeywordsChange={(keywords) => setSettings(prev => ({ ...prev, keywords }))}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        );
      case 3:
        return (
          <CreateReel
            {...settings}
            onBack={() => setStep(2)}
            onGenerate={() => {
              // Handle reel generation
              console.log('Generating reel with settings:', settings);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50">
      {step < 4 && (
        <div className="p-4 md:p-12">
          <div className="max-w-[1920px] mx-auto">
            <div className="w-full">
              {renderStep()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};