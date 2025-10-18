import { useState } from "react";
import { X, Star, Clock, Users, MapPin, Award, Calendar, ChevronLeft, ChevronRight, Share2, Heart, CheckCircle } from "lucide-react";
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

const ExperienceDetailModal = ({ experience, artisan, isOpen, onClose }: ExperienceDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [participants, setParticipants] = useState(1);

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
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto animate-fade-in">
      <div className="min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-lg border-b border-border z-10 px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="rounded-full"
            >
              <Share2 className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Image Carousel */}
        <div className="relative h-80 bg-muted">
          <img
            src={experience.images[currentImageIndex]}
            alt={experience.title}
            className="w-full h-full object-cover"
          />
          
          {/* Navigation Arrows */}
          {experience.images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {experience.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex
                    ? "bg-white w-8"
                    : "bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {experience.verified && (
              <Badge className="bg-blue-500 text-white border-0 flex items-center gap-1">
                <Award className="w-3 h-3" />
                Verified Experience
              </Badge>
            )}
            <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground border-0">
              🌿 {experience.sustainabilityScore}% Sustainable
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6 pb-32">
          {/* Title & Rating */}
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {experience.title}
            </h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="font-semibold">{experience.rating}</span>
                <span className="text-muted-foreground">({experience.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
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
                <div className="text-xs text-muted-foreground">Duration</div>
                <div className="font-semibold text-sm">{experience.duration}m</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
                <div className="text-xs text-muted-foreground">Group Size</div>
                <div className="font-semibold text-sm">Max {experience.maxParticipants}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <Award className="w-5 h-5 mx-auto mb-1 text-primary" />
                <div className="text-xs text-muted-foreground">Hosted</div>
                <div className="font-semibold text-sm">{artisan.experiencesHosted}+</div>
              </CardContent>
            </Card>
          </div>

          {/* Artisan Profile */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <img
                  src={artisan.photo}
                  alt={artisan.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{artisan.name}</h3>
                    {artisan.verified && (
                      <Award className="w-4 h-4 text-blue-500 fill-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{artisan.bio}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>⭐ {artisan.rating} ({artisan.reviewCount})</span>
                    <span>🎓 {artisan.yearsOfExperience} years</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {artisan.certifications.slice(0, 2).map((cert) => (
                      <Badge key={cert} variant="secondary" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">About This Experience</h2>
            <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
          </div>

          {/* What's Included */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">What's Included</h2>
            <div className="space-y-2">
              {experience.included.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          {experience.requirements.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">What to Bring</h2>
              <div className="space-y-2">
                {experience.requirements.map((req) => (
                  <div key={req} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">Highlights</h2>
            <div className="flex flex-wrap gap-2">
              {experience.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Booking Section */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">Choose Date & Time</h2>
            <div className="space-y-3">
              {/* Date Selection */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Select Date</label>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {experience.availableSlots.map((slot) => (
                    <button
                      key={slot.date}
                      onClick={() => setSelectedDate(slot.date)}
                      className={`flex-shrink-0 px-4 py-3 rounded-lg border-2 transition-all ${
                        selectedDate === slot.date
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card text-foreground hover:border-primary/50"
                      }`}
                    >
                      <div className="text-xs font-medium">
                        {new Date(slot.date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-sm font-bold">
                        {new Date(slot.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Select Time</label>
                  <div className="grid grid-cols-3 gap-2">
                    {experience.availableSlots
                      .find((slot) => slot.date === selectedDate)
                      ?.times.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            selectedTime === time
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-card text-foreground hover:border-primary/50"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* Participants */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Number of Participants</label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setParticipants(Math.max(1, participants - 1))}
                  >
                    -
                  </Button>
                  <span className="text-lg font-semibold text-foreground w-12 text-center">
                    {participants}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setParticipants(Math.min(experience.maxParticipants, participants + 1))}
                  >
                    +
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    (max {experience.maxParticipants})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Booking Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm text-muted-foreground">Total Price</div>
              <div className="text-2xl font-bold text-foreground">
                ${experience.price * participants}
                <span className="text-sm font-normal text-muted-foreground">
                  {" "}({participants} {participants === 1 ? "person" : "people"})
                </span>
              </div>
            </div>
            <Button
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
              size="lg"
            >
              Book Now
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            🔒 Secure payment • Free cancellation up to 24h before
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetailModal;
