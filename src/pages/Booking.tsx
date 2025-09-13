import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Video, 
  Star,
  User,
  CheckCircle,
  AlertTriangle 
} from "lucide-react";
import counselorsData from "@/mock-data/counselors.json";

interface Counselor {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  languages: string[];
  rating: number;
  experience: string;
  bio: string;
  modes: string[];
  availability: Record<string, string[]>;
}

interface BookingForm {
  counselorId: string;
  date: string;
  time: string;
  mode: 'In-person' | 'Telehealth';
  type: string;
  anonymous: boolean;
  notes: string;
}

const Booking = () => {
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    counselorId: '',
    date: '',
    time: '',
    mode: 'Telehealth',
    type: 'initial',
    anonymous: false,
    notes: ''
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const counselors = counselorsData.counselors as Counselor[];
  const appointmentTypes = counselorsData.appointmentTypes;

  // Get available dates (next 14 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // Get available times for selected counselor and date
  const getAvailableTimes = () => {
    if (!selectedCounselor || !selectedDate) return [];
    const dateStr = selectedDate.toISOString().split('T')[0];
    return selectedCounselor.availability[dateStr] || [];
  };

  const handleCounselorSelect = (counselor: Counselor) => {
    setSelectedCounselor(counselor);
    setBookingForm(prev => ({ 
      ...prev, 
      counselorId: counselor.id,
      date: '',
      time: ''
    }));
    setSelectedDate(undefined);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setBookingForm(prev => ({ 
        ...prev, 
        date: date.toISOString().split('T')[0],
        time: ''
      }));
    }
  };

  const handleBookingSubmit = () => {
    // Generate booking ID
    const id = 'BOOK-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setBookingId(id);
    setBookingConfirmed(true);
    
    // Store booking in localStorage (in real app, this would go to backend)
    const booking = {
      id,
      ...bookingForm,
      counselorName: selectedCounselor?.name,
      timestamp: new Date().toISOString()
    };
    
    const existingBookings = JSON.parse(localStorage.getItem('mindSupport_bookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('mindSupport_bookings', JSON.stringify(existingBookings));
  };

  const resetBooking = () => {
    setSelectedCounselor(null);
    setSelectedDate(undefined);
    setBookingForm({
      counselorId: '',
      date: '',
      time: '',
      mode: 'Telehealth',
      type: 'initial',
      anonymous: false,
      notes: ''
    });
    setBookingConfirmed(false);
    setBookingId('');
  };

  // Booking confirmation screen
  if (bookingConfirmed) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <Card className="shadow-strong border-0 bg-gradient-surface">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto bg-gradient-healing rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-secondary-dark mb-4">
              Booking Confirmed!
            </h1>
            
            <Alert className="mb-6 bg-healing-green-light border-healing-green">
              <AlertTriangle className="h-4 w-4 text-healing-green" />
              <AlertDescription className="text-healing-green font-medium">
                Your appointment has been successfully scheduled. Save your booking ID: <strong>{bookingId}</strong>
              </AlertDescription>
            </Alert>

            <div className="space-y-4 text-left bg-card p-6 rounded-lg mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Counselor:</span>
                <span className="font-medium">{selectedCounselor?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-medium">{bookingForm.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mode:</span>
                <span className="font-medium">{bookingForm.mode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span className="font-medium">
                  {appointmentTypes.find(t => t.id === bookingForm.type)?.name}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={resetBooking} variant="outline">
                Book Another Appointment
              </Button>
              <Button asChild className="bg-gradient-primary hover:opacity-90 text-white">
                <a href="/">Return Home</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-dark mb-4">Book a Session</h1>
        <p className="text-muted-foreground max-w-2xl">
          Schedule a confidential appointment with one of our licensed mental health professionals. 
          All sessions are available both in-person and via secure telehealth.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Counselor Selection */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold text-secondary-dark mb-6">Choose Your Counselor</h2>
          <div className="space-y-4">
            {counselors.map((counselor) => (
              <Card 
                key={counselor.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-medium ${
                  selectedCounselor?.id === counselor.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => handleCounselorSelect(counselor)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-secondary-dark">{counselor.name}</h3>
                      <p className="text-muted-foreground">{counselor.title}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-warm-amber text-warm-amber mr-1" />
                          <span className="text-sm font-medium">{counselor.rating}</span>
                        </div>
                        <span className="text-muted-foreground text-sm">•</span>
                        <span className="text-sm text-muted-foreground">{counselor.experience}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {counselor.modes.map(mode => (
                        <Badge key={mode} variant="outline" className="text-xs">
                          {mode === 'In-person' ? <MapPin className="w-3 h-3 mr-1" /> : <Video className="w-3 h-3 mr-1" />}
                          {mode}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{counselor.bio}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {counselor.specialties.map(specialty => (
                      <Badge key={specialty} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Languages:</span>
                    {counselor.languages.join(', ')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Booking Panel */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Schedule Appointment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!selectedCounselor ? (
                <div className="text-center py-8">
                  <User className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">Select a counselor to continue</p>
                </div>
              ) : (
                <>
                  {/* Selected Counselor */}
                  <div className="p-4 bg-primary-light rounded-lg">
                    <h4 className="font-medium text-secondary-dark">{selectedCounselor.name}</h4>
                    <p className="text-sm text-muted-foreground">{selectedCounselor.title}</p>
                  </div>

                  {/* Appointment Type */}
                  <div>
                    <Label className="text-sm font-medium">Appointment Type</Label>
                    <Select value={bookingForm.type} onValueChange={(value) => 
                      setBookingForm(prev => ({ ...prev, type: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {appointmentTypes.map(type => (
                          <SelectItem key={type.id} value={type.id}>
                            <div>
                              <div className="font-medium">{type.name}</div>
                              <div className="text-xs text-muted-foreground">{type.duration} minutes</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Session Mode */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Session Mode</Label>
                    <RadioGroup 
                      value={bookingForm.mode} 
                      onValueChange={(value: 'In-person' | 'Telehealth') => 
                        setBookingForm(prev => ({ ...prev, mode: value }))
                      }
                    >
                      {selectedCounselor.modes.map(mode => (
                        <div key={mode} className="flex items-center space-x-2">
                          <RadioGroupItem value={mode} id={mode} />
                          <Label htmlFor={mode} className="flex items-center gap-2 text-sm">
                            {mode === 'In-person' ? <MapPin className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                            {mode}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Select Date</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={(date) => {
                        const today = new Date();
                        const availableDates = getAvailableDates();
                        return date < today || !availableDates.some(d => 
                          d.toDateString() === date.toDateString()
                        );
                      }}
                      className="rounded-md border"
                    />
                  </div>

                  {/* Time Selection */}
                  {selectedDate && (
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Available Times</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {getAvailableTimes().map(time => (
                          <Button
                            key={time}
                            variant={bookingForm.time === time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setBookingForm(prev => ({ ...prev, time }))}
                            className="text-sm"
                          >
                            <Clock className="w-3 h-3 mr-1" />
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Anonymous Option */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={bookingForm.anonymous}
                      onChange={(e) => setBookingForm(prev => ({ 
                        ...prev, 
                        anonymous: e.target.checked 
                      }))}
                      className="rounded"
                    />
                    <Label htmlFor="anonymous" className="text-sm">
                      Book anonymously (token-based)
                    </Label>
                  </div>

                  {/* Notes */}
                  <div>
                    <Label htmlFor="notes" className="text-sm font-medium block mb-2">
                      Additional Notes (Optional)
                    </Label>
                    <Textarea
                      id="notes"
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Any specific concerns or preferences..."
                      className="min-h-[80px]"
                    />
                  </div>

                  {/* Book Button */}
                  <Button
                    onClick={handleBookingSubmit}
                    disabled={!bookingForm.date || !bookingForm.time}
                    className="w-full bg-gradient-primary hover:opacity-90 text-white"
                  >
                    Confirm Booking
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Booking;