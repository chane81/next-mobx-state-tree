import { useMemo } from 'react';
import {
  applySnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types
} from 'mobx-state-tree';
import { enableStaticRendering } from 'mobx-react';
import fooStore from './foo/fooStore';
import barStore from './bar/barStore';

let initStore: IStore | undefined = null as any;

/** 서버 여부 true/false */
const isServer = typeof window === 'undefined';

/** mobx ssr 사용시 gc 문제 방지설정 (아래 내용 참고)
 * https://mobx.js.org/react-integration.html#tips
 * Server Side Rendering (SSR)
 * If is used in server side rendering context; make sure to call , so that won't subscribe to any observables used, and no GC problems are introduced
 */
enableStaticRendering(isServer);

/** root store */
const store = types.model('store', {
  /** 스토어 아이덴티티 */
  identifier: types.optional(types.identifier, 'store'),
  /** foo model */
  fooModel: types.optional(fooStore.model, () => fooStore.create),
  /** barModel model */
  barModel: types.optional(barStore.model, () => barStore.create)
});

/** default state value */
const defaultValue = {
  fooModel: { ...fooStore.defaultValue },
  barModel: { ...barStore.defaultValue }
};

/** 스토어 initialize */
/** 참고: https://github.com/vercel/next.js/blob/master/examples/with-mobx-state-tree-typescript/store.ts */
const initializeStore = (snapshot: any = null): IStore => {
  const _store = initStore ?? store.create(defaultValue);

  // snapshot 인자값을 _store 스냅샷으로 적용
  if (snapshot) {
    applySnapshot(_store, snapshot);
  }

  // ssr 일 경우 기존 사용하던 상태값을 리턴(snapshot 가 있을 경우 스냅샷으로 적용 후 리턴)
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;

  // 클라이언트일 경우 한번만 생성
  // initStore 가 없을 경우 스냅샷 결과 또는 초기화값이 적용된 store 를 initStore 에 적용
  if (!initStore) initStore = _store;

  return initStore;
};

/** mobx 스토어 hooks */
const useStore = (initialState: any = null): IStore => {
  const rtnStore = useMemo(() => initializeStore(initialState), [initialState]);
  return rtnStore;
};

/** store export */
export { initializeStore, useStore };

/** type export */
export interface IStoreInjectType {
  store: IStore;
}
export type IStore = Instance<typeof store>;
export type IStoreSnapshotIn = SnapshotIn<typeof store>;
export type IStoreSnapshotOut = SnapshotOut<typeof store>;
export type { IFooModelType } from './foo/fooStore';
export type { IBarModelType } from './bar/barStore';
