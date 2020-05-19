import { IAudioTranscoder } from "./interface/audio-transcoder";
import { from, Observable } from "rxjs";
import * as Crypto from "crypto";
import * as FileSystem from "fs";
import * as ChildProcess from "child_process";
import { RuntimeException } from "@nestjs/core/errors/exceptions/runtime.exception";

export class FfmpegTranscoder implements IAudioTranscoder {
  private readonly _tmpDir: string = "./temp/ffmpeg-decoder";

  constructor() {
    FileSystem.mkdir(this._tmpDir, { recursive: true }, err => {
      if (err) {
        throw new RuntimeException(
          "Cannot create temp directory for ffmpeg transcoder"
        );
      }
    });
  }

  public transcode(
    inputPath: string,
    format: "mp3" | "wav"
  ): Observable<string> {
    return new Observable(subscriber => {
      console.log("transcoder start");
      const hash = Crypto.createHash("sha256");
      const uniqueId = hash.update(inputPath).digest("hex");
      console.log(uniqueId);
      const decodedFile = `${this._tmpDir}/${uniqueId}.${format}`;

      if (FileSystem.existsSync(decodedFile)) {
        console.log("use existing ffmpeg transcoder");
        subscriber.next(decodedFile);
        subscriber.complete();
        return;
      }

      console.log("use new ffmpeg decoded file");
      const ffmpeg = ChildProcess.spawn("./ffmpeg", [
        "-i",
        inputPath,
        "-ar",
        "44100",
        "-ac",
        "1",
        "-b:a",
        "128k",
        decodedFile
      ]);

      ffmpeg.on("close", code => {
        subscriber.next(decodedFile);
        subscriber.complete();
      });
      ffmpeg.on("error", e => {
        subscriber.error(e);
      });
    });
  }
}
