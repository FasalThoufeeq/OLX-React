import {useEffect,useState,useContext} from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { getFirestore,query,where,collection,getDocs } from 'firebase/firestore';
function View() {
  const[userDetails,setUserDetails]=useState();
  const {postDetails}=useContext(PostContext)
  console.log(postDetails,"onn kanichayo");
  const firestore=getFirestore()
  useEffect(()=>{
    const fetchData=async()=>{

      const {userId}=postDetails
      console.log(userId);
      const q = query(collection(firestore, "users"), where("id", "==", userId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserDetails(doc.data());
        console.log(userDetails);
      });
    }
    fetchData();
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails?.imageUrl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price} </p>
          <span>{postDetails?.productName}</span>
          <p>{postDetails?.category}</p>
          <span>{postDetails?.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.username}</p>
          <p>{userDetails?.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
