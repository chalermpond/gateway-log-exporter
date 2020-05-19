import { from, interval, Observable } from "rxjs";
import { concatMap, tap } from "rxjs/operators";
import * as FileSystem from "fs";
import * as Moment from "moment";

export class FileCleanser {
  private _isStarted: boolean = false;

  constructor(
    private readonly _directory: string,
    private readonly _intervalMs: number,
    private readonly _expirePeriodHours: number = 3
  ) {}

  public start() {
    if (this._isStarted) {
      return;
    }

    this._isStarted = true;
    interval(this._intervalMs)
      .pipe(
        concatMap(() => {
          return from(FileSystem.readdirSync(this._directory));
        }),
        tap((fileName: string) => {
          const fullPath = `${this._directory}/${fileName}`;
          const stat = FileSystem.statSync(fullPath);
          const isOneDayOld = Moment(stat.ctimeMs).isBefore(
            Moment().subtract(this._expirePeriodHours, "hour")
          );
          if (isOneDayOld) {
            console.log("delete old file", fullPath);
            FileSystem.unlinkSync(fullPath);
          }
        })
      )
      .subscribe();
  }
}
