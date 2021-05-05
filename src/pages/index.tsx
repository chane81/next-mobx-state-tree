import { observer } from 'mobx-react-lite';
import SampleComponent from '../components/SampleComponent';
import { useStore } from '../stores';

const Home = () => {
  const store = useStore();
  const { fooModel, barModel } = store;

  const handleFooClick = () => {
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
