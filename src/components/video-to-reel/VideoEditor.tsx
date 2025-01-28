import React, { useState, useEffect, createContext, useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

// Interfaces for type definitions
interface OutputConfig {
  format: string;
  fps: number;
  size: {
    width: number;
    height: number;
  };
}

interface AssetConfig {
  type: string;
  src: string;
}

interface ClipConfig {
  asset: AssetConfig;
  start?: string;
  length?: string;
  offset?: {
    x: number;
    y: number;
  };
  scale?: number;
  position?: string;
  opacity?: number;
}

interface TrackConfig {
  clips: ClipConfig[];
}

interface TemplateConfig {
  output: OutputConfig;
  timeline: {
    tracks: TrackConfig[];
  };
}

interface StyleConfig {
  stylesheet: string;
  logo: {
    url: string;
  };
}

interface StudioEditorProps {
  owner: string;
  interactive: boolean;
  timeline: boolean;
  sidepanel: boolean;
  controls: boolean;
  settings: boolean;
  style: StyleConfig;
  template: TemplateConfig;
  onUpdateEvent: (event: any) => void;
  onMetadataEvent: (event: any) => void;
}

interface ShotstackContextType {
  create?: (editorId: string, template: TemplateConfig, options: any) => void;
  on?: (event: string, callback: (event: any) => void) => void;
  off?: (event: string, callback: (event: any) => void) => void;
  load?: (editorId: string, json: any) => void;
}

export const VideoEditor: React.FC<{ selectedURL: string, setEditMode: (editMode: boolean) => void }> = ({ selectedURL, setEditMode }) => {
    const finedURL = selectedURL; //.split('.mp4')[0] + '.mp4';
  const firstTemplate: TemplateConfig = {
    output: {
      format: "mp4",
      fps: 25,
      size: {
        width: 540,
        height: 960
      }
    },
    timeline: {
      tracks: [
        {
          clips: [
            {
              asset: {
                type: "image",
                src: "https://amanpatel.in/media/kimmchi_logo.png"
              },
              start: "auto",
              length: "end",
              offset: {
                x: 0.429,
                y: -0.464
              },
              scale: 0.046,
              position: "center",
              opacity: 0.5
            }
          ]
        },
        {
          clips: [
            {
              asset: {
                src: "https://amanpatel.in/media/shorts.mp4",
                type: "video"
              },
              start: "auto",
              length: "auto"
            }
          ]
        }
      ]
    }
  };
  console.log('5555', firstTemplate);
  const [isRendering, setIsRendering] = useState(false);

  const [template, setTemplate] = useState<TemplateConfig>(firstTemplate);
  const shotstack = useShotstack();

  const style: StyleConfig = {
    stylesheet: 'https://amanpatel.in/media/sdk-custom.css',
    logo: {
      url: 'https://amanpatel.in/media/kimmchi_logo.png'
    },
  };

  const handleUpdateEvent = (event: any) => {
    console.log('Update event received:', event);
  };

  const handleMetadataEvent = (event: any) => {
    console.log('Metadata event received:', event);
  };

  const renderVideo = async () => {
    setIsRendering(true);
    try {
      const response = await fetch('http://localhost:8000/render', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(template),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Render response:', data);
    } catch (error) {
      console.error('Error rendering video:', error);
    }
    setIsRendering(false);
    setEditMode(false);
  };

  return (
    <ShotstackProvider>
      <div className="App">
        <Container>
          <Row>
            <Col xs={12}>
              <StudioEditor
                owner="oknugu1pfd"
                interactive={true}
                timeline={true}
                sidepanel={true}
                controls={true}
                settings={true}
                style={style}
                template={template}
                onUpdateEvent={handleUpdateEvent}
                onMetadataEvent={handleMetadataEvent}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: '20px' }}>
            <Col xs={12}>
                <Button 
                    onClick={() => setEditMode(false)} 
                    style={{ 
                    position: 'absolute', 
                    top: '75px', 
                    left: '350px', 
                    border: '2px solid #cecece', 
                    padding: '5px 15px', 
                    borderRadius: '5px', 
                    backgroundImage: 'linear-gradient(45deg, #5446E2, #E8489B)', 
                    color: '#fff' 
                    }}
                >
                    Back
              </Button>
              <Button 
                onClick={renderVideo} 
                style={{ 
                  position: 'absolute', 
                  top: '75px', 
                  right: '50px', 
                  border: '2px solid #cecece', 
                  padding: '5px 15px', 
                  borderRadius: '5px', 
                  backgroundImage: 'linear-gradient(45deg, #5446E2, #E8489B)', 
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
                disabled={isRendering}
              >
                {isRendering ? (
                  <>
                    Rendering...
                  </>
                ) : (
                  'Render Video'
                )}
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </ShotstackProvider>
  );
};

const StudioEditor: React.FC<StudioEditorProps> = ({
  owner,
  interactive,
  timeline,
  sidepanel,
  controls,
  settings,
  style,
  template,
  onUpdateEvent,
  onMetadataEvent,
}) => {
  const shotstack = useShotstack();

  useEffect(() => {
    if (!shotstack) return;

    const options = {
      owner,
      controls,
      interactive,
      timeline,
      settings,
      sidepanel,
      style,
    };

    if (shotstack.create) {
      shotstack.create('studio-sdk-editor', template, options);
    } else {
      console.error('Shotstack create method is not available');
    }

    if (shotstack.on) {
      shotstack.on('update', onUpdateEvent);
      shotstack.on('metadata', onMetadataEvent);
    } else {
      console.error('Shotstack on method is not available');
    }

    return () => {
      if (shotstack.off) {
        shotstack.off('update', onUpdateEvent);
      } else {
        console.error('Shotstack off method is not available');
      }
    };
  }, [shotstack, interactive, timeline, sidepanel, settings, style, template, onUpdateEvent]);

  return <div id="studio-sdk-editor"></div>;
};

const ShotstackContext = createContext<ShotstackContextType | null>(null);

declare global {
  interface Window {
    shotstack: any;
  }
}

const ShotstackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shotstack, setShotstack] = useState<ShotstackContextType | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.shotstack.io/studio/0.5.4/shotstack.min.js';
    script.async = true;
    script.onload = () => {
      if (window.shotstack) {
        setShotstack({
          ...window.shotstack,
          load: (json: any) => window.shotstack.load('studio-sdk-editor', json),
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <ShotstackContext.Provider value={shotstack}>{children}</ShotstackContext.Provider>;
};

const useShotstack = () => {
  return useContext(ShotstackContext);
};

