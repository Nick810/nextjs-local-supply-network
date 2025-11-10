'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useTranslations } from 'next-intl';

type Props = {
  lang: string
}

const API_URL = process.env.NODE_ENV === 'development'
                  ? 'http://localhost:3000'
                  : process.env.NEXT_PUBLIC_SITE_URL;

export default function Filter({ lang }: Props) {
  const router = useRouter();
  const [vendors, setVendors] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]); 
  const [growTypes, setGrowTypes] = useState<string[]>([]);
  const [toggle, setToggle] = useState(false);

  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [selectedGrowTypes, setSelectedGrowTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [sortBy, setSortBy] = useState('');
  const t = useTranslations('filter');
  const tButton = useTranslations('button');

  useEffect(() => {
    async function fetchFilters() {
      try {
        const res = await fetch(`/api/shopify/get-tags-and-vendors`);
        const data = await res.json();
        setVendors(data.vendors || []);
        setTags(data.tags || []);
        setGrowTypes(data.growTypes || []);
      } catch (err) {
        console.error('Failed to fetch filters:', err);
      }
    }

    fetchFilters();
  }, [lang]);

  const handleVendorToggle = (vendor: string) => {
    setSelectedVendors(prev =>
      prev.includes(vendor) ? prev.filter(v => v !== vendor) : [...prev, vendor]
    );
  };

  const handleTypeToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };
  const handleGrowTypeToggle = (type: string) => {
    setSelectedGrowTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleFilterClick = () => {
    const query = new URLSearchParams();

    if (selectedVendors.length) query.set('vendor', selectedVendors.join(','));
    if (selectedTags.length) query.set('tag', selectedTags.join(','));
    if (selectedGrowTypes.length) query.set('grow', selectedGrowTypes.join(','));
    if (priceMin) query.set('price_min', priceMin);
    if (priceMax) query.set('price_max', priceMax);
    if (sortBy) query.set('sort_by', sortBy);

    router.push(`/${lang}/collections/all?${query.toString()}`);

    setToggle(false)
  };

  return (
    <div className="lg:w-1/3">
      <div className="flex justify-center">
        <div className="inline-flex justify-center mb-8 lg:hidden border border-black rounded-md py-4 px-8 cursor-pointer" onClick={() => setToggle(true)}>
          <Image src="/filter-icon.svg" alt="Filter Icon" width={24} height={24} priority />
          <button className="relative cursor-pointer rounded-md ml-4" >
            {t('title')}
          </button>
        </div>
      </div>
      
      <div className={`${toggle ? 'fixed' : 'hidden'} lg:static lg:block top-0 right-0 w-screen lg:w-auto h-screen lg:h-auto bg-white z-100 px-[5%] md:pl-0`}>
        <div className="flex flex-row justify-between my-4 items-center lg:hidden">
          <h2 className="text-2xl">{t('title')}</h2>
          <button onClick={() => setToggle(false)} className="cursor-pointer lg:hidden">
            <Image src="/close.svg" alt="Close Button" width={60} height={60} priority />
          </button>
        </div>
        
        <div className="flex flex-col space-y-8 mb-8">
          <div>
            <h3 className="mb-4! text-xl">{t('grower')}</h3>
            
            {vendors.length > 0 ? (
              <ul>
                {vendors.map(vendor => (
                  <li key={vendor}>
                    <label className="cursor-pointer">
                      <input
                        type="checkbox"
                        className="cursor-pointer mr-2"
                        checked={selectedVendors.includes(vendor)}
                        onChange={() => handleVendorToggle(vendor)}
                      />
                      {vendor.charAt(0).toUpperCase() + vendor.slice(1)}
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="min-h-[100px] animate-pulse">
                {[...Array(5)].map((_, i) => (
                  <li key={i} className="h-5 bg-gray-200 rounded mb-2" />
                ))}
              </ul>
            )}

            <hr className="mt-8 border-t border-gray-300" />
          </div>
          
          <div>
            <h3 className="mb-4! text-xl">{t('types')}</h3>
            
            <ul className="">
              {tags.length > 0 ? (
                tags.map(tag => (
                  <li key={tag}>
                    <label className="cursor-pointer">
                      <input
                        type="checkbox"
                        className="cursor-pointer mr-2"
                        checked={selectedTags.includes(tag)}
                        onChange={() => handleTypeToggle(tag)}
                      />
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </label>
                  </li>
                ))
              ) : (
                [...Array(2)].map((_, i) => (
                  <li key={i} className="h-5 bg-gray-200 rounded mb-2 animate-pulse" />
                ))
              )}
            </ul>

            <hr className="mt-8 border-t border-gray-300" />
          </div>


          <div>
            <h3 className="mb-4! text-xl">{t('category')}</h3>
            
            <ul className="">
              {growTypes.length > 0 ? (
                growTypes.map(type => (
                  <li key={type}>
                    <label className="cursor-pointer">
                      <input
                        type="checkbox"
                        className="cursor-pointer mr-2"
                        checked={selectedGrowTypes.includes(type)}
                        onChange={() => handleGrowTypeToggle(type)}
                      />
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </label>
                  </li>
                ))
              ) : (
                [...Array(2)].map((_, i) => (
                  <li key={i} className="h-5 bg-gray-200 rounded mb-2 animate-pulse" />
                ))
              )}
            </ul>

            <hr className="mt-8 border-t border-gray-300" />
          </div>

          
          <div>
            <h3 className="mb-4! text-xl">{t('sort_by_price')}</h3>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="border p-2"
            >
              <option value="">{t('select.title')}</option>
              <option value="price-ascending">{t('select.lth')}</option>
              <option value="price-descending">{t('select.htl')}</option>
            </select>
          </div>
        </div>

        <button onClick={handleFilterClick} className="btn bg-black max-w-40 text-center">
          {tButton('filter')}
        </button>
      </div>
    </div>
  );
}