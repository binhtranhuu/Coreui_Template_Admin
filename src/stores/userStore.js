import { action, makeObservable, observable } from 'mobx';
class UserStore {
	constructor() {
		makeObservable(this, {
			data: observable,
			isLogin: observable,
			addData: action,
			removeData: action
		});
	}

	isLogin = "Fail";

	data = [];

	checkLogin(val) {
		this.isLogin = val;
	}

	addData(item) {
		this.data.push(item);
	}

	removeData(item) {
		this.data.splice(this.data.indexOf(item), 1);
	}

}
export default UserStore;