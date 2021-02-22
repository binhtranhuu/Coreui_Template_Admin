import { action, makeObservable, observable, runInAction } from "mobx";
import userApi from "src/api/useApi";

class UserStore {
    constructor() {
        makeObservable(this, {
            userSignin: observable,
            error: observable,
            loading: observable,

            login: action,
            register: action,
            logout: action,
        });
    }

    loading = false;
    error = null;

    userSignin = {
        userInfo: localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo"))
            : null,
        token: localStorage.getItem("hms_token") ? localStorage.getItem("hms_token") : null,
    };

    login = async (payload) => {
        try {
            runInAction(() => {
                this.loading = true;
            });

            const { data } = await userApi.login(payload);

            runInAction(() => {
                this.loading = false;
            });

            const { access_token, expires_at, token_type, user } = data;
            localStorage.setItem("hms_token", `${token_type} ${access_token}`);
            localStorage.setItem("hms_token_expires_at", expires_at);
            localStorage.setItem("userInfo", JSON.stringify(user));

            runInAction(() => {
                this.userSignin = {
                    userInfo: localStorage.getItem("userInfo"),
                    token: localStorage.getItem("hms_token"),
                };
            });
        } catch (error) {
            runInAction(() => {
                this.loading = false;

                this.error =
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message;
            });
        }
    };

    register = async (payload) => {
        try {
            runInAction(() => {
                this.loading = true;
            });
            const res = await userApi.register(payload);

            runInAction(() => {
                this.loading = false;
            });

            return res.status;
            
        } catch (error) {
            runInAction(() => {
                this.loading = false;

                this.error =
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message;
            });
        }
    };

    logout = async () => {
        runInAction(() => {
            this.userSignin = {
                userInfo: null,
                token: null,
            };
        });

        localStorage.removeItem("userInfo");
        localStorage.removeItem("hms_token");
        localStorage.removeItem("hms_token_expires_at");

        return await userApi.logout();
    };
}
export default UserStore;
