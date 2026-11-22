export interface HomeContent {
  title: string;
  description: string;
  heroVideoId: string;
  intro: string;
  mission: {
    title: string;
    body: string;
  };
  vision: {
    title: string;
    body: string;
  };
  about: string;
  highlights: {
    title: string;
    paragraphs: string[];
  };
  videosTitle: string;
}

export interface VideoSummary {
  title: string;
  youtubeId: string;
}

export interface HomePageProps {
  home: HomeContent;
  videos: VideoSummary[];
}
