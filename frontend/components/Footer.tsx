// components/Footer.tsx
export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold">Sav.ai</h3>
              <p className="mt-2 text-gray-400">Making physics addictive</p>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-blue-400 transition">About</a>
              <a href="#" className="hover:text-blue-400 transition">Careers</a>
              <a href="#" className="hover:text-blue-400 transition">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2024 Savai Education. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }