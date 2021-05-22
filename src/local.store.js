import axios from 'axios';
class LocalStore {
    constructor(id) {
        this.key = id !== undefined ? `highlight-mengshou-${id}` : 'highlight-mengshou';
    }

    storeToJson() {
        // 查询公共高亮
        axios.get(axios.defnaults.baseURL +"articleTask/showPublicHighlightInfoList", {
            params: {
                articleId: 1,
                //groupId:2,
                //userId:1,
                //currentAuthority: 1
            }
        }).then(function (response) {
            const store = JSON.stringify(response.data.data);
            let sources;
            try {
                sources = JSON.parse(store) || [];
            }
            catch (e) {
                sources = [];
            }
            return sources;
        }).catch(function (error) {
            alert(error);
            return [];
        });
    }

    jsonToStore(stores) {
        localStorage.setItem(this.key, JSON.stringify(stores));// 改为 调用api 存入后台
    }

    save(authority, highlightInfo) {
        axios.post(axios.defaults.baseURL +"articleTask/insertHighlight", {
            articleId: 1,
            groupId: 2,
            userId: 3,
            currentAuthority: authority,
            highlightInfo
        }).then(ret => {
            console.log('data submitted')
        })

    }

    forceSave(store) {
        const stores = this.storeToJson();
        stores.push(store);
        this.jsonToStore(stores);
    }

    remove(id) {
        axios.get(axios.defaults.baseURL +"articleTask/deleteHighlight", {
            params: {
                userId: 1,
                highlightId: id
            }
        }).then(ret => {
            let code = ret.data.status;
            console.log(ret.data.status)
            if (code == 0)
                return false;
        })
    }

    getAll() {
        return this.storeToJson();
    }

    removeAll() {
        this.jsonToStore([]);
    }
}

export default LocalStore;