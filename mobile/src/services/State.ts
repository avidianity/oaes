import { State } from '@avidian/state';

const stateService = new State({
	storage: window.localStorage,
	key: 'oaes',
});

export default stateService;
