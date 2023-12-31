import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllProductsAsync,
  fetchAllProductsByFilterAsync,
  selectAllProduct,
} from '../../product/productSlice';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { StarIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';
import { ITEM_PER_PAGE } from '../../../app/constant';

export default function AdminProductList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)


  const dispatch = useDispatch();
  const products = useSelector(selectAllProduct)
  const [filter,setFilter]=useState({});
  const [sort,setSort]=useState({});
  const [page,setPage]=useState(1);






  const sortOptions = [
    { name: 'Best Rating',sort:"rating",order:"asc" ,current: false },
    { name: 'Price: Low to High',sort:"price", order:"asc", current: false },
    { name: 'Price: High to Low',sort:"price",order:"desc", current: false },
  ]

  const filters = [
    {
      id: 'category', 
      name: 'Category',
      options: [
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
      ],
    },
    {
      id: 'brand',
      name: 'brand',
      options: [
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
      ],
    },
   
  ]


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  } 

  const handleChange=(e,section,option)=>{
   const newFilter={...filter}
    if(e.target.checked){
      if(newFilter[section.id]){
         newFilter[section.id].push(option.value)   
      }else{
        newFilter[section.id]=[option.value]
      }
    }else{
      const index= newFilter[section.id].findIndex(el=>el===option.value);
      newFilter[section.id].splice(index,1)

    }
    setFilter(newFilter)
 }

  const sortHandle=(e,option)=>{
  const newSort={_sort:option.sort,_order:option.order}
    setSort(newSort)
  }
  const handlePagination=(page)=>{
      setPage(page)
    }
    
  useEffect(() => {

    const pagination={_page:page,_limit:ITEM_PER_PAGE}
    dispatch(fetchAllProductsByFilterAsync({filter,sort,pagination}))
  }, [dispatch,filter,sort,page])

  return (
    <div>
      <div>

        <div className="bg-white">
          <div>
           <MobileFilter filters={filters} handleChange={handleChange}/> 

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-5">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>

                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sort
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions?.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <p
                                  onClick={(e)=>sortHandle(e,option)}
                                  className={classNames(
                                    option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm'
                                  )}
                                >
                                  {option.name}
                                </p>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <section aria-labelledby="products-heading" className="pb-24 pt-0">



                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters */}
                  <DesktopFilter filters={filters} handleChange={handleChange}/>

                  {/* Product grid */}

                  <div className="lg:col-span-3"> 
                 <ProductGrid products={products}/>
                 </div>
                </div>
              </section>
              {/* pagination  */}
            </main>
          </div>
        </div>
        {/* productList here */}
         <Pagination page={page} setPage={setPage} handlePagination={handlePagination}/>
      </div>
    </div>

  );
}


function MobileFilter({filters,handleChange}){
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return( 
  
    <div>

  <Transition.Root show={mobileFiltersOpen} as={Fragment}>
              <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                      <div className="flex items-center justify-between px-4">
                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                        <button
                          type="button"
                          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                          onClick={() => setMobileFiltersOpen(false)}
                        >
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>

                      {/* Filters */}
                      <form className="mt-4 border-t border-gray-200">
                        <h3 className="sr-only">Categories</h3>
                        <ul role="list" className="px-2 py-3 font-medium text-gray-900">

                        </ul>

                        {filters.map((section) => (
                          <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                            {({ open }) => (
                              <>
                                <h3 className="-mx-2 -my-3 flow-root">
                                  <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                    <span className="font-medium text-gray-900">{section.name}</span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                      ) : (
                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                  <div className="space-y-6">
                                    {section.options?.map((option, optionIdx) => (
                                      <div key={option.value} className="flex items-center">
                                        <input 
                                          id={`filter-mobile-${section.id}-${optionIdx}`}
                                          name ={`${section.id}[]`}
                                          defaultValue={option.value}
                                          type="checkbox"
                                          onChange={(e)=>{handleChange(e,section,option)}}
                                          defaultChecked={option.checked}
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label
                                          htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                          className="ml-3 min-w-0 flex-1 text-gray-500"
                                        >
                                          {option.label}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>

    </div>
    );
}

function DesktopFilter({filters,handleChange}){
  return( <>
  
  <form className="hidden lg:block">
                    <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">

                    </ul>

                    {filters?.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-4">
                                {section.options?.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      onChange={(e)=>{handleChange(e,section,option)}}
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-${section.id}-${optionIdx}`}
                                      className="ml-3 text-sm text-gray-600"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
  </>);
}
function Pagination({page,setPage,handlePagination,totalItem=101}){
  return(
   <div>
  <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <div
              href="#"
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </div>
            <a
              href="#"
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </a>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(page-1)*ITEM_PER_PAGE+1}</span> to <span className="font-medium">{page*ITEM_PER_PAGE>totalItem ? totalItem :page*ITEM_PER_PAGE > totalItem}</span> of
                <span className="font-medium">{totalItem}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </a>
                {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
               
              { Array.from({length:Math.ceil(totalItem/ITEM_PER_PAGE)}).map((el,index)=>{
                return(
                  <div
                  onClick={(e)=>{handlePagination(index+1)}}
                  href="#"
                  aria-current="page"
                  className={`relative cursor-pointer z-10 inline-flex items-center ${index+1==page?" bg-indigo-600 text-white":"bg-gray-300"} px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {index+1}
                </div>
                )
              })}
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </nav>
            </div>
          </div>
        </div>
   </div>
   );
}
function ProductGrid({products}){
  return( <>
<div className='bg-slate-950'>
                    <div className="bg-white">
                      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0    lg:max-w-7xl lg:px-8">
                         <div>
                                <Link to="/admin/product-form" className="mt-5 w-1/3 flex text-sm items-center justify-center rounded-md border border-transparent bg-green-600 px-5 py-1  font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Add New Products</Link>
                             </div>  
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                          {products?.map((product) => (
                            <>
                              <Link to={`/product-details/${product.id}`}>
                                <div key={product.id} className="group relative border-solid border-2 p-2">
                                  <div className="aspect-h-1  aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                                    <img
                                      src={product.thumbnail}
                                      alt={product.title}
                                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                  </div>
                                  <div className="mt-4 flex justify-between">
                                    <div>
                                      <h3 className="text-sm text-gray-700">
                                        <a href={product.title}>
                                          <span aria-hidden="true" className="absolute inset-0" />
                                          {product.title}
                                        </a>
                                      </h3>
                                      <p className="mt-1 text-sm text-gray-500 text-start"><StarIcon className='w-6 h-6 inline' />


                                        <span className='align-bottom'>{product.rating}</span></p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-900"> ${Math.round(product.price * (1 - product.discountPercentage / 100))}</p>

                                      <p className="text-sm font-medium text-gray-400 line-through"> ${product.price}</p>
                                    </div>
                                   
                                  </div>
                                {product.deleted &&  <p classname="text-sm text-red-400  ">product Deleted</p>}

                                </div>
                                <div>
                                <Link to={`/admin/product-form/edit/${product.id}`} className="mt-5 flex  text-sm items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-1  font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Edit Products</Link>
                             </div>              
                              </Link>

                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                
  
  </>);
}