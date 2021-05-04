import { getSnapshot } from 'mobx-state-tree';
import { initializeStore, useStore } from '../stores';

const Ssr = (props) => {
  console.log('ssr props initialState', props.initialState);
  const store = useStore();

  console.log('useStore state', store.barModel.barVal);

  return <div>ssr page</div>;
};

// _app.tsx에서 pageProps.initialState 로 받고 있으므로 props 로 initialState에
// state 를 담아 전달하면 클라이언트에서 쓸 수 있다.
export const getServerSideProps = () => {
  const store = initializeStore();

  store.barModel.setBarVal('ssr set');

  const initialState = getSnapshot(store);

  return { props: { initialState } };
};

export default Ssr;
