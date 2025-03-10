import { FaFacebookF, FaTwitter, FaDribbble, FaBehance } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Top Products */}
        <div>
          <h4 className="text-white font-semibold mb-4">Top Products</h4>
          <ul className="space-y-2">
            <li>Managed Website</li>
            <li>Manage Reputation</li>
            <li>Power Tools</li>
            <li>Marketing Service</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>Jobs</li>
            <li>Brand Assets</li>
            <li>Investor Relations</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h4 className="text-white font-semibold mb-4">Features</h4>
          <ul className="space-y-2">
            <li>Jobs</li>
            <li>Brand Assets</li>
            <li>Investor Relations</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>Guides</li>
            <li>Research</li>
            <li>Experts</li>
            <li>Agencies</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold mb-4">Newsletter</h4>
          <p className="mb-4">You can trust us. We only send promo offers.</p>
          <div className="flex">
            <input type="email" placeholder="Your Email Address" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none" />
            <button className="bg-green-500 text-white px-4 py-2 rounded-r-md">SUBSCRIBE</button>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-4 mt-8">
        <div className="bg-gray-800 p-3 rounded-full text-white cursor-pointer"><FaFacebookF /></div>
        <div className="bg-gray-800 p-3 rounded-full text-white cursor-pointer"><FaTwitter /></div>
        <div className="bg-gray-800 p-3 rounded-full text-white cursor-pointer"><FaDribbble /></div>
        <div className="bg-gray-800 p-3 rounded-full text-white cursor-pointer"><FaBehance /></div>
      </div>

      {/* Copyright */}
      <p className="text-center text-gray-500 text-sm mt-6">
        Copyright &copy; 2025 All rights reserved | This template is made with ♥ by <span className="text-green-400">Jiawon</span>
      </p>
    </footer>
  );
};

export default Footer;
