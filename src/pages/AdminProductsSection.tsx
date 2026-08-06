import React, { useState } from 'react';
import { Product, ProductCategory, ProductSizeOption } from '../types';
import {
  Package,
  Plus,
  Trash2,
  Edit,
  Check,
  SearchIcon,
  X
} from 'lucide-react';

interface ProductsSectionProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onResetProducts: () => void;
  editingProductId: string | null;
  title: string;
  setTitle: (v: string) => void;
  titleEn: string;
  setTitleEn: (v: string) => void;
  category: ProductCategory;
  setCategory: (v: ProductCategory) => void;
  price: number;
  setPrice: (v: number) => void;
  originalPrice: number;
  setOriginalPrice: (v: number) => void;
  inStock: boolean;
  setInStock: (v: boolean) => void;
  isBestSeller: boolean;
  setIsBestSeller: (v: boolean) => void;
  image: string;
  setImage: (v: string) => void;
  sizeOptions: ProductSizeOption[];
  setSizeOptions: (v: ProductSizeOption[]) => void;
  description: string;
  setDescription: (v: string) => void;
  quickBenefits: string;
  setQuickBenefits: (v: string) => void;
  badge: string;
  setBadge: (v: string) => void;
  badgeColor: 'burgundy' | 'gold' | 'green';
  setBadgeColor: (v: 'burgundy' | 'gold' | 'green') => void;
  productSearch: string;
  setProductSearch: (v: string) => void;
  handleEditClick: (product: Product) => void;
  handleResetForm: () => void;
  handleSaveProduct: (e: React.FormEvent) => void;
  handleImageFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddSizeOption: () => void;
  handleUpdateSizeOption: (index: number, key: keyof ProductSizeOption, val: any) => void;
  handleRemoveSizeOption: (index: number) => void;
}

const sampleImages = [
  { label: 'রোল্ড ওটস', url: 'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?auto=format&fit=crop&w=800&q=80' },
  { label: 'হার্বাল টি', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80' },
  { label: 'চিয়া সিড', url: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80' },
  { label: 'খাঁটি মধু', url: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80' },
  { label: 'কিউইনোয়া', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80' },
];

export function ProductsSection({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetProducts,
  editingProductId,
  title, setTitle,
  titleEn, setTitleEn,
  category, setCategory,
  price, setPrice,
  originalPrice, setOriginalPrice,
  inStock, setInStock,
  isBestSeller, setIsBestSeller,
  image, setImage,
  sizeOptions, setSizeOptions,
  description, setDescription,
  quickBenefits, setQuickBenefits,
  badge, setBadge,
  badgeColor, setBadgeColor,
  productSearch, setProductSearch,
  handleEditClick,
  handleResetForm,
  handleSaveProduct,
  handleImageFileUpload,
  handleAddSizeOption,
  handleUpdateSizeOption,
  handleRemoveSizeOption,
}: ProductsSectionProps) {
  const [productsTab, setProductsTab] = useState<'collection' | 'inventory'>('collection');
  const [collCategory, setCollCategory] = useState<ProductCategory>('all');

  const allCategories = [
    { id: 'all' as ProductCategory, name: 'All Products', color: 'bg-[#7A0016]/10 text-[#7A0016]' },
    { id: 'oats' as ProductCategory, name: 'Rolled Oats', color: 'bg-amber-100 text-amber-800' },
    { id: 'tea' as ProductCategory, name: 'Herbal Tea', color: 'bg-emerald-100 text-emerald-800' },
    { id: 'superfood' as ProductCategory, name: 'Superfood', color: 'bg-green-100 text-green-800' },
    { id: 'honey' as ProductCategory, name: 'Honey', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'combo' as ProductCategory, name: 'Combo Pack', color: 'bg-purple-100 text-purple-800' },
  ];
  // Only show categories that have products (always show 'all')
  const categoryCards = allCategories
    .filter(cat => cat.id === 'all' || products.some(p => p.category === cat.id))
    .map(cat => ({
      ...cat,
      count: cat.id === 'all' ? products.length : products.filter(p => p.category === cat.id).length,
    }));

  return (
    <div className="space-y-6">
      {/* Sub-tabs */}
      <div className="flex items-center gap-2 border-b border-[#E8DEC8] pb-3">
        <button
          onClick={() => setProductsTab('collection')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
            productsTab === 'collection' ? 'bg-[#7A0016] text-white' : 'bg-white text-gray-700 border border-[#D9C8B4] hover:bg-[#FAF6EF]'
          }`}
        >
          Collection
        </button>
        <button
          onClick={() => setProductsTab('inventory')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
            productsTab === 'inventory' ? 'bg-[#7A0016] text-white' : 'bg-white text-gray-700 border border-[#D9C8B4] hover:bg-[#FAF6EF]'
          }`}
        >
          Inventory
        </button>
      </div>

      {productsTab === 'collection' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[#2C221E]">Collection</h1>
              <p className="text-sm text-gray-500">Browse products by category</p>
            </div>
            <button
              onClick={() => {
                handleResetForm();
                setProductsTab('inventory');
              }}
              className="px-4 py-2 bg-[#7A0016] text-white rounded-lg text-xs font-bold hover:bg-[#5A0010] cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Product
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryCards.map((card) => (
              <button
                key={card.id}
                onClick={() => setCollCategory(card.id)}
                className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                  collCategory === card.id
                    ? 'bg-white border-[#7A0016] shadow-md ring-2 ring-[#7A0016]/20'
                    : 'bg-white border-[#E8DEC8] hover:shadow-sm hover:border-[#7A0016]/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${card.color}`}>
                    <Package className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-bold font-mono text-[#2C221E]">{card.count}</span>
                </div>
                <p className="mt-3 font-bold text-sm text-[#2C221E]">{card.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{card.count} product{card.count !== 1 ? 's' : ''}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 bg-white rounded-xl border border-[#E8DEC8] overflow-hidden">
            <div className="p-4 border-b border-[#E8DEC8] flex justify-between items-center">
              <h3 className="font-bold text-[#2C221E]">
                {collCategory === 'all' ? 'All Products' : `Products in ${collCategory}`} ({products.filter(p => collCategory === 'all' || p.category === collCategory).length})
              </h3>
              <div className="relative">
                <input type="text" placeholder="Search..." value={productSearch} onChange={(e) => setProductSearch(e.target.value)} className="pl-8 pr-3 py-1.5 bg-[#FAF6EF] text-xs rounded-lg border border-[#D9C8B4]" />
                <SearchIcon className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#FAF6EF] text-[#7A0016] border-b border-[#E8DEC8] font-bold">
                    <th className="p-3">Image</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DEC8]">
                  {products
                    .filter(p => collCategory === 'all' || p.category === collCategory)
                    .filter(p =>
                      !productSearch ||
                      p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
                      p.titleEn.toLowerCase().includes(productSearch.toLowerCase())
                    )
                    .map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#FAF6EF]/50">
                      <td className="p-3"><img src={prod.image} alt="" className="w-10 h-10 object-cover rounded-lg border" /></td>
                      <td className="p-3 font-bold text-[#2C221E]">{prod.title}</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-amber-100 text-[#7A0016] font-bold uppercase text-[10px] rounded">{prod.category}</span></td>
                      <td className="p-3 font-mono font-bold text-[#7A0016]">৳{prod.price}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${prod.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                          {prod.inStock ? 'In Stock' : 'Out'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex justify-end gap-1">
                          <button onClick={() => { handleEditClick(prod); setProductsTab('inventory'); }} className="p-1.5 rounded-lg bg-amber-100 text-[#7A0016] hover:bg-amber-200 cursor-pointer"><Edit className="w-3.5 h-3.5" /></button>
                          <button onClick={() => { if (confirm(`Delete "${prod.title}"?`)) onDeleteProduct(prod.id); }} className="p-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {productsTab === 'inventory' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[#2C221E]">Inventory</h1>
              <p className="text-sm text-gray-500">Add and manage product inventory</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onResetProducts}
                className="px-4 py-2 bg-amber-100 text-[#7A0016] rounded-lg text-xs font-bold hover:bg-amber-200 cursor-pointer"
              >
                Reset Catalog
              </button>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E8DEC8] mb-6">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8DEC8]">
              <h3 className="font-bold text-[#2C221E]">
                {editingProductId ? 'Edit Product' : 'Add New Product'}
              </h3>
              {editingProductId && (
                <button onClick={handleResetForm} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-200 cursor-pointer">
                  Cancel
                </button>
              )}
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2C221E] mb-1">Title (Bengali) *</label>
                  <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 bg-[#FAF6EF] text-xs rounded-lg border border-[#D9C8B4]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2C221E] mb-1">Title (English)</label>
                  <input type="text" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} className="w-full px-3 py-2 bg-[#FAF6EF] text-xs rounded-lg border border-[#D9C8B4]" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2C221E] mb-1">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value as ProductCategory)} className="w-full px-3 py-2 bg-[#FAF6EF] text-xs rounded-lg border border-[#D9C8B4]">
                    <option value="oats">Rolled Oats</option>
                    <option value="tea">Herbal Tea</option>
                    <option value="superfood">Superfood</option>
                    <option value="honey">Honey</option>
                    <option value="combo">Combo Pack</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2C221E] mb-1">Price (৳)</label>
                  <input type="number" required min={10} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full px-3 py-2 bg-[#FAF6EF] text-xs rounded-lg border border-[#D9C8B4]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2C221E] mb-1">Original Price</label>
                  <input type="number" min={0} value={originalPrice} onChange={(e) => setOriginalPrice(Number(e.target.value))} className="w-full px-3 py-2 bg-[#FAF6EF] text-xs rounded-lg border border-[#D9C8B4]" />
                </div>
                <div className="flex items-center gap-3 pt-5">
                  <label className="flex items-center gap-1 text-xs font-bold cursor-pointer">
                    <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="w-4 h-4" />
                    In Stock
                  </label>
                  <label className="flex items-center gap-1 text-xs font-bold cursor-pointer">
                    <input type="checkbox" checked={isBestSeller} onChange={(e) => setIsBestSeller(e.target.checked)} className="w-4 h-4" />
                    Best Seller
                  </label>
                </div>
              </div>

              <div className="p-3 bg-[#FAF6EF] rounded-lg space-y-2">
                <label className="text-xs font-bold text-[#7A0016]">Product Image</label>
                <div className="flex gap-2 items-center">
                  <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} className="flex-1 px-3 py-2 bg-white text-xs rounded-lg border border-[#D9C8B4]" />
                  <label className="px-3 py-2 bg-[#7A0016] text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-[#5A0010]">
                    Upload
                    <input type="file" accept="image/*" onChange={handleImageFileUpload} className="hidden" />
                  </label>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {sampleImages.map((samp, idx) => (
                    <button key={idx} type="button" onClick={() => setImage(samp.url)} className="px-2 py-1 bg-white hover:bg-amber-100 text-xs rounded border border-[#D9C8B4] cursor-pointer">{samp.label}</button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#FAF6EF] rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-[#7A0016]">Size Options</label>
                  <button type="button" onClick={handleAddSizeOption} className="px-2 py-1 bg-[#7A0016] text-white rounded-lg text-xs cursor-pointer">+ Add Size</button>
                </div>
                {sizeOptions.length === 0 && (
                  <p className="text-xs text-gray-500 bg-white p-3 rounded-lg border border-dashed border-[#D9C8B4]">
                    কোনো ভেরিয়েশন যোগ করা হয়নি। আপনি চাইলে উপরের "+ Add Size" বাটনে ক্লিক করে ভেরিয়েশন (যেমন: ৫০০ গ্রাম, বোতল ইত্যাদি) যোগ করতে পারবেন।
                  </p>
                )}
                {sizeOptions.map((opt, idx) => (
                  <div key={idx} className="flex gap-2 items-center bg-white p-2 rounded-lg border border-[#D9C8B4]">
                    <input type="text" placeholder="Label" value={opt.label} onChange={(e) => handleUpdateSizeOption(idx, 'label', e.target.value)} className="flex-1 px-2 py-1 text-xs rounded border" />
                    <input type="text" placeholder="Code" value={opt.value} onChange={(e) => handleUpdateSizeOption(idx, 'value', e.target.value)} className="w-20 px-2 py-1 text-xs rounded border" />
                    <input type="number" placeholder="Price" value={opt.price} onChange={(e) => handleUpdateSizeOption(idx, 'price', e.target.value)} className="w-20 px-2 py-1 text-xs rounded border" />
                    <button type="button" onClick={() => handleRemoveSizeOption(idx)} className="text-red-500 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
              </div>

              {/* Badge & Quick Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2C221E] mb-1">Badge Text</label>
                  <input type="text" placeholder="e.g. 100% ORGANIC" value={badge} onChange={(e) => setBadge(e.target.value)} className="w-full px-3 py-2 bg-[#FAF6EF] text-xs rounded-lg border border-[#D9C8B4]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2C221E] mb-1">Badge Color</label>
                  <select value={badgeColor} onChange={(e) => setBadgeColor(e.target.value as any)} className="w-full px-3 py-2 bg-[#FAF6EF] text-xs rounded-lg border border-[#D9C8B4]">
                    <option value="burgundy">Burgundy</option>
                    <option value="gold">Gold</option>
                    <option value="green">Green</option>
                  </select>
                </div>
              </div>

              {/* Quick Benefits */}
              <div>
                <label className="block text-xs font-bold text-[#2C221E] mb-1">Quick Benefits (comma separated)</label>
                <input type="text" placeholder="High Fiber, Heart Healthy, Zero Chemical" value={quickBenefits} onChange={(e) => setQuickBenefits(e.target.value)} className="w-full px-3 py-2 bg-[#FAF6EF] text-xs rounded-lg border border-[#D9C8B4]" />
              </div>

              {/* Description - Product Details */}
              <div>
                <label className="block text-xs font-bold text-[#2C221E] mb-1">Product Description (Bengali)</label>
                <textarea
                  rows={4}
                  placeholder="পণ্যের বিস্তারিত বিবরণ, উপাদান, ব্যবহারের নিয়ম ও কার্যকারিতা..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF6EF] text-xs rounded-lg border border-[#D9C8B4]"
                />
                <p className="text-[10px] text-gray-400 mt-1">This description appears on the product detail page.</p>
              </div>

              <button type="submit" className="w-full py-3 bg-[#7A0016] text-white rounded-xl font-bold text-sm hover:bg-[#5A0010] cursor-pointer">
                <Check className="w-4 h-4 inline mr-1" />
                {editingProductId ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}