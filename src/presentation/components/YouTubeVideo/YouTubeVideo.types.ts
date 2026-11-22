export interface YouTubeVideoProps {
  youtubeId: string;
  title: string;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
  cover?: boolean;
  loading?: "lazy" | "eager";
  class?: string;
}
