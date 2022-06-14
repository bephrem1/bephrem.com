import { EmptyObject } from '../global-types/empty';
import { FunctionComponent } from 'react';
import Home from '../components/page-segments/home/Home';
import PageBase from '../components/page-segments/PageBase';

const RootHomePage: FunctionComponent<EmptyObject> = () => {
  return (
    <PageBase>
      <Home />
    </PageBase>
  );
};

export default RootHomePage;