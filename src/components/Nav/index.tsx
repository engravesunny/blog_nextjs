import Link from 'next/link';

export const Nav = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md py-4 sticky top-0 z-10 transition-all duration-300">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          <span className="font-bold text-xl text-gray-800 dark:text-white">我的博客</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">首页</Link>
          <Link href="#" className="text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">文章</Link>
          <Link href="#" className="text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">分类</Link>
          <Link href="#" className="text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">关于</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
          <button className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
