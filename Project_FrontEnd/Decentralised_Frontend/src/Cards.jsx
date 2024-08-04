import React from 'react';
import { Link } from 'react-router-dom';
import Propose from './Propose';

const Card = ({ title, description, buttonText, buttonLink }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-lg mb-6">{description}</p>
      <Link
        to={buttonLink}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-lg font-semibold transition duration-300"
      >
        {buttonText}
      </Link>
    </div>
  );
};

const ProposerInvestorCards = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Get Involved</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card
            title="Be a Proposer"
            description="Submit your investment ideas and get funding from our community. Share your vision and watch your project grow with support from like-minded individuals."
            buttonText="Propose an Idea"
            buttonLink="/propose" // Update to match your route
          />
          <Card
            title="Be an Investor"
            description="Browse and invest in exciting opportunities proposed by others. Join a thriving ecosystem and be part of innovative projects that align with your interests."
            buttonText="Explore Opportunities"
            buttonLink="/invest" // Update to match your route
          />
        </div>
      </div>
    </section>
  );
};

export default ProposerInvestorCards;
