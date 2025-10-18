// Travel Journal Component
import { useState } from 'react';
import { Camera, MapPin, Calendar, Heart, MessageCircle, Trash2, Edit, Plus, Upload, Instagram, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';

interface JournalEntry {
  id: string;
  location: string;
  date: string;
  photos: string[];
  description: string;
  rating: number;
  likes: number;
  comments: number;
}

const TravelJournal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      location: 'Sigiriya Rock Fortress',
      date: '2025-10-15',
      photos: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'https://images.unsplash.com/photo-1588097676863-b4906bfeb32d?w=800',
      ],
      description: 'Amazing sunrise hike! The view from the top was absolutely breathtaking. The ancient frescoes were stunning and the history behind this place is fascinating.',
      rating: 5,
      likes: 24,
      comments: 8,
    },
    {
      id: '2',
      location: 'Galle Fort',
      date: '2025-10-12',
      photos: ['https://images.unsplash.com/photo-1608481337062-8d33e2b4f111?w=800'],
      description: 'Walking through the historic streets of Galle Fort was like stepping back in time. Beautiful colonial architecture and amazing cafes!',
      rating: 5,
      likes: 18,
      comments: 5,
    },
  ]);

  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedEntryForShare, setSelectedEntryForShare] = useState<JournalEntry | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [newEntry, setNewEntry] = useState({
    location: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    rating: 5,
  });

  const handleAddEntry = () => {
    const entry: JournalEntry = {
      id: Date.now().toString(),
      location: newEntry.location,
      date: newEntry.date,
      photos: ['https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800'],
      description: newEntry.description,
      rating: newEntry.rating,
      likes: 0,
      comments: 0,
    };
    
    setEntries([entry, ...entries]);
    setIsAddingEntry(false);
    setNewEntry({
      location: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      rating: 5,
    });
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const handleShareToInstagram = (entry: JournalEntry) => {
    setSelectedEntryForShare(entry);
    setShareDialogOpen(true);
    setShareSuccess(false);
  };

  const submitToInstagram = () => {
    // Simulate upload - in production, this would call an API
    setTimeout(() => {
      setShareSuccess(true);
      setTimeout(() => {
        setShareDialogOpen(false);
        setSelectedEntryForShare(null);
        setShareSuccess(false);
      }, 2000);
    }, 1500);
  };

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating);
  };

  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
            📔 Travel Journal
          </h3>
          <p className="text-xs text-muted-foreground">Share your adventures</p>
        </div>
        
        <Dialog open={isAddingEntry} onOpenChange={setIsAddingEntry}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Journal Entry</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Where did you visit?"
                    value={newEntry.location}
                    onChange={(e) => setNewEntry({ ...newEntry, location: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="date"
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewEntry({ ...newEntry, rating: star })}
                      className="text-2xl transition-transform hover:scale-110"
                    >
                      {star <= newEntry.rating ? '⭐' : '☆'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photos">Photos</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload photos</p>
                  <p className="text-xs text-muted-foreground mt-1">or drag and drop</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">How was it? *</Label>
                <Textarea
                  id="description"
                  placeholder="Share your experience, feelings, and memorable moments..."
                  value={newEntry.description}
                  onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                  rows={6}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {newEntry.description.length}/500 characters
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleAddEntry}
                  disabled={!newEntry.location || !newEntry.description}
                  className="flex-1"
                >
                  Save Entry
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingEntry(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Journal Entries */}
      <div className="space-y-4">
        {entries.length === 0 ? (
          <div className="bg-card rounded-xl border border-border p-8 text-center">
            <Camera className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
            <h4 className="font-semibold mb-2">No journal entries yet</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Start documenting your Sri Lankan adventures!
            </p>
            <Button onClick={() => setIsAddingEntry(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Entry
            </Button>
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Photo Gallery */}
              {entry.photos.length > 0 && (
                <div className={`grid ${entry.photos.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-1`}>
                  {entry.photos.map((photo, index) => (
                    <div
                      key={index}
                      className="aspect-video overflow-hidden bg-muted"
                    >
                      <img
                        src={photo}
                        alt={`${entry.location} - ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-primary" />
                      <h4 className="font-semibold text-lg">{entry.location}</h4>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span>{renderStars(entry.rating)}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDeleteEntry(entry.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed">{entry.description}</p>

                {/* Engagement */}
                <div className="flex items-center gap-2 sm:gap-4 pt-2 border-t border-border flex-wrap">
                  <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>{entry.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>{entry.comments}</span>
                  </button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto text-xs gap-1.5 text-pink-600 hover:text-pink-700 hover:bg-pink-50 dark:hover:bg-pink-950 px-2 sm:px-3"
                    onClick={() => handleShareToInstagram(entry)}
                  >
                    <Instagram className="w-4 h-4" />
                    <span className="hidden sm:inline">Share to Instagram</span>
                    <span className="sm:hidden">Share</span>
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Share to Instagram Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="max-w-md w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Instagram className="w-5 h-5 text-pink-600" />
              Share to Instagram
            </DialogTitle>
          </DialogHeader>

          {selectedEntryForShare && (
            <div className="space-y-3 sm:space-y-4 pt-4">
              {shareSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Successfully Shared!</h3>
                    <p className="text-sm text-muted-foreground">
                      Your memory has been submitted to @islandconnectbuddy
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <Alert className="bg-pink-50 dark:bg-pink-950/20 border-pink-200 dark:border-pink-900">
                    <Instagram className="w-4 h-4 text-pink-600 flex-shrink-0" />
                    <AlertDescription className="text-xs sm:text-sm">
                      Share your amazing experience to our official Instagram page{' '}
                      <a
                        href="https://instagram.com/islandconnectbuddy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-pink-600 hover:underline break-words"
                      >
                        @islandconnectbuddy
                      </a>
                    </AlertDescription>
                  </Alert>

                  {/* Preview */}
                  <div className="bg-card border border-border rounded-lg overflow-hidden">
                    {selectedEntryForShare.photos[0] && (
                      <div className="aspect-square sm:aspect-video overflow-hidden bg-muted">
                        <img
                          src={selectedEntryForShare.photos[0]}
                          alt={selectedEntryForShare.location}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-3 sm:p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                        <h4 className="font-semibold text-sm sm:text-base line-clamp-1">
                          {selectedEntryForShare.location}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3">
                        {selectedEntryForShare.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                        <span>{renderStars(selectedEntryForShare.rating)}</span>
                        <span>•</span>
                        <span className="truncate">
                          {new Date(selectedEntryForShare.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-3 sm:p-4">
                    <h4 className="font-semibold text-sm mb-2 text-blue-900 dark:text-blue-100">
                      📸 What happens next?
                    </h4>
                    <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                      <li>✓ Your memory will be reviewed by our team</li>
                      <li>✓ We'll credit you in the post (@yourusername)</li>
                      <li>✓ Your photo may appear on our Instagram feed</li>
                      <li>✓ You'll be notified if your post is featured</li>
                    </ul>
                  </div>

                  {/* Attribution */}
                  <div className="space-y-2">
                    <Label htmlFor="instagram-handle" className="text-sm">
                      Your Instagram Handle (Optional)
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        @
                      </span>
                      <Input
                        id="instagram-handle"
                        placeholder="yourusername"
                        className="pl-7 h-11"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      We'll tag you when we post your photo
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                      onClick={submitToInstagram}
                      className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 h-11"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Share to Instagram</span>
                      <span className="sm:hidden">Share</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShareDialogOpen(false)}
                      className="h-11"
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TravelJournal;
