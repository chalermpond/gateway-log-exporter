import { LoggerService } from "@nestjs/common";

export interface IBasicLogger extends LoggerService {
  getFilePath(): string;
}
