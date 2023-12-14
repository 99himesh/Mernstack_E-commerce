
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { createProductAsync, fetchProducctByidAsync, selectedProduct, updateProductAsync } from '../../product/productSlice';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { selectLoggedInUser } from '../../auth/authSlice';

    const brands= [
      { value: 'smartphones', label: 'smartphones', cheacked: false },
      { value: 'laptops', label: 'laptops', cheacked: false },
      { value: 'fragrances', label: 'fragrances', cheacked: false },
      { value: 'skincare', label: 'skincare', cheacked: false },
      { value: 'groceries', label: 'groceries', cheacked: false },
      { value: 'home-decoration', label: 'home-decoration', cheacked: false },
      { value: 'furniture', label: 'furniture', cheacked: false },
      { value: 'tops', label: 'tops', cheacked: false },
      { value: 'womens-dresses', label: 'womens-dresses', cheacked: false },
      { value: 'womens-shoes', label: 'womens-shoes', cheacked: false },
      { value: 'mens-shirts', label: 'mens-shirts', cheacked: false },
      { value: 'mens-shoes', label: 'mens-shoes', cheacked: false },
      { value: 'mens-watches', label: 'mens-watches', cheacked: false },
      { value: 'womens-watches', label: 'womens-watches', cheacked: false },
      { value: 'womens-bags', label: 'womens-bags', cheacked: false },
      {
        value: 'womens-jewellery',
        label: 'womens-jewellery',
        cheacked: false
      },
      { value: 'sunglasses', label: 'sunglasses', cheacked: false },
      { value: 'automotive', label: 'automotive', cheacked: false },
      { value: 'motorcycle', label: 'motorcycle', cheacked: false },
      { value: 'lighting', label: 'lighting', cheacked: false },
    ]
  const categary= [
   
    { value: 'Apple', label: 'Apple', cheacked: false },
    { value: 'Samsung', label: 'Samsung', cheacked: false },
    { value: 'OPPO', label: 'OPPO', cheacked: false },
    { value: 'Huawei', label: 'Huawei', cheacked: false },
    {
      value: 'Microsoft Surface',
      label: 'Microsoft Surface',
      cheacked: false
    },
    { value: 'Infinix', label: 'Infinix', cheacked: false },
    { value: 'HP Pavilion', label: 'HP Pavilion', cheacked: false },
    {
      value: 'Impression of Acqua Di Gio',
      label: 'Impression of Acqua Di Gio',
      cheacked: false
    },
    { value: 'Royal_Mirage', label: 'Royal_Mirage', cheacked: false },
    {
      value: 'Fog Scent Xpressio',
      label: 'Fog Scent Xpressio',
      cheacked: false
    },
    { value: 'Al Munakh', label: 'Al Munakh', cheacked: false },
    { value: 'Lord - Al-Rehab', label: 'Lord - Al-Rehab', cheacked: false },
    { value: "L'Oreal Paris", label: "L'Oreal Paris", cheacked: false },
    { value: 'Hemani Tea', label: 'Hemani Tea', cheacked: false },
    { value: 'Dermive', label: 'Dermive', cheacked: false },
    {
      value: 'ROREC White Rice',
      label: 'ROREC White Rice',
      cheacked: false 
    },
    { value: 'Fair & Clear', label: 'Fair & Clear', cheacked: false },
    { value: 'Saaf & Khaas', label: 'Saaf & Khaas', cheacked: false },
    { value: 'Bake Parlor Big', label: 'Bake Parlor Big', cheacked: false },
    {
      value: 'Baking Food Items',
      label: 'Baking Food Items',
      cheacked: false
    },
    { value: 'fauji', label: 'fauji', cheacked: false },
    { value: 'Dry Rose', label: 'Dry Rose', cheacked: false },
    { value: 'Boho Decor', label: 'Boho Decor', cheacked: false },
    { value: 'Flying Wooden', label: 'Flying Wooden', cheacked: false },
    { value: 'LED Lights', label: 'LED Lights', cheacked: false },
    { value: 'luxury palace', label: 'luxury palace', cheacked: false },
    { value: 'Golden', label: 'Golden', cheacked: false },
 
  ]
 
  
export default function AdminProductForm() {
  const {register,handleSubmit,watch,setValue,formState: { errors } } = useForm();
  const dispatch=useDispatch();
  const param=useParams();
  const selectedProductbyId=useSelector(selectedProduct);
  console.log(selectedProductbyId);
  const user=useSelector(selectLoggedInUser)
  
useEffect(()=>{
  console.log("sdsa");
  if(param.id){
    dispatch(fetchProducctByidAsync(param.id))
  }else{

  }
},[dispatch,param.id])

useEffect(() => {
  if (selectedProductbyId && param.id) {
    setValue("title", selectedProductbyId.title);
    setValue("description", selectedProductbyId.description);
    setValue("discountPercentage", selectedProductbyId.discountPercentage);
    setValue("stock", selectedProductbyId.stock);
    setValue("price",selectedProductbyId.price );
    setValue("brand", selectedProductbyId.brand);
    setValue("categary", selectedProductbyId.categary);
    setValue("thumbnail", selectedProductbyId.thumbnail);

    // Check if images array is defined and not empty before accessing elements
    if (selectedProductbyId.images && selectedProductbyId.images.length > 0) {
      setValue("image1", selectedProductbyId.images[0]);
      setValue("image2", selectedProductbyId.images[1]);
      setValue("image3", selectedProductbyId.images[2]);
    }
  }
}, [dispatch, selectedProductbyId, setValue, param.id]);


const deleteHandler=()=>{
    const product={...selectedProductbyId}
    product.deleted=true
    dispatch(updateProductAsync(product))
  }


  return (
    <form onSubmit={handleSubmit((data)=>{
      console.log(data);
      const product={...data}
      product.images=[product.image1,product.image2,product.image3,product.thumbnail]
      product.rating=product.rating
      delete product["image1"]
      delete product["image2"]
      delete product["image3"]
      if(param.id){
          product.id=param.id
          dispatch(updateProductAsync(product))
      }else{
      dispatch(createProductAsync(product))
      }

    })}>
      <div className="space-y-12 bg-white text-start">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product</h2>
        

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Product Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    {...register("title",{ required: "product required" })}
                    id="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register("description",{ required: "description required" })}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>

           

           
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
        

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
           
          <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("price",{ required: "price required" })}

                  id="price"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
              Discount
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("discountPercentage",{ required: "discountPercentage required" })}

                  id="discount"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                Stock
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("stock",{ required: "stock required" })}
                  id="stock"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
         

         
          <div className="col-span-full">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <select
                  value={selectedProductbyId.brand}
                    {...register('brand', {
                      required: 'brand is required',
                    })}
                  >
                    <option value="">--choose brand--</option>
                    {brands.map((brand) => (
                      <option key={brand.value} value={param.id?selectedProductbyId.brand:brand.value}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  categary
                </label>
                <div className="mt-2">
                  <select
                    {...register('categary', {
                      required: 'categary is required',
                    })}
                  >
                    <option value="">--choose categary--</option>
                    {categary.map((categaries) => (
                      <option key={categaries.value} value={param.id?selectedProductbyId.categary:categary.value}>
                        {categaries.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
        

            <div className="col-span-full">
              <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                Thumbnail
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("thumbnail",{ required: "thumbnail required" })}
                  id="thumbnail"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                image 1
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("image1",{ required: "image1 required" })}
                  id="image1"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                image 2
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("image2",{ required: "image2 required" })}

                  id="image2"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                image 3
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("image3",{ required: "image3 required" })}
                  id="image3"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

         
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
       

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      Comments
                    </label>
                    <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="candidates" className="font-medium text-gray-900">
                      Candidates
                    </label>
                    <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="offers" className="font-medium text-gray-900">
                      Offers
                    </label>
                    <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                  </div>
                </div>
              </div>
            </fieldset>
          
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
       {selectedProductbyId && <button
          onClick={deleteHandler}
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          delete
        </button>}
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}

