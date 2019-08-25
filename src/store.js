import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { log } from 'util';
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        list: [],
        inputValue: 'abcdd',
        nextID: 5
    },
    mutations: {
        initList(state, data) {
            state.list = data
        },
        setInputValue(state, val) {
            state.inputValue = val
        },
        //添加列表项
        addItem(state) {
            const obj = {
                id: state.nextID,
                info: state.inputValue.trim(),
                done: false
            }
            state.list.push(obj)
            state.nextID++
                state.inputValue = ''
        },
        //删除列表项
        removeItem(state, id) {
            //根据id查找对应项的索引
            const i = state.list.findIndex(x => x.id === id)
                //根据索引删除元素
            if (i != -1) {
                state.list.splice(i, 1)
            }
        }

    },
    actions: {
        getList(context) {
            axios.get('/list.json').then(({ data }) => {
                console.log(data);
                context.commit('initList', data)
            })
        },
    },
})