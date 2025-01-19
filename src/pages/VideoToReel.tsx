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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-2">
            Video to Reel
          </h1>
          <p className="text-indigo-600">
            Convert your videos into engaging social media reels
          </p>
        </div>

        <div className="mb-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between relative">
              {[1, 2, 3].map((stepNumber) => (
                <React.Fragment key={stepNumber}>
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      stepNumber === step
                        ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white'
                        : stepNumber < step
                        ? 'bg-indigo-200 text-indigo-700'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {stepNumber}
                    </div>
                    <span className="mt-2 text-sm font-medium text-indigo-900">
                      {stepNumber === 1 ? 'Video Settings' : stepNumber === 2 ? 'Reel Settings' : 'Create'}
                    </span>
                  </div>
                  {stepNumber < 3 && (
                    <div className={`flex-1 h-1 ${
                      stepNumber < step ? 'bg-gradient-to-r from-indigo-500 to-pink-500' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {renderStep()}
      </div>
    </div>
  );
};