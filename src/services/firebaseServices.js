import { db, storage } from "../firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";


// =============================
// Upload Image
// =============================
export const uploadImage = async (file) => {
  const imageRef = ref(
    storage,
    `products/${Date.now()}-${file.name}`
  );

  await uploadBytes(imageRef, file);

  return await getDownloadURL(imageRef);
};


// =============================
// PRODUCT FUNCTIONS
// =============================

// Save Product
export const saveProduct = async (
  collectionName,
  product
) => {
  await addDoc(
    collection(db, collectionName),
    {
      ...product,
      createdAt: serverTimestamp(),
    }
  );
};

// Get Products
export const getProducts = async (
  collectionName
) => {

  const snapshot = await getDocs(
    collection(db, collectionName)
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

};

// Delete Product
export const deleteProduct = async (
  collectionName,
  id
) => {

  await deleteDoc(
    doc(db, collectionName, id)
  );

};


// =============================
// ORDER FUNCTIONS
// =============================

// Save Order
export const saveOrder = async (order) => {

  await addDoc(
    collection(db, "orders"),
    {
      ...order,
      status: "Pending",
      createdAt: serverTimestamp(),
    }
  );

};

// Get All Orders
export const getOrders = async () => {

  const snapshot = await getDocs(
    collection(db, "orders")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

};

// Update Order Status
export const updateOrderStatus = async (
  id,
  status
) => {

  await updateDoc(
    doc(db, "orders", id),
    {
      status,
    }
  );

};

// Delete Order
export const deleteOrder = async (id) => {

  await deleteDoc(
    doc(db, "orders", id)
  );

};

// Get User Orders
export const getUserOrders = async (
  userId
) => {

  const q = query(
    collection(db, "orders"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

};