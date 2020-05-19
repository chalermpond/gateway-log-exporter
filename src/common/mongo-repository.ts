import {
    AggregationCursor,
    Collection,
    Cursor,
} from 'mongodb'

import {
    from,
    Observable,
    Observer,
} from 'rxjs'

import {
    IRepository,
    IRepositoryMapping,
} from './interface/repository.interface'
import { IEntity } from './interface/entity.interface'

/**
 * Abstract MongoRepository class
 */
export class MongoRepository<M extends IEntity> implements IRepository<M> {
    protected _collection: Collection
    protected _mapper: IRepositoryMapping<M, any>

    protected constructor(
        collection: Collection,
        mapper: IRepositoryMapping<M, any>,
    ) {
        this._collection = collection
        this._mapper = mapper
    }

    public toDocument(model: M): any {
        return this._mapper.serialize(model)
    }

    public toModel(object: any): M {
        return this._mapper.deserialize(object)
    }

    public toObservable(source: Cursor): Observable<M> {
        const self = this
        const observablePipe = (observer: Observer<M>) => {
            source
                .stream()
                .on('data', (document: any) => {
                    observer.next(self.toModel(document))
                })
                .on('end', () => {
                    source.close()
                    observer.complete()
                })
                .on('error', (err: Error) => {
                    source.close()
                    observer.error(err)
                })
        }
        return new Observable(observablePipe)
    }

    public toRawObservable(source: Cursor): Observable<any> {
        const observablePipe = (observer: Observer<M>) => {
            source
                .on('data', (document: any) => {
                    observer.next(document)
                })
                .on('end', () => {
                    source.close()
                    observer.complete()
                })
                .on('error', (err: Error) => {
                    source.close()
                    observer.error(err)
                })
        }
        return new Observable(observablePipe)
    }

    public toObservableFromAggregateCursor(
        source: AggregationCursor,
    ): Observable<M> {
        const self = this
        const observablePipe = (observer: Observer<M>) => {
            source
                .on('data', (document: any) => {
                    observer.next(self.toModel(document))
                })
                .on('end', () => {
                    source.close()
                    observer.complete()
                })
                .on('error', (err: Error) => {
                    source.close()
                    observer.error(err)
                })
        }
        return new Observable(observablePipe)
    }

    public list(page: number = 1, limit: number = 20): Observable<any> {
        const startFrom = (page - 1) * limit
        const mongoCursor = this._collection
            .find()
            .skip(startFrom)
            .limit(limit)
        return from(this.toObservable(mongoCursor))
    }

    public total(): Observable<number> {
        return undefined
    }
}
