export interface VideoProgress {
  id: string;                    // Video ID
  filename: string;              // File name
  status: 'downloading' | 'finished';  // Current status
  downloaded: number;            // Bytes downloaded
  downloaded_str: string;        // Readable downloaded size
  total: number;                 // Total bytes
  total_str: string;             // Readable total size
  speed: number;                 // Bytes per second
  speed_str: string;             // Readable speed
  eta: number;                   // Estimated time (seconds)
  eta_str: string;               // Readable ETA
  percent: number;               // Completion percentage (0–100)
  percent_str: string;           // Readable percentage
}