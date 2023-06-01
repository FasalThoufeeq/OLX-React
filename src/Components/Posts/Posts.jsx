import { useEffect, useContext, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Heart from "../../assets/Heart";
import "./Post.css";
import { PostContext } from "../../store/PostContext";
import { useNavigate } from "react-router-dom";
import SearchContext from "../../store/searchContext";

function Posts() {
  const [products, setProducts] = useState([]);
  const firestore = getFirestore();
  const {searchValue}=useContext(SearchContext)
  const navigate=useNavigate()
  const {setPostDetails}=useContext(PostContext)
  
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "products"));
      const allPosts = querySnapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id,
        };
      });
      console.log(allPosts);
      setProducts(allPosts);
      console.log(products);
    };

    fetchData();
  }, []);
  

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.filter((product)=>{
            if(searchValue==''){
              return product
            }else if(product.productName.toLowerCase().includes(searchValue.toLowerCase())||product.category.toLowerCase().includes(searchValue.toLowerCase())){
              return product
            }
          }).map((product,index) => {
            return (
              <div key={index} onClick={()=>{
                setPostDetails(product)
                navigate('/viewPost')
              }} className="card" style={{backgroundColor:'white'}}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.imageUrl} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.productName}</p>
                </div>
                
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}

export default Posts;
