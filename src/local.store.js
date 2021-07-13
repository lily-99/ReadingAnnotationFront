import axios from 'axios';
class LocalStore {
    constructor(id) {
        this.key = id !== undefined ? `highlight-mengshou-${id}` : 'highlight-mengshou';
    }

    // storeToJson() {
    //     // 查询公共高亮
    //     axios.get(axios.defnaults.baseURL +"articleTask/showPublicHighlightInfoList", {
    //         params: {
    //             articleId: 1,
    //             //groupId:2,
    //             //userId:1,
    //             //currentAuthority: 1
    //         }
    //     }).then(function (response) {
    //         const store = JSON.stringify(response.data.data);
    //         let sources;
    //         try {
    //             sources = JSON.parse(store) || [];
    //         }
    //         catch (e) {
    //             sources = [];
    //         }
    //         return sources;
    //     }).catch(function (error) {
    //         alert(error);
    //         return [];
    //     });
    // }

    jsonToStore(stores) {
        localStorage.setItem(this.key, JSON.stringify(stores));// 改为 调用api 存入后台
    }

    save(authority, highlightInfo) {
        var articleId = sessionStorage.getItem("readingtaskId");
        var groupId = localStorage.getItem("groupId");
        var userId = localStorage.getItem("userId");

        // console.log(articleId);
        // console.log(groupId);
        // console.log(userId);
        // console.log(authority);


        if (authority == 0 || authority == 2) {
            groupId = 0;
        }


        axios.post(axios.defaults.baseURL + "articleTask/insertHighlight", {
            articleId: articleId,
            groupId: groupId,
            userId: userId,
            currentAuthority: authority,
            highlightInfo
        }).then(ret => {
            // console.log('data submitted')
        })

    }

    forceSave(store) {
        const stores = this.storeToJson();
        stores.push(store);
        this.jsonToStore(stores);
    }

    // remove(id) {
    //     var userId = localStorage.getItem("userId");
    //     axios.get(axios.defaults.baseURL + "articleTask/deleteHighlight", {
    //         params: {
    //             userId: userId,
    //             highlightId: id
    //         }
    //     }).then(ret => {
    //         let code = ret.data.status;
    //         return code;
    //         //sessionStorage.setItem("code",code);
    //     })
    // }

    getAll() {
        return this.storeToJson();
    }

    removeAll() {
        this.jsonToStore([]);
    }
}

export default LocalStore;