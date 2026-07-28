import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc, writeBatch } from 'firebase/firestore';
import { db } from './config';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

const PRODUCTS_COLLECTION = 'products';

// Convert Firestore doc to Product
const docToProduct = (doc: any): Product => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
  } as Product;
};

// Get all products from Firestore
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    if (querySnapshot.empty) {
      // If no products in Firestore, seed with defaults
      await seedDefaultProducts();
      return PRODUCTS;
    }
    return querySnapshot.docs.map(docToProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    // Fallback to local data
    const saved = localStorage.getItem('onnodhara_products');
    if (saved) return JSON.parse(saved);
    return PRODUCTS;
  }
};

// Save all products to Firestore (batch write)
export const saveAllProducts = async (products: Product[]): Promise<void> => {
  try {
    const batch = writeBatch(db);
    const productsCol = collection(db, PRODUCTS_COLLECTION);

    // Delete existing docs and set new ones
    const existing = await getDocs(productsCol);
    existing.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    products.forEach((product) => {
      const { id, ...data } = product;
      const docRef = doc(productsCol, product.id);
      batch.set(docRef, data);
    });

    await batch.commit();
  } catch (error) {
    console.error('Error saving products:', error);
  }
};

// Strip undefined fields from object (Firestore rejects undefined values)
const stripUndefined = (obj: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }
  return result;
};

// Add a single product
export const addProduct = async (product: Product): Promise<void> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, product.id);
    const { id, ...data } = product;
    await setDoc(docRef, stripUndefined(data));
  } catch (error) {
    console.error('Error adding product:', error);
  }
};

// Update a single product
export const updateProduct = async (product: Product): Promise<void> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, product.id);
    const { id, ...data } = product;
    await updateDoc(docRef, stripUndefined(data));
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

// Delete a single product
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

// Seed default products to Firestore
const seedDefaultProducts = async (): Promise<void> => {
  try {
    const batch = writeBatch(db);
    const productsCol = collection(db, PRODUCTS_COLLECTION);

    PRODUCTS.forEach((product) => {
      const { id, ...data } = product;
      const docRef = doc(productsCol, product.id);
      batch.set(docRef, data);
    });

    await batch.commit();
    console.log('Default products seeded to Firestore');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};