
export type TFormatMedia =
  | 'mp4'
  | 'webm'
  | 'mov'

export type TFormatIdVideo =
  | '160' // 144p
  | '133' // 240p
  | '134' // 360p
  | '135' // 480p
  | '136' // 720p
  | '137' // 1080p
  | '264' // 1440p
  | '266' // 2160p (4K)
  | '298' // 1080p60
  | '299' // 1080p60 (alto bitrate)
  | '400' // 1440p60
  | '401' // 2160p60 (4K)
  | 'bv*' // video best
  | 'wv*'; // video worst

// Formatos de audio
export type TFormatIdAudio =
  | '249' // opus (50k)
  | '250' // opus (70k)
  | '251' // opus medium (160k)
  | '140' // m4a medium (128k)
  | '139' // m4a low (48k)
  | 'ba'  // best audio
  | 'wa'; // worst audio