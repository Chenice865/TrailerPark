import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, getDoc, addDoc, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import firebaseConfig from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function getFavourites(renderFun){
    const favouritesRef = collection(db, 'favourites');
    // console.log('hello')
    const querySnapshot = await getDocs(favouritesRef);
    const faveTrailers = [];
    querySnapshot.forEach((doc) => {
       
        faveTrailers.push(doc.data()); 
    });
    renderFun(faveTrailers);
}

async function addFavourite(title){
     
    const fave = addDoc(collection(db, "favourites"), {title});
    return fave;
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