import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc, writeBatch } from 'firebase/firestore';
import { db } from './config';
import { OrderDetails } from '../types';

const ORDERS_COLLECTION = 'orders';

// Get all orders from Firestore
export const fetchOrders = async (): Promise<OrderDetails[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, ORDERS_COLLECTION));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as OrderDetails;
      return { ...data, orderId: data.orderId || doc.id };
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    const saved = localStorage.getItem('onnodhara_orders');
    if (saved) return JSON.parse(saved);
    return [];
  }
};

// Save all orders to Firestore (batch write)
export const saveAllOrders = async (orders: OrderDetails[]): Promise<void> => {
  try {
    const batch = writeBatch(db);
    const ordersCol = collection(db, ORDERS_COLLECTION);

    // Delete existing
    const existing = await getDocs(ordersCol);
    existing.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    orders.forEach((order) => {
      const docRef = doc(ordersCol, order.orderId);
      batch.set(docRef, order);
    });

    await batch.commit();
  } catch (error) {
    console.error('Error saving orders:', error);
  }
};

// Add a single order
export const addOrder = async (order: OrderDetails): Promise<void> => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, order.orderId);
    await setDoc(docRef, order);
  } catch (error) {
    console.error('Error adding order:', error);
  }
};

// Update order status
export const updateOrderStatus = async (orderId: string, status: string): Promise<void> => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(docRef, { notes: `স্ট্যাটাস: ${status}` });
  } catch (error) {
    console.error('Error updating order:', error);
  }
};

// Delete an order
export const deleteOrder = async (orderId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, ORDERS_COLLECTION, orderId));
  } catch (error) {
    console.error('Error deleting order:', error);
  }
};