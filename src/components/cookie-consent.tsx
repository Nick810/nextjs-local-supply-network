'use client'

// import Link from "next/link";
// import { useState } from "react";

const CookieConsent = () => {
  return(
     <div></div>
  )
  // const [showPreferences, setShowPreferences] = useState<boolean>(false);
  // const [selectedPrefs, setSelectedPrefs] = useState<object>({
  //   necessary: true,  
  //   analytics: false,
  //   marketing: false,
  //   personalization: false,
  // });

  // const handleChange = (key: keyof typeof selectedPrefs, value: boolean) => {
  //   setSelectedPrefs(prev => ({ ...prev, [key]: value }));
  // };

  // return (
  //   <div className="fixed w-full p-[5%] max-w-[500px] bottom-0 border border-black bg-background">
  //     {!showPreferences ? (
  //       <>
  //         <h3 className="text-2xl mb-2!">Cookie consent</h3>
  //         <p className="text-xs mb-4!">We and our partners, including Shopify, use cookies and other technologies to personalize your experience, show you ads, and perform analytics, and we will not use cookies or other technologies for these purposes unless you accept them. Learn more in our <Link href="/privacy-policy">Privacy Policy</Link></p>
  //         <div className="flex flex-row gap-4 text-sm">
  //           <button className="underline text-black" onClick={() => setShowPreferences(true)}>Manage Preferences</button>
  //           <button className="border border-black text-black px-8 py-2 flex-1" onClick={() => console.log('Accepted')}>Accept</button>
  //           <button className="border border-black text-black px-8 py-2 flex-1" onClick={() => console.log('Declined')}>Decline</button>
  //         </div>
  //       </>
  //     ) : (
  //       <div className="preferences-panel">
  //         <h3 className="text-2xl mb-4! text-center">Cookie and privacy preferences</h3>

  //         <div className="flex flex-col gap-4">
  //           <button className="border border-black text-black px-8 py-2 flex-1" onClick={() => setSelectedPrefs({
  //             necessary: true,
  //             analytics: true,
  //             marketing: true,
  //             personalization: true
  //           })}>Accept All</button>
  //           <button className="border border-black text-black px-8 py-2 flex-1" onClick={() => setSelectedPrefs({
  //             necessary: true,
  //             analytics: false,
  //             marketing: false,
  //             personalization: false
  //           })}>Decline All</button>
  //           <button className="border border-black text-black px-8 py-2 flex-1" onClick={() => console.log('Saved:', selectedPrefs)}>Save My Choices</button>
  //         </div>
          
  //         <div>
  //           <h3 className="text-2xl mb-4!">You control your data</h3>
  //           <p>Learn more about the cookies we use, and choose which cookies to allow.</p>
  //         </div>

  //         <label>
  //           <input type="checkbox" checked readOnly />
  //           Necessary (always active)
  //         </label>
  //         <label>
  //           <input
  //             type="checkbox"
  //             checked={selectedPrefs.analytics}
  //             onChange={() => handleChange('analytics', !selectedPrefs.analytics)}
  //           />
  //           Analytics
  //         </label>
  //         <label>
  //           <input
  //             type="checkbox"
  //             checked={selectedPrefs.marketing}
  //             onChange={() => handleChange('marketing', !selectedPrefs.marketing)}
  //           />
  //           Marketing
  //         </label>
  //         <label>
  //           <input
  //             type="checkbox"
  //             checked={selectedPrefs.personalization}
  //             onChange={() => handleChange('personalization', !selectedPrefs.personalization)}
  //           />
  //           Personalization
  //         </label>
          
  //       </div>
  //     )}
  //   </div>
  // );
};

export default CookieConsent;