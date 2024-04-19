import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, getDoc, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import firebaseConfig from "./firebaseConfig.js";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function getFavourites(renderFun){
    const reviewsRef = collection(db, 'favourites');
    console.log('hello')
    const querySnapshot = await getDocs(reviewsRef);
    const reviews = [];
    querySnapshot.forEach((doc) => {
       
        reviews.push(doc.data());
        
    });
    renderFun(reviews);
}

async function addFavourite(title){
    return addDoc(collection(db, "favourites"), {title});
}

async function deleteReview(auth, reviewId){
    const reviewRef = doc(db, 'reviews', reviewId);
    const reviewDoc = await getDoc(reviewRef);
    
    if (reviewDoc.exists() && reviewDoc.data().userId === auth.currentUser.uid) {
        await deleteDoc(reviewRef);
        console.log("Review deleted successfully");
        return true;
    } else {
        console.log("Review not found or you don't have permission to delete it");
        return false;
    }
}

export {getFavourites, addFavourite, deleteReview};