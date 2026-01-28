import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-bold text-blue-600">404</h1>
      <h2 className="text-3xl font-bold mt-4 text-gray-900">Page Not Found</h2>
      <p className="text-gray-600 mt-4 max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved to another dimension.
      </p>
      <Link
        href="/"
        className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
}
