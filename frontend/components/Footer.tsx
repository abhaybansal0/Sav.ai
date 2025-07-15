export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-row justify-between items-center lg:flex-col">
          <div className="mb-0 text-left lg:mb-6 lg:text-center">
            <div className="flex items-center gap-2 justify-start mb-2 lg:justify-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <h3 className="text-2xl font-bold">Sav.ai</h3>
            </div>
            <p className="text-gray-400">Making physics addictive</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-blue-400 transition-colors duration-200">About</a>
            <a href="#" className="hover:text-blue-400 transition-colors duration-200">Careers</a>
            <a href="#" className="hover:text-blue-400 transition-colors duration-200">Contact</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2024 Sav.ai Education. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}