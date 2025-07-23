const mongoose = require("mongoose");

const consultancySchema = new mongoose.Schema({
  userEmail: String, // identify logged-in user
  name: String,
  year: String,
  locations: String,
  website: String,
  email: String,
  phone: String,
  whatsapp: String,
  countries: String,
  universities: String,
  specializations: String,
  services: String,
  yearsService: Number,
  studentsSent: Number,
  visaSuccess: String,
  stories: String,
  photos: [String],
  testimonials: String,
  reviewLinks: String,
  rating: Number,
  fees: String,
  refund: String,
  counselors: String,
  languages: String,
  certifications: String,
  bookingInfo: String,
  availability: String,
  registrations: String,
  affiliations: String,
  internationalCerts: String,
  metrics: String
});

module.exports = mongoose.model("Consultancy", consultancySchema);
