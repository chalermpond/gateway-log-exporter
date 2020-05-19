import { IAudioDecoder } from "./interface/audio-decoder.interface";
import { Observable } from "rxjs";
import * as ChildProcess from "child_process";
import { RuntimeException } from "@nestjs/core/errors/exceptions/runtime.exception";
import * as FileSystem from "fs";
import * as Crypto from "crypto";
import { FileCleanser } from "./file-cleanser";

export class AudioDecoder implements IAudioDecoder {
  private readonly _tmpDir: string = "./temp/audio-decoder";

  constructor(private readonly _encPassword: string) {
    FileSystem.mkdir(this._tmpDir, { recursive: true }, err => {
      if (err) {
        throw new RuntimeException("Cannot create temp directory for decoder");
      }
    });
    const openSsl = ChildProcess.spawn("openssl", ["version"]);
    openSsl.stdout.on("data", data => {
      console.log(`stdout: ${data}`);
    });

    openSsl.stderr.on("data", data => {
      console.error(`stderr: ${data}`);
    });

    openSsl.on("close", code => {
      console.log(`child process exited with code ${code}`);
    });
    openSsl.on("error", e => {
      console.log("error", e);
      throw new RuntimeException("Cannot find openssl for decoder");
    });
    const every3hours = 1000 * 60 * 60 * 3;
    const cleanser = new FileCleanser(this._tmpDir, every3hours);
    cleanser.start();
  }

  public decodeBuffer(buffer: Buffer): Observable<{ decodedFile: string }> {
    return new Observable(subscriber => {
      console.log("decoder start");
      const hash = Crypto.createHash("sha256");
      const uniqueId = hash.update(buffer).digest("hex");
      const tempFile = `${this._tmpDir}/enc_${uniqueId}.wav`;
      const decodedFile = `${this._tmpDir}/${uniqueId}.wav`;

      if (FileSystem.existsSync(decodedFile)) {
        console.log("use existing decoder");
        subscriber.next({
          decodedFile
        });
        subscriber.complete();
        return;
      }

      console.log("use new decoded file");
      FileSystem.writeFileSync(`${tempFile}`, buffer);

      console.log("");
      const openSsl = ChildProcess.spawn("openssl", [
        "enc",
        "-aes-256-cbc",
        "-d",
        "-in",
        tempFile,
        "-out",
        decodedFile,
        "-pass",
        `pass:${this._encPassword}`
      ]);

      openSsl.on("close", code => {
        console.log("sending file");
        FileSystem.unlinkSync(tempFile);
        subscriber.next({
          decodedFile
        });
        subscriber.complete();
      });
      openSsl.on("error", e => {
        subscriber.error(e);
      });
    });
  }
}
