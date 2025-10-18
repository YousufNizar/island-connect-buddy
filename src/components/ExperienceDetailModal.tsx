import { useState, useEffect } from "react";
import {
  X,
  Star,
  Clock,
  Users,
  MapPin,
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  CheckCircle,
} from "lucide-react";
import { Experience, Artisan } from "@/data/experiences";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface ExperienceDetailModalProps {
  experience: Experience;
  artisan: Artisan;
  isOpen: boolean;
  onClose: () => void;
}

const ExperienceDetailModal = ({
  experience,
  artisan,
  isOpen,
  onClose,
}: ExperienceDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [participants, setParticipants] = useState(1);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % experience.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + experience.images.length) % experience.images.length);
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time");
      return;
    }

    toast.success("Booking request sent! We'll confirm within 2 hours.", {
      description: `${experience.title} on ${selectedDate} at ${selectedTime}`,
      duration: 5000,
    });
    onClose();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-fade-in">
      <div className="min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border z-10 px-4 py-3 flex items-center justify-between shadow-sm">
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleShare} className="rounded-full">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Image Carousel */}
        <div className="relative h-80 bg-gray-100">
          <img
            src={experience.images[currentImageIndex]}
            alt={experience.title}
            className="w-full h-full object-cover"
          />

          {experience.images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {experience.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? "bg-white w-8" : "bg-white/60"
                }`}
              />
            ))}
          </div>

          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {experience.verified && (
              <Badge className="bg-blue-500 text-white border-0 flex items-center gap-1">
                <Award className="w-3 h-3" />
                Verified Experience
              </Badge>
            )}
            <Badge className="bg-primary/90 text-primary-foreground border-0">
              🌿 {experience.sustainabilityScore}% Sustainable
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6 pb-32 bg-white">
          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{experience.title}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="font-semibold">{experience.rating}</span>
                <span className="text-gray-500">({experience.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <MapPin className="w-4 h-4" />
                {experience.location.city} • {experience.location.distanceKm}km away
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-3 gap-3">
            <Card>
              <CardContent className="p-3 text-center">
                <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
                <div className="text-xs text-gray-500">Duration</div>
                <div className="font-semibold text-sm">{experience.duration}m</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
                <div className="text-xs text-gray-500">Group Size</div>
                <div className="font-semibold text-sm">Max {experience.maxParticipants}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <Award className="w-5 h-5 mx-auto mb-1 text-primary" />
                <div className="text-xs text-gray-500">Hosted</div>
                <div className="font-semibold text-sm">{artisan.experiencesHosted}+</div>
              </CardContent>
            </Card>
          </div>

          {/* Artisan Profile */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <img
                  src={artisan.photo}
                  alt={artisan.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{artisan.name}</h3>
                    {artisan.verified && <Award className="w-4 h-4 text-blue-500 fill-blue-500" />}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{artisan.bio}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>⭐ {artisan.rating} ({artisan.reviewCount})</span>
                    <span>🎓 {artisan.yearsOfExperience} years</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold mb-3">About This Experience</h2>
            <p className="text-gray-600 leading-relaxed">{experience.description}</p>
          </div>

          {/* What's Included */}
          <div>
            <h2 className="text-lg font-semibold mb-3">What's Included</h2>
            <div className="space-y-2">
              {experience.included.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Bottom Booking Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-sm text-gray-500">Total Price</div>
              <div className="text-2xl font-bold">
                ${experience.price * participants}
                <span className="text-sm font-normal text-gray-500">
                  {" "}
                  ({participants} {participants === 1 ? "person" : "people"})
                </span>
              </div>
            </div>
            <Button
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime}
              className="bg-primary text-white hover:bg-primary/90 px-8"
              size="lg"
            >
              Book Now
            </Button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            🔒 Secure payment • Free cancellation up to 24h before
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetailModal;
