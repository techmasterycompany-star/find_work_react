export default function Footer() {
  return (
    <footer className="py-6 text-center text-xs text-gray-400">
      <p>© {new Date().getFullYear()} Job4U. All rights reserved.</p>
      <p className="mt-1 space-x-2">
        <a href="/terms" className="hover:text-gray-600">Terms of Service</a>
        <span>•</span>
        <a href="/privacy" className="hover:text-gray-600">Privacy Policy</a>
      </p>
    </footer>
  );
}