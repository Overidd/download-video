import {
  IVideoInfo,
  IPlaylistInfo,
  IDownloadOptions,
  IMessageWS,
  IEvents,
} from '@/interface';

export class DownloadService {
  private readonly URLAPI: string;
  private ws: WebSocket | null = null;

  constructor() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) throw new Error('NEXT_PUBLIC_API_URL no está definido');
    this.URLAPI = apiUrl;
  }

  async getInfo(url: string): Promise<IVideoInfo | IPlaylistInfo> {
    try {
      const res = await fetch(`${this.URLAPI}/api/getInfo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Error al obtener información');
      return json.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async downloadVideo(
    options: IDownloadOptions,
    events: IEvents = {}
  ): Promise<WebSocket> {
    const { onProgress, onDone, onPaused, onCanceled, onError, onFinished } = events;

    const protocol =
      this.URLAPI.startsWith('https') || window.location.protocol === 'https:'
        ? 'wss'
        : 'ws';

    const wsUrl = `${protocol}://${this.URLAPI.replace(/^https?:\/\//, '')}/api/download`;

    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('🔗 Conectado al servidor WebSocket');
      this.ws?.send(JSON.stringify({ action: 'start', options }));
    };

    this.ws.onmessage = (event) => {
      try {
        const data: IMessageWS = JSON.parse(event.data);

        switch (data.type) {
          case 'progress':
            onProgress?.(data.value);
            break;
          case 'done':
            onDone?.();
            break;
          case 'paused':
            onPaused?.();
            break;
          case 'canceled':
            onCanceled?.();
            break;
          case 'error':
            onError?.(data.message ?? 'Error desconocido');
            break;
          default:
            break;
        }
      } catch (error) {
        console.error('Error al procesar mensaje WebSocket:', error);
        onError?.('Error al procesar mensaje WebSocket');
      }
    };

    this.ws.onerror = (err) => {
      onError?.(`Error: ${err}`);
    };

    this.ws.onclose = (event) => {
      onFinished?.();
    };

    return this.ws;
  }

  pause() {
    this.ws?.send(JSON.stringify({ action: 'pause' }));
  }

  resume() {
    this.ws?.send(JSON.stringify({ action: 'resume' }));
  }

  cancel() {
    this.ws?.send(JSON.stringify({ action: 'cancel' }));
    this.ws?.close();
    this.ws = null;
  }
}