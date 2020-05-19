import { Observable } from "rxjs";

export interface IAudioTranscoder {
  transcode(inputPath: string, format: "mp3" | "wav"): Observable<string>;
}
