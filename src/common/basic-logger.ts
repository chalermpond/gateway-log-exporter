import { LoggerService } from "@nestjs/common";
import * as FileSystem from "fs";
import * as Path from "path";
import { RuntimeException } from "@nestjs/core/errors/exceptions/runtime.exception";
import * as Moment from "moment";
import { IBasicLogger } from "./interface/basic-logger.interface";

export class BasicLogger implements IBasicLogger {
  private readonly _absPath: string;

  constructor(
    private readonly _context: string,
    private readonly _fileName: string
  ) {
    this._absPath = Path.resolve(`./logs/${this._fileName}`);
    FileSystem.mkdir("./logs", { recursive: true }, err => {
      if (err) {
        throw new RuntimeException(
          `Cannot create logs directory for [${this._context}]`
        );
      }
    });
  }

  public error(message: any, trace?: string, context?: string): any {
    FileSystem.appendFileSync(
      this._absPath,
      `${this._getFormattedDate()} [ERROR] ${message}\n`
    );
  }

  public log(message: any, context?: string): any {
    FileSystem.appendFileSync(
      this._absPath,
      `${this._getFormattedDate()} [INFO] ${message}\n`
    );
  }

  public warn(message: any, context?: string): any {
    FileSystem.appendFileSync(
      this._absPath,
      `${this._getFormattedDate()} [WARN] ${message}\n`
    );
  }

  private _getFormattedDate(): string {
    const timeFormat = Moment().format("YYYY-MM-DD HH:mm:ss.SSSZZ");
    return `[${timeFormat}] [${this._context}]`;
  }

  public getFilePath(): string {
    return this._absPath;
  }
}
