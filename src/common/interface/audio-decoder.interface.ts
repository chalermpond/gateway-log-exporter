import { Observable } from "rxjs";

export interface IAudioDecoder {
  decodeBuffer(buffer: Buffer): Observable<{ decodedFile: string }>;
}
