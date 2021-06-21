import { observer } from 'mobx-react-lite';
import { initializeStore, IStore, useStore } from '../stores';
import { GetServerSideProps } from 'next';
import { getSnapshot } from 'mobx-state-tree';
import env from '../../env';

const Home = ({ initialState }) => {
  /**
   * 아래와 같이 did not match 서버 <-> 클라이언트 warning 메시지가 나올 수 있는데
   * useStore 사용시 서버에서 전달한 initialState 를 인자값으로 전달하여 warning 를 지울 수 있다.
   * Warning: Text content did not match. Server: "0" Client: "3"
   */
  const store = useStore(initialState);
  const { fooModel, barModel } = store;

  const handleFooClick = () => {
    fooModel.addCount();
  };

  const handleBarClick = () => {
    barModel.addCount();
  };

  console.log('rendering');

  return (
    <div>
      <div>
        <button onClick={handleFooClick}>fooSet</button>
      </div>
      <div>
        <button onClick={handleBarClick}>barSet</button>
      </div>
      <div></div>
      <div>foo count: {fooModel.count}</div>
      <div>bar count: {barModel.count}</div>
    </div>
  );
};

export default observer(Home);

export const getServerSideProps: GetServerSideProps = async () => {
  console.log('server side: ', env.MY_VAL);

  const store = initializeStore();
  store.fooModel.setCount(3);

  const initialState = getSnapshot<IStore>(store);

  console.log('initialState', initialState);

  return {
    props: {
      initialState
    }
  };
};
