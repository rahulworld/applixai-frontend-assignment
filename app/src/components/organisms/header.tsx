'use client';
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

    return (
      <>
        <div className="w-full h-20 bg-slate-700 sticky top-0 shadow drop-shadow-lg dark:shadow-blue-50 shadow-white z-10">
          <div className="container mx-auto px-4 h-full flex justify-between">
            <div className="flex justify-between items-center h-full">
              <img className="p-4 mx-4 h-full" src="assets/logo.png"></img>
              <ul className="hidden md:flex gap-x-6 text-primary dark:text-white">
              <li>
                  <Link href="/contacts">
                    <p>Performance</p>
                  </Link>
                </li>
                <li>
                  <Link href="/about">
                    <p className="text-co">Generate Models</p>
                  </Link>
                </li>
                <li>
                  <Link href="/services">
                  <p className="text-co">Prototype</p>
                  </Link>
                </li>
                <li>
                  <Link href="/contacts">
                    <p>I/O</p>
                  </Link>
                </li>
                <li>
                  <Link href="/contacts">
                    <p>Outliers</p>
                  </Link>
                </li>
              </ul>
              {/* <Button /> */}
            </div>
            <div className="flex items-center h-full">
                <ul className="text-primary dark:text-white">
                <li>
                <button onClick={() => {setTheme(theme == 'light' ? 'dark' : 'light')}}>
                  {
                    theme == 'light' ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                      <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.06ZM5.404 6.464a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.061 1.06l1.06 1.06Z" />
                    </svg>) : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
  <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z" clipRule="evenodd" />
</svg>
                   }
                </button>
                </li>
                </ul>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Navbar;