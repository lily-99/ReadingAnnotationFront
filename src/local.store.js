import axios from 'axios';
class LocalStore {
    constructor(id) {
		this.key = id !== undefined ? `highlight-mengshou-${id}` : 'highlight-mengshou';
    }

    storeToJson() {
        const store = localStorage.getItem(this.key);
        let sources;
        try {
            sources = JSON.parse(store) || [];
        }
        catch (e) {
            sources = [];
        }
        return sources;
    }

    jsonToStore(stores) {
        localStorage.setItem(this.key, JSON.stringify(stores));// 改为 调用api 存入后台
    }

    save(highlightInfo) {
        axios.post('http://10.147.51.25:8080/readingannotation/articleTask/insertHighlight',{
          articleId:1,
          groupId:2,
          userId:3,
          currentAuthority: 1,
          highlightInfo
      }).then(ret=>{
        console.log('data submitted')
      })
        // const stores = this.storeToJson();
        // const map = {};
        // stores.forEach((store, idx) => map[store.hs.id] = idx);

        // if (!Array.isArray(data)) {
        //     data = [data];
        // }

        // data.forEach(store => {
        //     // update
        //     if (map[store.hs.id] !== undefined) {
        //         stores[map[store.hs.id]] = store;
        //     }
        //     // append
        //     else {
        //         stores.push(store);
        //     }
        // })
        // this.jsonToStore(stores);
    }

    forceSave(store) {
        const stores = this.storeToJson();
        stores.push(store);
        this.jsonToStore(stores);
    }

    remove(id) {
    //     axios.post('http://10.147.51.25:8080/readingannotation/articleTask/deleteHighlight?highlightId=id',{
    //       articleId:1,
    //       groupId:2,
    //       userId:3,
    //       currentAuthority: 1,
    //       highlightInfo
    //   }).then(ret=>{
    //     console.log('data submitted')
    //   })
        const stores = this.storeToJson();
        let index = null;
        for (let i = 0; i < stores.length; i++) {
            if (stores[i].hs.id === id) {
                index = i;
                break;
            }
        }
        stores.splice(index, 1);
        this.jsonToStore(stores);
    }

    getAll() {
        return this.storeToJson();
    }

    removeAll() {
        this.jsonToStore([]);
    }
}

export default LocalStore;