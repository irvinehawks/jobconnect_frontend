import React, { useState, useEffect } from 'react';

const LandingPage: React.FC = () => {
  const phrases = ['Welcome to JobConnect Zimbabwe', 'Connecting job seekers with opportunities', 'Find your dream job here!'];
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[loopIndex % phrases.length];
      if (isDeleting) {
        setDisplayedText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        setTypingSpeed(50);
      } else {
        setDisplayedText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        setTypingSpeed(150);
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 1000); // Wait before deleting
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setLoopIndex(loopIndex + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, loopIndex, typingSpeed]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Hero Section */}
      <header className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {displayedText}
            <span className="blinking-cursor">|</span>
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Connecting job seekers with opportunities in Zimbabwe.
          </p>

          <div className="flex flex-col lg:flex-row items-center justify-center text-center space-y-6 lg:space-x-6 lg:space-y-0">
            <a
              href="/signin"
              className="bg-white hover:bg-yellow-500 text-black font-bold py-3 px-14 rounded-full transition duration-300 w-3/4 sm:w-3/4 md:w-3/4 lg:w-auto"
            >
              Sign In
            </a>

            <a
              href="/signup"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-10 rounded-full transition duration-300 w-3/4 sm:w-3/4 md:w-3/4 lg:w-auto"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold mb-4">Wide Range of Jobs</h3>
              <p>
                Find jobs in various sectors across Zimbabwe, tailored to your skills.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold mb-4">Trusted Employers</h3>
              <p>
                We collaborate with top companies to provide you with reliable job offers.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold mb-4">Simple Application Process</h3>
              <p>
                Easily apply for jobs with our user-friendly platform and get quick responses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Testimonials</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 text-center">
              <p className="text-lg italic mb-4">
                "JobConnect Zimbabwe helped me find my dream job in just a week!"
              </p>
              <h3 className="font-bold">- Irvine K.</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 text-center">
              <p className="text-lg italic mb-4">
                "The platform is easy to use, and I love how professional it is."
              </p>
              <h3 className="font-bold">- Themba N.</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Connect?</h2>
          <p className="text-lg mb-8">
            Join JobConnect Zimbabwe and start applying for jobs today!
          </p>
          <a
            href="/signup"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full transition duration-300"
          >
            Sign Up Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 JobConnect Zimbabwe. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;