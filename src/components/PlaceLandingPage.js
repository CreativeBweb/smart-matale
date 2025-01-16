import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Globe,
  ExternalLink,
} from "lucide-react";
import VoiceChatbot from "./VoiceChatbot";

const PlaceLandingPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [showChat, setShowChat] = useState(false);
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0);

  const places = [
    // ... other places ...
    {
      id: "bambarakiri-ella",
      name: "Bambarakiri Ella",
      description:
        "One of most fresh waterfall in Sri Lanka, cascading down the Knuckles Mountain Range. A breathtaking sight and a popular destination for nature lovers and hikers.",
      image: "/images/bambarakiri-ella.jpg", // Replace with the actual image path
      category: "waterfalls",
      similarPlaces: [
        { 
          name: 'Sera Ella', 
          id: 'sera-ella', 
          image: '/images/sera-ella.jpg',
          fallbackImage: 'https://via.placeholder.com/200x150?text=sera-ella'
        },
        { 
          name: 'Atanwala Wedda Peni Ella Falls', 
          id: 'atanwala', 
          image: '/images/atanwala.webp',
          fallbackImage: 'https://via.placeholder.com/200x150?text=atanwala'
        }
      ],
    },

    {
      id: 'sigiriya',
      name: 'Sigiriya',
      description: 'Ancient rock fortress and palace complex with spectacular frescoes and lion-shaped gateway. A UNESCO World Heritage site built by King Kashyapa.',
      image: '/images/sigiriya.jpg',
      category: 'ancient-cities',
      similarPlaces: [
        { 
          name: 'Pidurangala', 
          id: 'pidurangala', 
          image: '/images/pidurangala.jpg',
          fallbackImage: 'https://via.placeholder.com/200x150?text=Pidurangala'
        },
        { 
          name: 'Dambulla Cave Temple', 
          id: 'dambulla', 
          image: '/images/dambulla.jpg',
          fallbackImage: 'https://via.placeholder.com/200x150?text=Dambulla'
        }
      ]
    },
    {
      id: 'aluvihara',
      name: 'Aluvihara Rock Temple',
      description: 'Ancient Buddhist temple complex famous for being the site where the Pali Canon was first written down on palm leaves. Features historic cave temples with valuable paintings and Buddhist scriptures.',
      image: '/images/aluvihara.jpg',
      category: 'temples',
      similarPlaces: [
        { 
          name: 'Dambulla Temple', 
          id: 'dambulla', 
          image: '/images/dambulla.jpg',
          fallbackImage: 'https://via.placeholder.com/200x150?text=Dambulla'
        },
        { 
          name: 'Nalanda Gedige', 
          id: 'nalanda', 
          image: '/images/nalanda.jpg',
          fallbackImage: 'https://via.placeholder.com/200x150?text=Nalanda'
        }
      ]
    },
    {
      id: 'nalanda',
      name: 'Nalanda Gedige',
      description: 'A unique ancient building showcasing a remarkable blend of Buddhist and Hindu architectural styles. One of the finest examples of complete stone architecture in Sri Lanka.',
      image: '/images/nalanda.jpg',
      category: 'temples',
      similarPlaces: [
        { 
          name: 'Aluvihara Temple', 
          id: 'aluvihara', 
          image: '/images/aluvihara.jpg',
          fallbackImage: 'https://via.placeholder.com/200x150?text=Aluvihara'
        },
        { 
          name: 'Dambulla Temple', 
          id: 'dambulla', 
          image: '/images/dambulla.jpg',
          fallbackImage: 'https://via.placeholder.com/200x150?text=Dambulla'
        }
      ]
    }
  ];

  const currentPlace = places[currentPlaceIndex];

  const handlePrevious = () => {
    setCurrentPlaceIndex((prev) =>
      prev === 0 ? places.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentPlaceIndex((prev) =>
      prev === places.length - 1 ? 0 : prev + 1,
    );
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src =
      "https://via.placeholder.com/800x400?text=" + currentPlace.name;
  };

  const handleSimilarPlaceImageError = (e, placeName) => {
    e.target.onerror = null;
    e.target.src = `https://via.placeholder.com/200x150?text=${placeName}`;
  };

  if (showChat) {
    return (
      <VoiceChatbot
        selectedLanguage={selectedLanguage}
        placeName={currentPlace.name}
        locationId={currentPlace.id}
        onBack={() => setShowChat(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation with Centered Language Selector */}
      <div className="fixed top-0 w-full bg-white shadow-md z-10">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex justify-center items-center py-4">
            <div className="flex items-center space-x-3 bg-blue-50 px-6 py-3 rounded-full">
              <Globe className="w-6 h-6 text-blue-500" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="text-lg font-medium bg-transparent focus:outline-none text-blue-600"
              >
                <option value="en">English</option>
                <option value="si">සිංහල</option>
                <option value="ta">தமிழ்</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-24 max-w-3xl mx-auto px-4">
        {/* Place Image with Slide Animation */}
        <div
          key={currentPlace.id}
          className="relative w-full h-72 bg-gray-200 rounded-xl overflow-hidden transition-all duration-500"
        >
          <img
            src={currentPlace.image}
            alt={currentPlace.name}
            onError={handleImageError}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <h1 className="absolute bottom-4 left-4 text-3xl font-bold text-white">
            {currentPlace.name}
          </h1>
        </div>

        {/* Description */}
        <div className="mt-6">
          <p className="text-gray-700 text-lg text-center">
            {currentPlace.description}
          </p>

          {/* Action Buttons */}
          <div className="mt-6 space-y-4">
  {currentPlace.id === "bambarakiri-ella" ? (
    <button
      onClick={() => setShowChat(true)}
      className="w-full bg-blue-500 text-white rounded-lg py-3 px-4 flex items-center justify-center space-x-2 hover:bg-blue-600 transition"
    >
      <MessageCircle className="w-5 h-5" />
      <span>Chat with me</span>
    </button>
  ) : (
    <button
      className="w-full bg-gray-300 text-gray-500 rounded-lg py-3 px-4 flex items-center justify-center space-x-2 cursor-not-allowed"
      disabled
    >
      <MessageCircle className="w-5 h-5" />
      <span>Chat with me (Coming Soon)</span>
    </button>
  )}
            <a
              href="https://visitmatale.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 text-white rounded-lg py-3 px-4 flex items-center justify-center space-x-2 hover:bg-green-600 transition"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Read More About</span>
            </a>
          </div>
        </div>

        {/* Similar Places */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Similar Places
          </h2>
          <div className="flex justify-center overflow-x-auto space-x-4 pb-4">
            {currentPlace.similarPlaces.map((place) => (
              <div
                key={place.id}
                className="flex-shrink-0 w-48 bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={place.image}
                  alt={place.name}
                  onError={(e) =>
                    handleSimilarPlaceImageError(e, place.name)
                  }
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-medium text-center">{place.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Side Navigation */}
      <div className="fixed inset-y-0 left-0 flex items-center px-4">
        <button
          onClick={handlePrevious}
          className="bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      <div className="fixed inset-y-0 right-0 flex items-center px-4">
        <button
          onClick={handleNext}
          className="bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default PlaceLandingPage;