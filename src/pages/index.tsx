import { observer } from 'mobx-react-lite';
import { useStore } from '../stores';
import env from '../../env';

const Home = () => {
  const store = useStore();
  const { fooModel, barModel } = store;

  const handleFooClick = () => {
    console.log('env', env.MY_VAL);
    fooModel.setCount();
  };

  const handleBarClick = () => {
    barModel.setCount();
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

export const getServerSideProps = () => {
  console.log('server side: ', env.MY_VAL);

  return {
    props: {}
  };
};
