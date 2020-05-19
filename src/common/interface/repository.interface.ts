import {Observable} from 'rxjs'
import {IEntity} from './entity.interface'

export interface IRepository<T> {
  list(page?: number, limit?: number): Observable<T>;
  total(): Observable<number>;
  toObservable(input: any): Observable<T>;
}

export interface IRepositoryMapping<M extends IEntity, S> {
  serialize(model: M): S;
  deserialize(schema: S): M;
}
