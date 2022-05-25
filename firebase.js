import {initializeApp} from 'firebase/app';
import {doc, deleteDoc,getDocs,addDoc, collection, getFirestore, orderBy, serverTimestamp, query, where, limit} from 'firebase/firestore';
import {getAuth, signOut} from 'firebase/auth';
import { set } from 'react-native-reanimated';

const firebaseConfig = {
    apiKey: "AIzaSyCRbGuJ4dBUXF6xfhhvy0A5nj5SNrBhSec",
    authDomain: "foodyo-react.firebaseapp.com",
    projectId: "foodyo-react",
    storageBucket: "foodyo-react.appspot.com",
    messagingSenderId: "395408015981",
    appId: "1:395408015981:web:e0e41fe6a28709a30f3564"
  };

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app);
export const authentication = getAuth(app);


export const addOrdersToFirestore = async (orderedItems,shopName, authentication, total, numItems, address,shopImage,dispatch,setOrderCompleted) => {
      await addDoc(collection(db, "orders"),{
        orderedItems:orderedItems,
        shopName:shopName,
        totalPrice:total,
        numItems:numItems,
        address:address,
        orderedAt:serverTimestamp(),
        uid: authentication.currentUser.uid,
        shopImage:shopImage
      })
      dispatch(setOrderCompleted())
    }


export const getLastOrder=async(authentication, setOrders, setLoad)=>{
  const orderRef = collection(db, "orders")
  setLoad(true)
  const q = query(orderRef, where("uid", "==", authentication.currentUser.uid), orderBy("orderedAt", "desc"), limit(1));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc)=>({...doc.data()}))
  setOrders(data[0].orderedItems)
  setLoad(false)
  console.log(data)
}



export const addDeliveryAddressToFirestore = async(authentication,firstLine, postCode, contact)=>{
  await addDoc(collection(db,"deliveryAddress"),{
    firstLine,
    postCode, 
    contact,
    uid:authentication.currentUser.uid
  })
}

export const getDeliveryAddressFromFirestore = async(authentication,setAddressList, addressList, setAddressLimit)=>{
  const addressRef = collection(db, "deliveryAddress")
  const q = query(addressRef, where("uid", "==", authentication.currentUser.uid));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc)=>({...doc.data(), id:doc.id}))
  setAddressList(data)
  addressList.length<3?setAddressLimit(false):<></>
  console.log(data)
}

export const deleteAddress=async(id)=>{
  await deleteDoc(doc(db, "deliveryAddress", id));
}

export const logOut = ()=>{
  signOut(authentication)
}

export const getCurrentUserDetails = async(authentication, setUserDetails,setLoad) =>{
  const q= query(collection(db, "users"), where("id","==",authentication.currentUser.uid))
  setLoad(true)
  const querySnapShot = await getDocs(q)
  const data = querySnapShot.docs.map((doc)=>(doc.data()))
  console.log(authentication.currentUser.uid)
  setLoad(false)
  setUserDetails(data[0])
}

export const getPastOrders=async(authentication, setPastOrders, setLoad)=>{
  const orderRef = collection(db, "orders")
  setLoad(true)
  const q = query(orderRef, where("uid", "==", authentication.currentUser.uid), orderBy("orderedAt", "desc"));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc)=>({...doc.data()}))
  setPastOrders(data)
  setLoad(false)
  console.log(data)
}
