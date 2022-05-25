 import {ADD_FIRSTLINE,ADD_POSTCODE,ADD_CONTACT, ADD_ITEMS_TO_CART, REMOVE_ITEMS_FROM_CART, SET_MODAL_VISIBLE1,SET_MODAL_VISIBLE2, DELETE_ADDRESS, SELECT_ADDRESS, CLEAR_ITEMS, SET_ORDER_COMPLETED} from "./actions.js"
 
 
 let InitialState = {
     selectedMenu : {items:[], shopName:"", shopImage:""},
     modalVisible1:false,
     modalVisible2:false,
     deliveryAddress:{firstLine:"",postCode:"",contact:""},
     selectAddress:{},
     orderCompleted:false
 }


 let cartReducer = (state = InitialState, action) =>{
        switch(action.type){

            case ADD_ITEMS_TO_CART:{
                let newState = {...state}

                newState.selectedMenu = {
                    items : [...newState.selectedMenu.items, action.payload.item],
                    shopName: action.payload.shopName,
                    shopImage:action.payload.shopImage
                }
                
                return newState
            }
            case REMOVE_ITEMS_FROM_CART:{
                let newState = {...state}
                
                let filter1 = newState.selectedMenu.items.filter((item)=>action.payload.item.title===item.title)
                let filter2 = newState.selectedMenu.items.filter((item)=>action.payload.item.title!=item.title)
                
                filter1.splice(0,1)

                let updateditemList = [...filter1,...filter2]
                newState.selectedMenu.items = updateditemList                   

                
                return newState      
            }
            case SET_MODAL_VISIBLE1:{
                let newState = {...state}
                newState.modalVisible1 = !newState.modalVisible1;
              
                return newState
            }
            case SET_MODAL_VISIBLE2:{
                let newState = {...state}
                newState.modalVisible2 = !newState.modalVisible2;
             
                return newState
            }
            case ADD_FIRSTLINE:{
                let newState = {...state}
                newState.deliveryAddress={...newState.deliveryAddress, firstLine:action.payload}
                
                return newState
            }
            case ADD_POSTCODE:{
                let newState = {...state}
                newState.deliveryAddress.postCode =action.payload
                return newState
            }
            case ADD_CONTACT:{
                let newState = {...state}
                newState.deliveryAddress.contact = action.payload
                return newState
            }
            case DELETE_ADDRESS:{
                let newState = {...state}
                newState.deliveryAddress={firstLine:'',postCode:'',contact:''}
                return newState
            }
            case SELECT_ADDRESS:{
                let newState = {...state}
                newState.selectAddress=action.payload
                console.log(newState)
                return newState
            }
            case CLEAR_ITEMS:{
                let newState = {...state}

                newState.selectedMenu = {items:[],shopName:"",shopImage:""}

                return newState
            }
            case SET_ORDER_COMPLETED:{
                let newState = {...state}

                newState.orderCompleted= !newState.orderCompleted
                return newState
            }
            default:
                return state
            }
    
 }

 export default cartReducer