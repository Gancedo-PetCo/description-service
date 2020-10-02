import DescriptionService from './index.jsx';
import SSR from './ssrComp.jsx';
ReactDOM.hydrate(<SSR />, document.getElementById('description'));
