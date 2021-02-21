import { action, makeObservable, observable } from 'mobx';

class ThemeStore {
	
	sidebarShow = "responsive";
	
	constructor() {
		makeObservable(this, {
			sidebarShow: observable,
			set: action
		});
	}

	set(val) {
		this.sidebarShow = val;
	}
}

export default ThemeStore;