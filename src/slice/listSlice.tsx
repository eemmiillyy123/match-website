import { createSlice } from "@reduxjs/toolkit";

export interface PostListState {
    title: string;
    img:string
    context: string;
    selectBoard:string
}

export const listSlice=createSlice({
    name:'postList',
    initialState:[
        {
            title: '',
            img:'',
            context: '',
            selectBoard:''
        }
    ]as PostListState[],
    reducers:{
        createPost(state,action){
            console.log("Old postList:", state); 
            console.log("Action payload:", action.payload); 
            state.push(action.payload);
        }
    }
})
export const {createPost}=listSlice.actions;
export default listSlice.reducer;